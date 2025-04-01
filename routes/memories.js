import express from 'express';
import { createMemory, retrieveCreatedMemoriesByUserID, retreiveAllMemoriesAssociatedByUserID } from '../controllers/memoriesController.js';

const router = express.Router();

router.post('/add', createMemory);
router.get('/getAllByUser', retrieveCreatedMemoriesByUserID);
router.get('/getAllWithCollaboratedByUser', retreiveAllMemoriesAssociatedByUserID);

export default router;