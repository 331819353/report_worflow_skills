# Consistency Gate

Run this gate before finalizing any 技术方案 output.

## Traceability Matrix

Create or mentally verify this matrix:

| Page/module | Component or interaction | API ID | Response model | Logical model | Source model | Metric IDs | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- |

Minimum requirements:

- Every visible data-consuming component has an API ID or is explicitly static/offline.
- Every API ID has a response model.
- Every response model traces to a logical model and source model, or to a gap ID.
- Every metric ID appears in a response model, transformation rule, or gap ID.
- Every dynamic filter option has a source model, static enum, or gap ID.
- Every sensitive response field has a masking/field-permission rule or a gap ID.
- Every P0 API has performance/cache/SLA notes or a gap ID.

## Cross-Artifact Checks

Check these pairs:

- API清单 vs 数据模型文件: response model names, field groups, source model dependencies, metric IDs, permission notes.
- API清单 vs 待补充数据模型清单: every `partial` or `blocked` API has linked gap IDs.
- 数据模型文件 vs 待补充数据模型清单: every unmapped field, formula, enum, join, owner, or refresh rule has a gap ID.
- Prototype data code vs API清单: every mock dataset, resolver, component prop, filter field, drawer, export, or action is represented or intentionally excluded.
- Requirement/prototype scope vs 待补充数据模型清单: every missing page, interaction, acceptance rule, source file, or prototype data code dependency has a gap ID.

## Failure Handling

If a check fails:

1. Do not hide it in prose.
2. Add or update a gap item.
3. Set the affected API/model/artifact status to `partial` or `blocked`.
4. State exactly what information would make it `ready`.

## Common Red Flags

- One API returns unrelated page sections with different grains, permissions, or refresh needs.
- Response fields are copied from mock data but have no source mapping.
- A metric formula has numerator/denominator names but no filter scope or grain.
- A drilldown parameter is present in frontend interactions but absent from API request params.
- An export API is omitted even though the page has export behavior.
- Permission is described as "按权限" without user scope, organization scope, or data rule.
- Performance is described as "正常返回" without latency, volume, cache, export limit, or SLA notes.
- Sensitive fields are exposed without masking, field-level permission, or explicit no-sensitive-data decision.
