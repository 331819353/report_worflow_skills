---
name: redis-cache-design-patterns
description: "用于Redis缓存、key设计、TTL/失效、缓存击穿/穿透/雪崩、singleflight、分布式锁、限流、幂等、任务状态、热点查询和权限安全缓存设计。用户提到Redis缓存设计、缓存Key、TTL、失效策略、缓存预热、stale fallback、分布式锁、rate limit、job progress、缓存权限隔离时触发；不负责SQL查询优化或完整端到端性能诊断。"
---

# Redis Cache Design Patterns

## Positioning

Use this skill when Redis is part of a backend/data-service/report performance or resilience design. It owns cache roles, key dimensions, TTL/invalidation, stampede protection, stale fallback, locks, rate limits, idempotency, job-state, pool/timeouts, and observability.

Use `$performance-optimization` for end-to-end performance strategy and verification across SQL, API, frontend, export, and runtime.

## Reference Loading

- Read `references/redis-cache-usage-patterns.md` before accepting Redis/cache decisions.

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Identify Redis role: metadata, permission, dictionary, result, widget, snapshot, rate-limit, lock, idempotency, or job progress.
2. Define key template and all safety dimensions: tenant, user/role, permission, report, data version, filters, pagination/sort, locale/unit.
3. Define TTL, invalidation, jitter, warmup, stampede protection, miss behavior, stale fallback, and fail-open/fail-closed rule.
4. Define Redis pool/timeouts, value size limits, no broad `KEYS`/request-path `SCAN`, observability, and durable-store boundaries.
5. Verify correctness, freshness, permission safety, and failure behavior.

## Required Output

- Redis role and key template.
- TTL/invalidation and stampede/miss behavior.
- Permission/tenant safety dimensions.
- Pool/timeouts/fallback/observability decisions.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Cache keys must include filters, permission/user/tenant scope, source version, pagination/sort, and locale/unit options when relevant.
- Redis usage is not ready when key dimensions, TTL/invalidation, permission safety, miss/stampede behavior, fallback, pool/timeouts, or observability are unknown.
