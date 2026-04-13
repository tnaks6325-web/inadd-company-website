import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { HomePage } from './routes/home'
import { AboutPage } from './routes/about'
import { WorksPage } from './routes/works'
import { InsightPage } from './routes/insight'
import { ViralPage } from './routes/viral'
import { ContactPage } from './routes/contact'

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

app.get('/viral', (c) => {
  return c.render(<ViralPage />, { title: 'Viral Marketing' })
})

app.get('/contact', (c) => {
  return c.render(<ContactPage />, { title: 'Contact' })
})

export default app
