import express from 'express';
import { 
  createMemory, 
  retrieveCreatedMemoriesByUserID, 
  retreiveAllMemoriesAssociatedByUserID, 
  retrieveMemoryByID, 
  retrieveAllMemories,
  editMemoryLongitudeLatitude,
  editMemoryTitle,
  addCollaborators,
  addImages,
  removeMemoryCollaborators,
  removeMemoryImages,
  removeMemory
} from '../controllers/memoriesController.js';

const router = express.Router();

router.post('/add', createMemory);
router.get('/getAllByUser', retrieveCreatedMemoriesByUserID);
router.get('/getAllWithCollaboratedByUser', retreiveAllMemoriesAssociatedByUserID);
router.get('/all', retrieveAllMemories);
router.get('/:id', retrieveMemoryByID);
router.post('/editLongitudeLatitude', editMemoryLongitudeLatitude);
router.post('/editTitle', editMemoryTitle)
router.post('/addCollaborators', addCollaborators);
router.post('/addImages', addImages);
router.delete('/removeCollaborators', removeMemoryCollaborators);
router.delete('/removeImages', removeMemoryImages);
router.delete('/removeMemory', removeMemory);

export default router;