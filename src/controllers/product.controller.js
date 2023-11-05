import { productService } from '../services/index.js'

export const getAllProduct = async (req, res) => {
  // get all products
  const {type, message, statusCode, products} = await productService.queryProducts(req)

  return res.status(statusCode).json({
    type,
    message,
    products
  })
}