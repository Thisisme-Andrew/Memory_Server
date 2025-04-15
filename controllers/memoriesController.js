import { 
  addMemory, 
  getCreatedMemories, 
  getCreatedAndCollaboratedMemories, 
  getMemoryByID, 
  getAllMemories, 
  updateMemoryLongitudeLatitude,
  updateMemoryTitle, 
  addCollaboratorsByMemoryID, 
  addImagesByMemoryID, 
  removeCollaboratorsByMemoryID, 
  removeImagesByMemoryID,
  deleteMemory
} from '../services/memories/memoriesServices.js';

export const createMemory = async (req, res) => {
  let { creatorID, longitude, latitude, collaborators, imageURLs, isPrivate, name } = req.body;
  console.log("req.body received: " + JSON.stringify(req.body));
  if(isPrivate === true) {
    isPrivate = 1;
  }else {
    isPrivate = 0;
  }

  try {
    const response = await addMemory(creatorID, name, isPrivate, longitude, latitude, collaborators, imageURLs);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (createUser): " + err);
    res.status(500).json({ err });
  }
}

//This includes just memories the user has created
export const retrieveCreatedMemoriesByUserID = async (req, res) => {
  let creatorID = req.query.creatorID;
  console.log("req.query.creatorID received: " + JSON.stringify(req.query.creatorID));

  try {
    const response = await getCreatedMemories(creatorID);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err });
  }
}

//This includes both the user has created and collaborated on
export const retreiveAllMemoriesAssociatedByUserID = async (req, res) => {
  let userID = req.query.userID;
  console.log("req.query.userID received: " + JSON.stringify(req.query.userID));

  try {
    const response = await getCreatedAndCollaboratedMemories(userID);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err });
  }
}

export const retrieveMemoryByID = async (req, res) => {
  let memoryID = req.params.id;
  console.log("req.param.memoryID received: " + JSON.stringify(req.params.id));

  try {
    const response = await getMemoryByID(memoryID);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err });
  }
}

export const retrieveAllMemories = async (req, res) => {
  try {
    const response = await getAllMemories();
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err });
  }
}

export const editMemoryLongitudeLatitude = async (req, res) => {
  let { memoryID, longitude, latitude } = req.body;

  try {
    const response = await updateMemoryLongitudeLatitude(memoryID, longitude, latitude);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (editMemoryLongitudeLatitude): " + err);
    res.status(500).json({ err });
  }
}

export const editMemoryTitle = async (req, res) => {
  let { memoryID, title } = req.body;

  try {
    const response = await updateMemoryTitle(memoryID, title);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (editMemoryTitle): " + err);
    res.status(500).json({ err });
  }
}

export const addCollaborators = async (req, res) => {
  let { memoryID, collaborators } = req.body;

  try {
    const response = await addCollaboratorsByMemoryID(memoryID, collaborators);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (addCollaborators): " + err);
    res.status(500).json({ err });
  }
}

export const addImages = async (req, res) => {
  let { memoryID, imageURLs } = req.body;
  
  try {
    const response = await addImagesByMemoryID(memoryID, imageURLs);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err });
  }
}

export const removeMemoryCollaborators = async (req, res) => {
  let { memoryID, collaborators } = req.body;

  try {
    const response = await removeCollaboratorsByMemoryID(memoryID, collaborators);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err });
  }
}

export const removeMemoryImages = async (req, res) => {
  let { memoryID, imageURLs } = req.body;

  try {
    const response = await removeImagesByMemoryID(memoryID, imageURLs);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err });
  }
}

export const removeMemory = async (req, res) => {
  let { memoryID } = req.body;
  try {
    const response = await deleteMemory(memoryID);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err });
  }
}