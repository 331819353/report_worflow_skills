# Evidence And Defect Template

Use this template when producing a handoff-ready test report.

## Evidence Item

- Case ID:
- Environment:
- URL/API:
- Preconditions:
- Steps:
- Expected result:
- Actual result:
- Evidence: screenshot path, network sample, console log, API response, or source path.
- Headless screenshot: path, viewport, page/state, capture time.
- Deterministic visual diff: `VDIFF-*` ID, baseline path, current path, diff path, threshold, result.
- Multimodal visual finding: `VIS-*` ID, category, severity, component/region, observation, impact.
- Status: pass / fail / blocked.

## Defect Item

- Defect ID:
- Severity: blocker / major / minor.
- Owner side: frontend / backend / contract / data / environment / unknown.
- Reproduction steps:
- Expected result:
- Actual result:
- Evidence:
- Screenshot:
- Baseline/current/diff artifact:
- Visual finding:
- Likely cause:
- Missing information:
- Status: open / fixed / retest / closed / blocked / accepted.
- Suggested fix:
- Retest criteria:
- Retest evidence:

## Final Conclusion

State `pass`, `partial pass`, `fail`, or `blocked`, list unresolved blockers separately from ordinary defects, and include open/fixed/retest/closed/blocked defect counts when the report is used for production acceptance.
