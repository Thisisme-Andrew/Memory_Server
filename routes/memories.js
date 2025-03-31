import express from 'express';
import { createMemory, retrieveCreatedMemoriesByUserID } from '../controllers/memoriesController.js';

const router = express.Router();

router.post('/add', createMemory);
router.get('/getAllByUser', retrieveCreatedMemoriesByUserID);

export default router;