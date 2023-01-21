import express from 'express'
import images from './api/imagesRouter'
import indexImagesRouter from './api/indexImagesRouter'

const routes = express.Router()

routes.use('/images', images)
routes.use('/indexImages', indexImagesRouter)

export default routes
