import express, { Application } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import routes from './routes'
dotenv.config()
const PORT = process.env.PORT || 3060
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('dev'))
// Changing main route to start with /api (endpoint)
app.use('/api', routes)
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at Port:${PORT}`)
})
export default app
