import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { HomePage } from './routes/home'
import { AboutPage } from './routes/about'
import { WorksPage } from './routes/works'
import { InsightPage } from './routes/insight'
import { InsightDetailPage } from './routes/insight-detail'
import { ViralPage } from './routes/viral'
import { ContactPage } from './routes/contact'
import { SvcViralPage } from './routes/svc-viral'
import { SvcInfluencerPage } from './routes/svc-influencer'
import { SvcSeedingPage } from './routes/svc-seeding'
import { SvcSeoPage } from './routes/svc-seo'
import { SvcReviewPage } from './routes/svc-review'
import { SvcOliveYoungPage } from './routes/svc-oliveyoung'
import { SvcPplPage } from './routes/svc-ppl'

const app = new Hono()

// Static files
app.use('/static/*', serveStatic({ root: './' }))

// Renderer middleware
app.use(renderer)

// Routes
app.get('/', (c) => {
  return c.render(<HomePage />, { title: '브랜드를 움직이는 힘' })
})

app.get('/about', (c) => {
  return c.render(<AboutPage />, { title: 'About' })
})

app.get('/works', (c) => {
  return c.render(<WorksPage />, { title: 'Works' })
})

app.get('/insight', (c) => {
  return c.render(<InsightPage />, { title: 'Marketing Insight' })
})

app.get('/insight/:id', (c) => {
  const id = c.req.param('id')
  return c.render(<InsightDetailPage id={id} />, { title: 'Insight' })
})

// Marketing 메인 (서비스 목록 페이지)
app.get('/marketing', (c) => {
  return c.render(<ViralPage />, { title: 'Marketing 서비스' })
})

// 기존 /viral 경로 유지 (호환성)
app.get('/viral', (c) => {
  return c.render(<ViralPage />, { title: 'Marketing 서비스' })
})

// 개별 서비스 페이지
app.get('/marketing/viral', (c) => {
  return c.render(<SvcViralPage />, { title: '바이럴 마케팅' })
})

app.get('/marketing/influencer', (c) => {
  return c.render(<SvcInfluencerPage />, { title: '인플루언서 마케팅' })
})

app.get('/marketing/seeding', (c) => {
  return c.render(<SvcSeedingPage />, { title: '시딩 캠페인' })
})

app.get('/marketing/seo', (c) => {
  return c.render(<SvcSeoPage />, { title: 'SEO 마케팅' })
})

app.get('/marketing/review', (c) => {
  return c.render(<SvcReviewPage />, { title: '리뷰 마케팅' })
})

app.get('/marketing/oliveyoung', (c) => {
  return c.render(<SvcOliveYoungPage />, { title: '올리브영 마케팅' })
})

app.get('/marketing/ppl', (c) => {
  return c.render(<SvcPplPage />, { title: 'PPL 마케팅' })
})

app.get('/contact', (c) => {
  return c.render(<ContactPage />, { title: 'Contact' })
})

export default app
