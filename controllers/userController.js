import { addUser, updateUser, deleteUser, getUserByID, login, getAllUsers, resetPassword } from '../services/users/userServices.js';

export const createUser = async (req, res) => {
  let newUser = req.body
  
  try {
    const response = await addUser(newUser);
    if(response.err) {
      throw new Error('Failed to create user');
    }
    res.status(201).json({firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email, userID: response.insertId});
  }catch (err) {
    res.status(500).json({ err: err });
  }
}

export const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    const response = await login(email, password);
    if(response.err) {
      throw new Error('Failed to verify user');
    }
    res.status(201).json({firstName, lastName, email, userID});
  }catch (err) {
    res.status(500).json({ err: err });
  }
}

export const editUser = async (req, res) => {
  let { email, firstName, lastName, userID } = req.body;

  try {
    const response = await updateUser(firstName, lastName, email, userID)
    if(response.err) {
      throw new Error('Failed to edit user');
    }
    res.status(201).json({firstName, lastName, email, userID});
  }catch (err) {
    res.status(500).json({ err: err });
  }
}

export const removeUser = async (req, res) => {
  let { id } = req.body;

  try {
    const response = await deleteUser(id);
    if(response.err) {
      throw new Error('Failed to remove user');
    }
    res.status(201).json();
  }catch (err) {
    res.status(500).json({ err: err });
  }
}

export const retreiveUser = async (req, res) => {
  let { id } = req.body;

  try {
    const response = await getUserByID(id);
    if(response.err) {
      throw new Error('Failed to get user');
    }
    res.status(201).json(response);
  }catch (err) {
    res.status(500).json({ err: err });
  }
}

export const retreiveAllUsers = async (req, res) => {
  try {
    const response = await getAllUsers();
    if(response.err) {
      throw new Error('Failed to get user');
    }
    res.status(201).json(response);
  }catch (err) {
    res.status(500).json({ err: err });
  }
} 

export const changePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await resetPassword(email, password);
    if(response.err) {
      throw new Error('Failed to get user');
    }
    res.status(201).json(response);
  }catch (err) {
    res.status(500).json({ err: err });
  }
}