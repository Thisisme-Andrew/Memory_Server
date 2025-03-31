import express from 'express';
import { createMemory, retreiveCreatedMemoriesByUserID } from '../controllers/memoriesController.js';

const router = express.Router();

router.post('/add', createMemory);
router.get('/getAllByUser', retreiveCreatedMemoriesByUserID);

export default router;