import express from 'express';
import { createMemory } from '../controllers/memoriesController.js';

const router = express.Router();

router.post('/add', createMemory);

export default router;