import { createTable, deleteTable, insertRow, updateRow, getRowByID, getRow, getAllRows } from "../database_general/databaseGeneral.js";
import { MEMORIES_TABLE_NAME, MEMORIES_TABLE_INIT_TYPES, MEMORY_PRIMARY_KEY_NAME,  } from "./constants.js";
import { Memory } from "../../models/Memory.js";

export const initMemories = async () => {
  try {
    createTable(MEMORIES_TABLE_NAME, MEMORIES_TABLE_INIT_TYPES);
    console.log("Memory table created successfully");
    return true;
  } catch (err) {
    console.log("Memory table could not be created.")
    console.log(err);
    return false;
  }
}

export const initCollaborators = async () => {
  try {
    try {
      createTable(MEMORIES_TABLE_NAME, MEMORIES_TABLE_INIT_TYPES);
      console.log("Memory table created successfully");
      return true;
    } catch (err) {
      console.log("Memory table could not be created.")
      console.log(err);
      return false;
    }
  }
}

export const addMemory = async (creatorID, longitude, latitude, collaborators) => {
  const newMemory = Memory(creatorID, longitude, latitude);
  console.log(newMemory);
  
  try {
    const response = await insertRow(MEMORIES_TABLE_NAME, newMemory);
    console.log("Memory created successfully: " + JSON.stringify(response));
    return {body: response};
  } catch (err) {
    console.log("Could not add Memory");
    console.log(err);
    return {err};
  }
}

export const updateMemory = async (memoryID, creatorID, longitude, latitude) => {
  const updatedMemory = Memory(creatorID, longitude, latitude);

  try {
    const response = await updateRow(MEMORIES_TABLE_NAME, MEMORY_PRIMARY_KEY_NAME, memoryID, updatedMemory);
    console.log("Memory updated successfully");
    return {body: response};
  } catch (err) {
    console.log("Could not update Memory");
    console.log(err);
    return {err: err};
  }
}

export const deleteMemory = async (memoryID) => {
  try {
    const response = await deleteRow(MEMORIES_TABLE_NAME, MEMORY_PRIMARY_KEY_NAME, memoryID);
    // will need to delete from collaborators too
    console.log("Memory deleted successfully");
    return {body: response};
  } catch (err) {
    console.log("Memory deletion unsuccessful");
    console.log(err);
    return {err: err};
  }
}

export const getMemoryByID = async (memoryID) => {
  try {
    const response = await getRowByID(MEMORIES_TABLE_NAME, MEMORY_PRIMARY_KEY_NAME, memoryID);
    const memory = {memoryID: response.memoryID, creatorID: response.creatorID, longitude: response.longitude, latitude: response.latitude};
    console.log("Memory retrieved successfully");
    return {body: memory};
  } catch (err) {
    console.log("couldn't get Memory info");
    console.log(err);
    return {err: err};
  }
}

export const getAllMemoriesByUser = async () => {
  // try {
  //   const response = await getAllRows(MEMORIES_TABLE_NAME);
  //   let userList = [];

  //   for(const user of response) {
  //     const {firstName, lastName, email, id} = user;

  //     userList.push({firstName, lastName, email, id});
  //   }

  //   console.log("retreived all Memory: " + JSON.stringify(userList));
  //   return {body: userList};
  // } catch (err) {
  //   console.log("couldn't retreive memories for user");
  //   console.log(err);
  //   return {err: err};
  // }
}
