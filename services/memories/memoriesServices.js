import { createTable, deleteTable, insertRow, updateRow, getRowByID, getRow, getAllRows, insertMemory, getAllRowsByValue } from "../database_general/databaseGeneral.js";
import { MEMORIES_TABLE_NAME, MEMORIES_TABLE_INIT_TYPES, MEMORY_PRIMARY_KEY_NAME, COLLABORATORS_TABLE_INIT_TYPES, COLLABORATORS_PRIMARY_KEY_NAME, COLLABORATORS_TABLE_NAME, IMAGES_TABLE_NAME_INIT_TYPES, IMAGES_TABLE_NAME } from "./constants.js";
import { Memory } from "../../models/Memory.js";
import { MemoryResponse } from '../../models/MemoryResponse.js'

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
export const addMemory = async (creatorID, name, isPrivate, longitude, latitude, collaborators = [], images = []) => {
  const newMemory = Memory(creatorID, name, isPrivate, longitude, latitude);
  console.log("newMemory: " + JSON.stringify(newMemory));
  
  try {
    //Made a special function for this in databaseGeneral, had to make it there to have connection object from mysql2/promise
    const memoryResponse = await insertMemory(MEMORIES_TABLE_NAME, COLLABORATORS_TABLE_NAME, IMAGES_TABLE_NAME, newMemory, collaborators, images);
    if(isPrivate === 1) {
      isPrivate = true;
    }else {
      isPrivate = false;
    }
    const response = MemoryResponse(memoryResponse.memoryID, creatorID, name, isPrivate, longitude, latitude, collaborators, images);

    return response;
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

export const getCreatedMemories = async (userID) => {
  try {
    let response = await getAllRowsByValue(MEMORIES_TABLE_NAME, "creatorID", userID);
    if(!response.length) {
      throw "No memories with that userID";
    }

    let allMemories = [];

    for(let i = 0; i < response.length; i++) {
      const memoryID = response[i].memoryID;
      let collaboratorIDs = [];
      let imageURLs = [];

      let collaborators = await getAllRowsByValue(COLLABORATORS_TABLE_NAME, "memoryID", memoryID);
      for(let j = 0; j < collaborators.length; j++) {
        collaboratorIDs.push(collaborators[j].userID);
      }
      let images = await getAllRowsByValue(IMAGES_TABLE_NAME, "memoryID", memoryID);
      for(let j = 0; j < images.length; j++) {
        imageURLs.push(images[j].url);
      }

      allMemories.push(MemoryResponse(memoryID, response[i].creatorID, response[i].longitude, response[i].latitude, collaboratorIDs, imageURLs));
    }

    return allMemories;
  } catch (err) {
    console.log("couldn't retreive memories for user");
    console.log(err);
    return { err };
  }
}

export const getCreatedAndCollaboratedMemories = async (userID) => {
  try {
    // gets the memory from memory table that user has created
    let createdMemories = await getCreatedMemories(userID);
    console.log("createdMemories: " + JSON.stringify(createdMemories));

    // gets the images and collaborators from image and collaborator tables that user has created {memoryID, creatorID, longitude, latitude}
    const collaboratedRowsFromCollaboratorsTable = await getAllRowsByValue(COLLABORATORS_TABLE_NAME, "userID", userID);

    let collaboratedMemories = [];
    for(let i = 0; i < collaboratedRowsFromCollaboratorsTable.length; i++) {
      let memoryID = collaboratedRowsFromCollaboratorsTable[i].memoryID;
      
      let collaboratoredMemory = await getAllRowsByValue(MEMORIES_TABLE_NAME, MEMORY_PRIMARY_KEY_NAME, memoryID);
      let creatorID = collaboratoredMemory[0].creatorID;
      let longitude = collaboratoredMemory[0].longitude;
      let latitude = collaboratoredMemory[0].latitude;

      let collaboratorIDs = [];
      let collaboratoredMemorysCollaborators = await getAllRowsByValue(COLLABORATORS_TABLE_NAME, "memoryID", memoryID);
      for(let j = 0; j < collaboratoredMemorysCollaborators.length; j++) {
        collaboratorIDs.push(collaboratoredMemorysCollaborators[j].userID);
      }

      let collaboratoredMemorysImagesObjects = await getAllRowsByValue(IMAGES_TABLE_NAME, "memoryID", memoryID);
      let imageURLs = [];
      for(let j = 0; j < collaboratoredMemorysImagesObjects.length; j++) {
        imageURLs.push(collaboratoredMemorysImagesObjects[j].url);
      }

      collaboratedMemories.push(MemoryResponse(memoryID, creatorID, longitude, latitude, collaboratorIDs, imageURLs));
    }

    return {createdMemories, collaboratedMemories};
  } catch (err) {
    console.log("couldn't retreive memories for user");
    console.log(err);
    return { err };
  }
}

export const getMemoryByID = async (memoryID) => {
  try {
    let response = await getAllRowsByValue(MEMORIES_TABLE_NAME, MEMORY_PRIMARY_KEY_NAME, memoryID);
    
    if(!response.length) {
      throw "No memories with that memoryID";
    }

    let collaboratorIDs = [];
    let imageURLs = [];

    let collaborators = await getAllRowsByValue(COLLABORATORS_TABLE_NAME, "memoryID", memoryID);
    for(let j = 0; j < collaborators.length; j++) {
      collaboratorIDs.push(collaborators[j].userID);
    }

    let images = await getAllRowsByValue(IMAGES_TABLE_NAME, "memoryID", memoryID);
    for(let j = 0; j < images.length; j++) {
      imageURLs.push(images[j].url);
    }

    const memory = MemoryResponse(memoryID, response[0].creatorID, response[0].longitude, response[0].latitude, collaboratorIDs, imageURLs);
    
    return memory;
  } catch (err) {
    console.log("couldn't retreive memories for user");
    console.log(err);
    return { err };
  }
}

export const getAllMemories = async () => {
  try {
    let response = await getAllRows(MEMORIES_TABLE_NAME);

    if(!response) {
      throw "No memories saved";
    }
    var memories = []

    for(let i = 0; i < response.length; i++) {
      var memoryID = response[i].memoryID;
      let collaboratorIDs = [];
      let imageURLs = [];

      let collaborators = await getAllRowsByValue(COLLABORATORS_TABLE_NAME, "memoryID", memoryID);
      for(let j = 0; j < collaborators.length; j++) {
        collaboratorIDs.push(collaborators[j].userID);
      }

      let images = await getAllRowsByValue(IMAGES_TABLE_NAME, "memoryID", memoryID);
      for(let j = 0; j < images.length; j++) {
        imageURLs.push(images[j].url);
      }

      const memory = MemoryResponse(memoryID, response[0].creatorID, response[0].longitude, response[0].latitude, collaboratorIDs, imageURLs);
      memories.push(memory)
    }
    console.log("memories is: " + JSON.stringify(memories));
    return memories;
  } catch (err) {
    console.log("couldn't retreive memories for user");
    console.log(err);
    return { err };
  }
}