# YouCam Apparel VTO integration contract

Verified against the Perfect Corp API documentation during development.

## Authentication

All YouCam requests are made server-side:

```http
Authorization: Bearer YOUCAM_API_KEY
```

The key is never exposed to the React client.

## Clothes V3 asynchronous workflow

TREND//TWIN uses the Clothes V3 workflow:

```text
POST /s2s/v2.0/file/cloth-v3
POST /s2s/v2.0/task/cloth-v3
GET  /s2s/v2.0/task/cloth-v3/{task_id}
```

For each sampled portrait and garment pair:

1. Request pre-signed file-upload targets.
2. Upload the portrait and garment bytes.
3. Create a Clothes V3 task using the resulting file IDs.
4. Poll the task until `success` or `error`.
5. Retrieve the generated result URL from `data.results.url`.

Example task:

```json
{
  "src_file_id": "portrait-file-id",
  "ref_file_id": "garment-file-id",
  "garment_category": "auto"
}
```

Supported categories used by the adapter are `auto`, `upper_body`, `lower_body`, and `full_body`.

## Prototype endpoint

```text
POST /api/vto/batch
```

Multipart fields:

- `portrait`: one JPG/PNG customer-twin image
- `garments`: three JPG/PNG garment samples
- `categories`: JSON array of garment categories

The batch is deliberately small to conserve hackathon API units. Its generated images provide sampled visual evidence for the deterministic market-simulation layer.

## Inference boundary

YouCam generates Apparel VTO images. TREND//TWIN—not YouCam—calculates the counterfactual market cells and comparative business proxies shown in demo mode.

- `1,800 market futures` represents simulated cells derived from sampled VTO evidence, not 1,800 live calls.
- `Visual return risk` is a comparative visual proxy, not a guarantee or prediction of actual customer returns.
- `APPROVE` and `REJECT` are prototype decision-support outputs, not claims made by YouCam.
