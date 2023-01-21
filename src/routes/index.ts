import express from 'express'
import images from './api/imagesRouter'

const routes = express.Router()

routes.get('/', (_, res) => {
  res.status(200).send('api route works')
})

routes.use('/images', images)

export default routes
