# Request, Environment, And Build

Use this reference when wiring APIs, auth, env variables, Vite config, or build scripts in the sample-like Vue3 visualization project.

## Axios Wrapper

Core file:

- `src/utils/request.ts`

Expected behavior:

- Create one shared Axios instance.
- Read `haierToken` from Pinia store.
- Inject token into request header `Access-Token`.
- Normalize successful responses to `res.data`.
- Use Element Plus `ElMessage` for user-facing errors.
- Handle `401` by clearing `haierToken` and `userInfo`, calling `login(true)`, and retrying the original request when appropriate.
- Handle `429` with a friendly rate-limit message.

Sample request interceptor:

```typescript
service.interceptors.request.use(
  (config) => {
    const { haierToken } = useStore()
    if (haierToken) {
      config.headers['Access-Token'] = haierToken
    }
    return config
  },
  (error) => Promise.reject(error)
)
```

Sample usage:

```typescript
import request from '@/utils/request'
import { employeeList, employeeDetail } from '@/api/users/employee'

const list = await request(employeeList)
const detail = await request(employeeDetail({ id: 1 }))
```

## Environment Files

The sample uses Vite modes and `.env.*` files:

| File | Purpose |
| --- | --- |
| `.env.production` | Production deployment |
| `.env.test` | Test/SIT environment |
| `.env.development` | Local development |
| `.env.preview` | Build preview |

Rules:

- Client-visible variables must start with `VITE_`.
- Use `VITE_API_BASE_URL` for API base URL.
- Use `VITE_API_NODE_ENV` or equivalent to identify runtime mode when needed.

Examples:

```bash
VITE_API_NODE_ENV="production"
VITE_API_BASE_URL='https://wistar.haier.net'
```

```bash
VITE_API_NODE_ENV="test"
VITE_API_BASE_URL='https://wistar-sit.haier.net'
```

## Vite Config

Expected conventions:

- Use `loadEnv(mode, "./")` to load environment variables.
- Set alias `@` to `src`.
- Use `base: './'` when the deployment requires relative assets.
- Configure Sass global mixin import through `css.preprocessorOptions.scss.additionalData`.
- Configure dev proxy `/api` to `envConfig.VITE_API_BASE_URL` when local development needs proxying.

Representative config fragments:

```typescript
import { defineConfig, loadEnv } from "vite"
import path from 'path'

export default ({ command, mode }: any) => {
  const envConfig = loadEnv(mode, "./")
  return {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/global.scss";`
        }
      }
    },
    server: {
      proxy: {
        "/api": {
          target: envConfig.VITE_API_BASE_URL,
          changeOrigin: true,
        }
      }
    }
  }
}
```

## Package Scripts

Expected commands:

```json
{
  "scripts": {
    "dev": "vite --mode development",
    "build:preview": "vue-tsc && vite build --mode preview",
    "build:test": "vue-tsc && vite build --mode test",
    "build:prod": "vue-tsc && vite build --mode production",
    "preview": "vite preview"
  }
}
```

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start development environment |
| `pnpm build:test` | Build test environment |
| `pnpm build:prod` | Build production environment |
| `pnpm build:preview` | Build preview environment |
| `pnpm preview` | Preview build output |

## Gitignore Baseline

Ignore dependencies, build output, local env secrets, IDE files, logs, OS files, and coverage:

```text
node_modules/
.pnpm-store/
dist/
dist-ssr/
.env
.env.local
.env.*.local
.vscode/
.idea/
*.log
npm-debug.log*
.DS_Store
Thumbs.db
coverage/
```
