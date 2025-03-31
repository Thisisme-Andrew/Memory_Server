import express from 'express';
import { createMemory, retreiveMemoryByUserID } from '../controllers/memoriesController.js';

const router = express.Router();

router.post('/add', createMemory);
router.get('/getAllByUser', retreiveMemoryByUserID);

export default router;