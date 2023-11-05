import { productService } from '../services/index.js';

export const getAllProducts = async (req, res) => {
  // get all data
  const {type, message, statusCode, products} = await productService.queryProducts(req);

  return res.status(statusCode).json({
    type,
    message,
    products
  })
}

export const createProduct = async (req, res) => {
  // create product
  const body = req.body;

  const {type, message, statusCode, product} = await productService.createProduct(body);

  return res.status(statusCode).json({
    type,
    message,
    product
  })
}