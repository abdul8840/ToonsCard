import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getcategory } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getcategory', getcategory)

export default router;