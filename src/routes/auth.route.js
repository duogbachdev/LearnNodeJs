import express from 'express';

import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', signin);
router.post('/signup', signup);
// router.post('/tokens', refreshTokens);

export default router;