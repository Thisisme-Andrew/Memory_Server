export const MemoryResponse = (
  memoryID,
  creatorID,
  name,
  isPrivate,
  longitude,
  latitude,
  collaborators,
  imageURLs
) => {
  if(isPrivate === 0) {
    isPrivate = false;
  }else {
    isPrivate = true;
  }
  
  return (
    {
    memoryID,
    creatorID,
    name,
    isPrivate,
    longitude,
    latitude,
    collaborators,
    imageURLs
  })
}
