import { queryProducts, createProduct } from "./product.service.js";
import { signin, signup } from "./auth.service.js";

const productService = {
  queryProducts,
  createProduct
}

const authService = {
  signin,
  signup
}

export {
  productService,
  authService
}