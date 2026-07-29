# Devpost Submission Copy

## Project name

TREND//TWIN

## Tagline

AI Fashion Decision Stress Test powered by YouCam Apparel VTO.

## One-line pitch

TREND//TWIN helps fashion brands reject expensive launch decisions before manufacturing by comparing counterfactual virtual markets.

## Inspiration

Virtual try-on usually answers, “How does this look?” Brands need an earlier answer: “Which decision will fail before we manufacture thousands of garments?”

## What it does

A brand uploads a collection and asks a counterfactual question such as “What if Sand stays?” TREND//TWIN holds the collection constant, changes one decision, and uses YouCam Apparel VTO evidence across virtual customer segments in Seoul, Tokyo, and Taipei. The system detects campaign conflict, deadstock exposure, and visual return risk, then issues an auditable Decision Report using `APPROVE`, `REJECT`, `HIGH RISK`, and `LOW CONFIDENCE`.

The demo concludes:

- `REJECT` Sand stays — deadstock risk +18%
- `APPROVE` Taipei first — conversion +9%, visual return risk −7%
- `APPROVE` Sage +18% — deadstock −31%, campaign ROI +18%

## How we built it

React, TypeScript, Vite, Node/Express, and the YouCam Clothes V3 REST workflow. The server creates YouCam tasks, uploads source assets, polls task status, and retrieves VTO outputs. A deterministic demo mode preserves the full judging flow when API credentials are unavailable.

## Why YouCam

YouCam Apparel VTO is not decoration in this project. Its generated try-on evidence is the experimental substrate used to compare the same SKU across different virtual market conditions.

## Responsible claims

The 1,800-cell market layer is a simulation derived from sampled VTO evidence, not 1,800 live API calls. Visual return risk is a comparative proxy, not a guarantee of actual returns.

## Built With

YouCam Clothes V3 API, React, TypeScript, Vite, Node.js, Express, Lucide React, CSS.

## Closing

Sand fails before launch. Decision changed before manufacturing. One simulation prevented one expensive mistake.
