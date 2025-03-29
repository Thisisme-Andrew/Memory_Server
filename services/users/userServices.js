import { createTable, deleteTable, insertRow, updateRow, getRowByID, getRow, getAllRows } from "../database_general/databaseGeneral.js";
import { USER_TABLE_NAME, USER_TABLE_INIT_TYPES, PRIMARY_KEY_NAME } from "./constants.js";
import { User } from "../../models/User.js";

export const initUsers = async () => {
  try {
    createTable(USER_TABLE_NAME, USER_TABLE_INIT_TYPES);
    console.log("User table created successfully");
    return true;
  } catch (err) {
    console.log("User table could not be created.")
    console.error(err);
    throw err;
  }
}

export const addUser = async (firstName, lastName, email, password) => {
  const newUser = User(firstName, lastName, email, password);
  console.log(newUser);
  
  try {
    const response = await insertRow(USER_TABLE_NAME, newUser);
    console.log("User created successfully: " + JSON.stringify(response));
    return {response};
  } catch (err) {
    console.log("Could not add user");
    console.error("Error in userServices(addUser): " + err);
    throw err;
  }
}

export const updateUser = async (firstName, lastName, email, userID) => {
  const newUser = {firstName, lastName, email};

  try {
    const response = await updateRow(USER_TABLE_NAME, PRIMARY_KEY_NAME, userID, newUser);
    console.log("User updated successfully");
    return {response};
  } catch (err) {
    console.log("Could not update user");
    console.error(err);
    throw err ;
  }
}

export const deleteUser = async (userID) => {
  try {
    const response = await deleteRow(USER_TABLE_NAME, PRIMARY_KEY_NAME, userID);
    console.log("user deleted successfully");
    return {response};
  } catch (err) {
    console.log("user deletion unsuccessful");
    console.error(err);
    throw err;
  }
}

export const getUserByID = async (userID) => {
  try {
    const response = await getRowByID(USER_TABLE_NAME, PRIMARY_KEY_NAME, userID);
    const user = {id: response.id, firstName: response.firstName, lastName: response.lastName, email: response.email};
    console.log("user retrieved successfully");
    return {user};
  } catch (err) {
    console.log("couldn't get user info");
    console.error(err);
    throw err;
  }
}

export const login = async (email, password) => {
  let loginInfo = {email, password}
  try {
    const response = await getRow(USER_TABLE_NAME, loginInfo);
    const user = {id: response.id, firstName: response.firstName, lastName: response.lastName, email: response.email};
    console.log("user verified");
    return {user};
  } catch (err) {
    console.log("couldn't find user with those credentials");
    console.error(err);
    throw err;
  }
}

export const getAllUsers = async () => {
  try {
    const response = await getAllRows(USER_TABLE_NAME);
    let userList = [];

    for(const user of response) {
      const {firstName, lastName, email, id} = user;

      userList.push({firstName, lastName, email, id});
    }

    console.log("retreived all users: " + JSON.stringify(userList));
    return {userList};
  } catch (err) {
    console.log("couldn't retreive all users");
    console.error(err);
    throw err;
  }
}

export const resetPassword = async (email, password) => {
  let email_formatted = `'${email}'`;
  try {
    const response = await updateRow(USER_TABLE_NAME, "email", email_formatted, { password });
    console.log("User updated successfully");
    return {response};
  } catch (err) {
    console.log("Could not update user");
    console.error(err);
    throw err;
  }
}
