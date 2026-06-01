# Proxy, Routing, And Assets

## Proxy Checks

- Use local proxy only for local development CORS or same-origin simulation.
- Document target, path rewrite, origin change, headers, and which env mode enables it.
- Ensure production build does not accidentally depend on the dev proxy.

## Routing Checks

- Verify `base`, public path, router mode, nested routes, deep-link refresh, and default redirect.
- For hash routing, verify direct entry and refresh behavior.
- For history routing, verify server fallback or deployment rewrite rules.
- For embedded or micro-frontend mode, verify host-provided base path and mount point.

## Asset Checks

- Verify logos, fonts, images, CSS chunks, JS chunks, worker files, and downloaded templates under the intended base path.
- Avoid absolute local paths in deployable code.
- Check that previewed build output matches dev behavior for routes and assets.
