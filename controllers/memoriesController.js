import { addMemory, getCreatedMemories } from '../services/memories/memoriesServices.js';

export const createMemory = async (req, res) => {
  let { creatorID, longitude, latitude, collaborators, imageURLs } = req.body;
  console.log("req.body received: " + JSON.stringify(req.body));

  try {
    const response = await addMemory(creatorID, longitude, latitude, collaborators, imageURLs);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (createUser): " + err);
    res.status(500).json({ err });
  }
}

//This includes just memories the user has created
export const retreiveCreatedMemoriesByUserID = async (req, res) => {
  let creatorID = req.query.creatorID;
  console.log("req.query.creatorID received: " + JSON.stringify(req.query.creatorID));

  try {
    const response = await getCreatedMemories(creatorID);
    console.log("response at conntroller: " + JSON.stringify(response));
    res.status(201).json(response);
  }catch (err) {
    console.log("error in controller (retreiveUser): " + err);
    res.status(500).json({ err: err });
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
    res.status(500).json({ err: err });
  }
}