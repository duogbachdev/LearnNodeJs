import express from 'express'
import { getAllProduct } from '../controllers/product.controller.js'

const routerProduct = express.Router()

// API 
routerProduct.get('/', getAllProduct)  // -> controller

export default routerProduct