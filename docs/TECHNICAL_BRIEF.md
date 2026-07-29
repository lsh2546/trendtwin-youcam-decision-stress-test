# TREND//TWIN technical brief

## Product boundary

TREND//TWIN is an AI Fashion Decision Stress Test. The prototype compares a control plan with counterfactual launch decisions and produces an auditable Decision Report.

## Architecture

```text
React decision interface
        ↓
Node/Express server boundary
        ↓
YouCam Clothes V3 asynchronous tasks
        ↓
Sampled VTO evidence
        ↓
Deterministic counterfactual market simulation
        ↓
Conflict Map and APPROVE/REJECT Decision Report
```

## Why sampled VTO evidence

Calling the API for every displayed market cell would consume unnecessary hackathon units. The prototype instead demonstrates the production architecture with a small live batch and expands those results into deterministic city, skin-tone, trend, and SKU scenarios.

## Current implementation

- Clothes V3 file upload, task creation, polling, and result retrieval
- Server-side credentials
- Credential-free judging mode
- Five-screen counterfactual decision flow
- Responsive desktop and mobile layouts
- Explicit disclosure of simulated business metrics

## Demonstrated decisions

| Counterfactual | Evidence shown | Verdict |
|---|---|---|
| Sand stays | Deadstock risk +18%; campaign efficiency −12% | REJECT |
| Taipei launches first | Conversion +9%; visual return risk −7% | APPROVE |
| Sage allocation increases 18% | Deadstock −31%; campaign ROI +18% | APPROVE |

These figures are stable demo outputs for communicating the decision workflow. They are not forecasts of real commercial performance.

## Production extensions

A production implementation would add retailer sales data, experiment calibration, uncertainty intervals, consent and retention controls, and longitudinal validation against actual sell-through and returns.
