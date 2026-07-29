type YouCamResponse<T> = { status?: number; data?: T; error?: string; error_code?: string; message?: string };
type TaskResult = { task_status?: "running" | "success" | "error"; error?: string; error_message?: string; results?: unknown };

const API_BASE = process.env.YOUCAM_API_BASE_URL || "https://yce-api-01.makeupar.com";
const POLL_INTERVAL = Number(process.env.YOUCAM_POLL_INTERVAL_MS || 1800);
const POLL_TIMEOUT = Number(process.env.YOUCAM_POLL_TIMEOUT_MS || 90000);

function authHeaders(extra: Record<string, string> = {}) {
  const key = process.env.YOUCAM_API_KEY;
  if (!key) throw Object.assign(new Error("YOUCAM_API_KEY is not configured"), { status: 503 });
  return { Authorization: `Bearer ${key}`, ...extra };
}

async function json<T>(response: Response, label: string): Promise<YouCamResponse<T>> {
  const text = await response.text();
  let body: YouCamResponse<T>;
  try { body = text ? JSON.parse(text) : {}; }
  catch { throw new Error(`${label} returned a non-JSON response (${response.status})`); }
  if (!response.ok || (body.status && body.status >= 400) || body.error_code) {
    throw Object.assign(new Error(body.message || body.error || `${label} failed`), { status: response.status });
  }
  return body;
}

async function uploadClothesAsset(file: Express.Multer.File) {
  const response = await fetch(`${API_BASE}/s2s/v2.0/file/cloth-v3`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ files: [{ content_type: file.mimetype, file_name: file.originalname, file_size: file.size }] }),
  });
  const body = await json<{ files?: Array<{ file_id: string; requests: Array<{ url: string; method?: string; headers?: Record<string, string> }> }> }>(response, "YouCam file API");
  const item = body.data?.files?.[0];
  const request = item?.requests?.[0];
  if (!item?.file_id || !request?.url) throw new Error("YouCam did not return an upload URL and file ID");
  const uploadResponse = await fetch(request.url, {
    method: request.method || "PUT",
    headers: { ...(request.headers || {}), "Content-Type": file.mimetype },
    body: new Uint8Array(file.buffer),
  });
  if (!uploadResponse.ok) throw new Error(`YouCam image upload failed (${uploadResponse.status})`);
  return item.file_id;
}

async function createTask(path: string, payload: Record<string, unknown>) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  const body = await json<{ task_id?: string }>(response, "YouCam task API");
  if (!body.data?.task_id) throw new Error("YouCam did not return a task ID");
  return body.data.task_id;
}

async function poll(path: string, taskId: string): Promise<TaskResult> {
  const started = Date.now();
  while (Date.now() - started < POLL_TIMEOUT) {
    const response = await fetch(`${API_BASE}${path}/${encodeURIComponent(taskId)}`, { headers: authHeaders({ "Content-Type": "application/json" }) });
    const body = await json<TaskResult>(response, "YouCam status API");
    if (body.data?.task_status === "success") return body.data;
    if (body.data?.task_status === "error") throw new Error(body.data.error_message || body.data.error || "YouCam processing failed");
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
  }
  throw Object.assign(new Error("YouCam processing timed out"), { status: 504 });
}

export async function virtualTryOn(person: Express.Multer.File, garment: Express.Multer.File, garmentCategory: string) {
  const [personId, garmentId] = await Promise.all([
    uploadClothesAsset(person),
    uploadClothesAsset(garment),
  ]);
  const taskId = await createTask("/s2s/v2.0/task/cloth-v3", {
    src_file_id: personId,
    ref_file_id: garmentId,
    garment_category: garmentCategory,
  });
  return poll("/s2s/v2.0/task/cloth-v3", taskId);
}
