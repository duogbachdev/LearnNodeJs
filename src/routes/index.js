import express from 'express'
import routerProduct from './product.route.js'

const router = express.Router()

router.use('/product', routerProduct)

export default router