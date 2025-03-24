export const USER_TABLE_NAME = "users";
export const USER_TABLE_INIT_TYPES = {
  id: 'INT AUTO_INCREMENT',
  firstName: 'VARCHAR(50) not null',
  lastName: 'VARCHAR(50) not null',
  email: 'VARCHAR(100) not null UNIQUE',
  password: 'VARCHAR(30) not null',
}
export const PRIMARY_KEY_NAME = "id";