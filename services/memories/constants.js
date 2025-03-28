export const MEMORIES_TABLE_NAME = "memories";
export const MEMORIES_TABLE_INIT_TYPES = {
  memoryID: 'INT AUTO_INCREMENT',
  creatorID: 'INT not null',
  longitude: 'DECIMAL(17, 14) not null',
  latitude: 'DECIMAL(17, 14) not null'
}
export const COLLABORATORS_TABLE_INT_TYPES = {
  memoryCollaboratorID: "ID INT AUTO_INCREMENT PRIMARY KEY",
  memoryID: "INT",
  userID: "INT",
  foreignKeys: ["FOREIGN KEY (memoryID) REFERENCES memories(memoryID)", "FOREIGN KEY (userID) REFERENCES users(userID)"]
}
export const MEMORY_PRIMARY_KEY_NAME = "memoryID";