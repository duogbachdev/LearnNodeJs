import express from 'express';

import { getAllProducts, createProduct } from '../controllers/product.controller.js';

const router = express.Router();

// API
router.get('/', getAllProducts); // -> controller
router.post('/', createProduct) // post

export default router;
