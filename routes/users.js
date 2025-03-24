import express from 'express';
import { createUser, loginUser, editUser, removeUser, retreiveUser, retreiveAllUsers, changePassword } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);
router.get('/login', loginUser);
router.put('/edit', editUser);
router.delete('/remove', removeUser);
router.get('/:id', retreiveUser);
router.get('/', retreiveAllUsers);
router.put('/reset-password', changePassword);

export default router;