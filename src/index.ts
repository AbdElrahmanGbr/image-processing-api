import express, { Application, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import routes from './routes'
import path from 'path'
import * as fs from 'fs'
dotenv.config()
const PORT = process.env.PORT || 3060
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('dev'))
// Changing main route to start with /api (endpoint)
app.use('/api', routes)
app.get('/', (_, res: Response) => {
  res.status(200).send('Connected to Server!')
})
// start express server
app.listen(PORT, (): void => {
  // Creating Thumb folder if not exist
  const thumbImagesFolder = path.resolve(__dirname, '../public/assets/thumb')
  if (!fs.existsSync(thumbImagesFolder)) {
    fs.mkdirSync(thumbImagesFolder)
  }
  console.log(`Server is starting at Port:${PORT}`)
})
export default app
