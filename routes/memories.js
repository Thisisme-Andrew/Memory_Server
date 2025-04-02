import express from 'express';
import { createMemory, retrieveCreatedMemoriesByUserID, retreiveAllMemoriesAssociatedByUserID, retrieveMemoryByID } from '../controllers/memoriesController.js';

const router = express.Router();

router.post('/add', createMemory);
router.get('/getAllByUser', retrieveCreatedMemoriesByUserID);
router.get('/getAllWithCollaboratedByUser', retreiveAllMemoriesAssociatedByUserID);
router.get('/:id', retrieveMemoryByID)

export default router;