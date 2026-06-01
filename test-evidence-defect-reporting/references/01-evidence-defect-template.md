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
- Visual finding:
- Likely cause:
- Missing information:
- Suggested fix:
- Retest criteria:

## Final Conclusion

State `pass`, `partial pass`, `fail`, or `blocked`, and list unresolved blockers separately from ordinary defects.
