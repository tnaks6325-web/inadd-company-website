import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 임시 공개 터널(trycloudflare 등) 도메인 허용 — vite 6 기본 호스트 차단 우회
    allowedHosts: true
  },
  plugins: [
    // src/main.tsx 가 인사이트·자동 발행 경로를 처리하고 나머지는 src/index.tsx 로 넘긴다
    build({ entry: 'src/main.tsx' }),
    devServer({
      adapter,
      entry: 'src/main.tsx'
    })
  ]
})
