import { addUser, updateUser, deleteUser, getUserByID, login, getAllUsers, resetPassword } from '../services/users/userServices.js';

export const createUser = async (req, res) => {
  let { email, firstName, lastName, password } = req.body;
  console.log("req.body received: " + JSON.stringify(req.body));

  try {
    const response = await addUser(firstName, lastName, email, password);
    res.status(201).json({firstName: response.firstName, lastName: response.lastName, email: response.email, userID: response.insertId});
  }catch (err) {
    console.log("error in controller (createUser): " + err);
    res.status(500).json({ err });
  }
}

export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  console.log("req.body received: " + JSON.stringify(req.body));

  try {
    const response = await login(email, password);
    res.status(201).json({firstName, lastName, email, userID});
  }catch (err) {
    console.log("error in controller (loginUser): " + err);
    res.status(500).json({ err });
  }
}

export const editUser = async (req, res) => {
  let { email, firstName, lastName, userID } = req.body;
  console.log("req.body received: " + JSON.stringify(req.body));

  try {
    const response = await updateUser(firstName, lastName, email, userID)
    res.status(201).json({firstName, lastName, email, userID});
  }catch (err) {
    console.log("error in controller (editUser): " + err);
    res.status(500).json({ err });
  }
}

export const removeUser = async (req, res) => {
  let { userID } = req.body;
  console.log("req.body received: " + JSON.stringify(req.body));

  try {
    const response = await deleteUser(userID);
    res.status(201).json();
  }catch (err) {
    console.log("error in controller (removeUser): " + err);
    res.status(500).json({ err });
  }
}

export const retreiveUser = async (req, res) => {
  let { userID } = req.body;
  console.log("req.body received: " + JSON.stringify(req.body));

  try {
    const response = await getUserByID(userID);
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err: err });
  }
}

export const retreiveAllUsers = async (req, res) => {
  console.log("req.body received: " + JSON.stringify(req.body));
  
  try {
    const response = await getAllUsers();
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveAllUsers): " + err);
    res.status(500).json({ err });
  }
} 

export const changePassword = async (req, res) => {
  console.log("req.body received: " + JSON.stringify(req.body));
  
  const { email, password } = req.body;

  try {
    const response = await resetPassword(email, password);
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (changePassword): " + err);
    res.status(500).json({ err });
  }
}