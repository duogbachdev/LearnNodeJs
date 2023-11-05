import { Product } from "../models/index.js";
import  apiFeatures from "../utils/apiFeatures.js";

export const queryProducts = async (req) => {
  // GET METHOD: param

  const populateQuery = [];

  const products = await apiFeatures(req, Product, populateQuery);

  if (!products) {
    return {
      type: 'Error',
      message: 'noProductsFound',
      statusCode: 404
    }
  }

  return {
    status: 'Success',
    message: 'successfullyProductFound',
    statusCode: 200,
    products
  }
}

export const createProduct = async (body) => {
  const { name, slug, description } = body;

  if (
    !name ||
    !description
  ) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    }
  }

  let product = await Product.create({
    name: name,
    slug: slug,
    description: description
  });

  await product.save();

  return {
    type: 'Success',
    message: 'success',
    statusCode: 200,
    product
  }
}
