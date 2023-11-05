import express from 'express';

import productRoute from './product.route.js';
import authRoute from './auth.route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/product', productRoute);

export default router;
