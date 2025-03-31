import { createTable, deleteTable, insertRow, updateRow, getRowByID, getRow, getAllRows, insertMemory } from "../database_general/databaseGeneral.js";
import { MEMORIES_TABLE_NAME, MEMORIES_TABLE_INIT_TYPES, MEMORY_PRIMARY_KEY_NAME, COLLABORATORS_TABLE_INIT_TYPES, COLLABORATORS_PRIMARY_KEY_NAME, COLLABORATORS_TABLE_NAME, IMAGES_TABLE_NAME_INIT_TYPES, IMAGES_TABLE_NAME } from "./constants.js";
import { Memory } from "../../models/Memory.js";
import { Collaborator } from "../../models/Collaborator.js";

export const initMemories = async () => {
  try {
    await createTable(MEMORIES_TABLE_NAME, MEMORIES_TABLE_INIT_TYPES);
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
    await createTable(COLLABORATORS_TABLE_NAME, COLLABORATORS_TABLE_INIT_TYPES);
    console.log("Collaborators table created successfully");
    return true;
  } catch (err) {
    console.log("Collaborators table could not be created.")
    console.log(err);
    throw err;
  }
}

export const initImages = async () => {
  try {
    await createTable(IMAGES_TABLE_NAME, IMAGES_TABLE_NAME_INIT_TYPES);
    console.log("Collaborators table created successfully");
    return true;
  } catch (err) {
    console.log("Collaborators table could not be created.")
    console.log(err);
    throw err;
  }
}

// collaboratrs should be a list of userIDs
// images should be a list of urls
export const addMemory = async (creatorID, longitude, latitude, collaborators = [], images = []) => {
  const newMemory = Memory(creatorID, longitude, latitude);
  console.log("newMemory: " + JSON.stringify(newMemory));
  
  try {
    //Made a special function for this in databaseGeneral, had to make it there to have connection object from mysql2/promise
    const memoryResponse = await insertMemory(MEMORIES_TABLE_NAME, COLLABORATORS_TABLE_NAME, IMAGES_TABLE_NAME, newMemory, collaborators, images);

    return {memoryID: memoryResponse.memoryID, creatorID, longitude, latitude, collaborators, imageURLs: images};
  } catch (err) {
    console.log("Could not add Memory/collaborator");
    console.log(err);
    throw err;
  }
}

export const updateMemory = async (memoryID, creatorID, longitude, latitude) => {
  const updatedMemory = Memory(creatorID, longitude, latitude);

  try {
    const response = await updateRow(MEMORIES_TABLE_NAME, MEMORY_PRIMARY_KEY_NAME, memoryID, updatedMemory);
    console.log("Memory updated successfully");
    return response;
  } catch (err) {
    console.log("Could not update Memory");
    console.log(err);
    throw err;
  }
}

export const deleteMemory = async (memoryID) => {
  try {
    const response = await deleteRow(MEMORIES_TABLE_NAME, MEMORY_PRIMARY_KEY_NAME, memoryID);
    // will need to delete from collaborators too
    console.log("Memory deleted successfully");
    return response;
  } catch (err) {
    console.log("Memory deletion unsuccessful");
    console.log(err);
    throw err;
  }
}

export const getMemoryByID = async (memoryID) => {
  try {
    const response = await getRowByID(MEMORIES_TABLE_NAME, MEMORY_PRIMARY_KEY_NAME, memoryID);
    const memory = {memoryID: response.memoryID, creatorID: response.creatorID, longitude: response.longitude, latitude: response.latitude};
    console.log("Memory retrieved successfully");
    return memory;
  } catch (err) {
    console.log("couldn't get Memory info");
    console.log(err);
    throw err;
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
