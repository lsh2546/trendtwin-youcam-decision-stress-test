# TREND//TWIN

> One simulation prevented one expensive mistake.

TREND//TWIN is an **AI Fashion Decision Stress Test** for brands and retailers. Instead of recommending what a shopper should wear, it asks which launch decision will fail before manufacturing.

![TREND//TWIN Decision Stress Test](public/og.png)

## The question

Brands can test counterfactual decisions such as:

- What if Sand stays?
- What if Seoul launches first?
- What if Neo-Y2K replaces Minimal?
- What if Sage is reduced by 20%?

TREND//TWIN holds the collection constant, changes one decision at a time, and compares the resulting virtual markets.

## Product flow

1. **Decision Hypothesis** — upload SKU colorways and choose a counterfactual.
2. **Virtual Customer Twins** — define customer segments across Seoul, Tokyo, and Taipei.
3. **Counterfactual VTO Stress Test** — use YouCam Apparel VTO evidence across city, skin-tone, and trend cells.
4. **Decision Conflict Map** — reveal market mismatch, campaign conflict, and visual return risk.
5. **Decision Report** — issue explicit `APPROVE` or `REJECT` judgments.

The included demo concludes:

- `REJECT` Sand stays — deadstock risk +18%
- `APPROVE` Taipei first — conversion +9%, visual return risk −7%
- `APPROVE` Sage +18% — deadstock −31%, campaign ROI +18%

## Why YouCam

YouCam Apparel VTO is the experimental substrate, not a decorative preview. The integration follows the Clothes V3 asynchronous workflow:

1. Request a pre-signed upload URL.
2. Upload the portrait and garment assets.
3. Create the VTO task.
4. Poll until success or failure.
5. Retrieve the generated result.

The server integration is documented in [docs/API_CONTRACT.md](docs/API_CONTRACT.md).

## Responsible claims

- The 1,800-cell market layer is a deterministic simulation derived from sampled VTO evidence, not 1,800 live API calls.
- Visual return risk is a comparative proxy, not a prediction or guarantee of actual returns.
- Demo mode is designed for judging when API credentials are unavailable.

## Stack

- React 19, TypeScript, and Vite
- Node.js and Express
- YouCam Clothes V3 REST API
- CSS-first responsive interface

## Run locally

Requirements: Node.js 20+ and pnpm 10+.

```bash
pnpm install
copy .env.example .env
pnpm dev
```

Open `http://localhost:5173`.

For a live YouCam session, add `YOUCAM_API_KEY` to `.env`. Never prefix the key with `VITE_`.

```bash
pnpm build
NODE_ENV=production pnpm start
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `YOUCAM_API_KEY` | Live mode only | Server-side YouCam bearer token |
| `YOUCAM_API_BASE_URL` | No | YouCam API base URL |
| `YOUCAM_POLL_INTERVAL_MS` | No | Task polling interval |
| `YOUCAM_POLL_TIMEOUT_MS` | No | Maximum task wait |
| `PORT` | No | Express port, default `8787` |

## Submission assets

- [Devpost copy](docs/SUBMISSION.md)
- [Two-minute demo script](docs/DEMO_SCRIPT.md)
- [Final checklist](docs/CHECKLIST.md)
- Representative image: `outputs/trendtwin-devpost-hero.png`

## Privacy

API credentials remain server-side. Uploaded live-test files are processed in memory. A production deployment should add explicit retention consent, deletion controls, audit logging, and regional privacy review.

## License

MIT. Third-party dependencies retain their respective licenses.
