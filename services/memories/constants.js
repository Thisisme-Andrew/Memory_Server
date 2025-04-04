export const MEMORIES_TABLE_NAME = "memories";
export const COLLABORATORS_TABLE_NAME = "collaborators";
export const IMAGES_TABLE_NAME = "images";
export const MEMORIES_TABLE_INIT_TYPES = {
  memoryID: 'INT AUTO_INCREMENT',
  name: "VARCHAR(100) not null",
  isPrivate: "TINYINT(1) not null",
  creatorID: 'INT not null',
  longitude: 'DECIMAL(17, 14) not null',
  latitude: 'DECIMAL(17, 14) not null'
}
export const COLLABORATORS_TABLE_INIT_TYPES = {
  memoryCollaboratorID: "INT AUTO_INCREMENT",
  memoryID: "INT not null",
  userID: "INT not null",
  foreignKeys: "FOREIGN KEY (memoryID) REFERENCES memories(memoryID), FOREIGN KEY (userID) REFERENCES users(id)"
}
export const IMAGES_TABLE_NAME_INIT_TYPES = {
  imagesID: "INT AUTO_INCREMENT",
  memoryID: "INT not null",
  url: "VARCHAR(1000) not null",
  foreignKeys: "FOREIGN KEY (memoryID) REFERENCES memories(memoryID)"
}
export const MEMORY_PRIMARY_KEY_NAME = "memoryID";
export const COLLABORATORS_PRIMARY_KEY_NAME = "memoryCollaboratorID";
export const IMAGES_PRIMARY_KEY_NAME = "imagesID";