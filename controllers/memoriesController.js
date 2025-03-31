import { addMemory } from '../services/memories/memoriesServices.js';

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