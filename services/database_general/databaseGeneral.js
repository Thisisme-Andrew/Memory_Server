import { config } from '../../config/database.js';
import mysql from "mysql2/promise";
// import promise from "mysql2/promise";

const connectToDatabase = async () => {
  try {
    const conn = await mysql.createConnection(config);
    conn.connect(function (err) {
      if (err) {
        console.log("!!! Cannot connect !!! Error:");
        throw err;
      }
      else {
        console.log('Connected to Azure mySQL Database');
      }
    });
    return conn;
  } catch (err) {
      console.error('Database connection error:', err.message);
      throw err;
  }
}

// columnsAndTypes should be stored as an object, where key is the column name and value is the type. The first pair should be the primary key
export const createTable = async (tableName, columnsAndTypes) => {
    const conn = await connectToDatabase();

    let iterator = 0;
    let queryString = "CREATE TABLE IF NOT EXISTS ";
    queryString = queryString.concat(tableName, " (");

    for (const columnName in columnsAndTypes) {
      const columnType = columnsAndTypes[columnName];

      if(iterator == 0) {
        queryString = queryString.concat(columnName, " ", columnType , " PRIMARY KEY, ");
      }else if(iterator == Object.keys(columnsAndTypes).length - 1) {
        queryString = queryString.concat(columnName, " ", columnType);
        break;
      }else {
        queryString = queryString.concat(columnName, " ", columnType ,", ");
      }

      iterator++;
    }
    queryString = queryString.concat(");");

    await conn.query(queryString)

    await endQuery(conn);
}

export const deleteTable = async (tableName) => {
  const conn = await connectToDatabase();
  await conn.query("DROP TABLE IF EXISTS " + tableName + ";",
    function (err, results, fields) {
      if (err) throw err;
      console.log("Dropped " + tableName + " table if existed.");
    }
  )
  await endQuery(conn);
}

// columnsAndValues is object where key = column name, value = row value
export const insertRow = async (tableName, columnsAndValues) => {
  const conn = await connectToDatabase();

  let iterator = 0;
  let queryString = "INSERT INTO ";
  let valuesToBeAdded = [];
  queryString = queryString.concat(tableName, " (");

  for (const columnName in columnsAndValues) {
    let columnValue = columnsAndValues[columnName];
    valuesToBeAdded.push(columnValue);

    if (iterator === Object.keys(columnsAndValues).length - 1) {
      queryString = queryString.concat(columnName, ") VALUES (");
    } else {
      queryString = queryString.concat(columnName, ", ");
    }

    iterator++;
  }

  const placeholders = valuesToBeAdded.map(() => "?").join(", ");
  queryString = queryString.concat(placeholders, ");");
  console.log("queryString: " + queryString);
  console.log("valuesToBeAdded: " + valuesToBeAdded);

  let [response] = await conn.query(queryString, valuesToBeAdded)

  await endQuery(conn);
  return response;
}

// columnsAndValues is object where key = column name, value = row value
export const updateRow = async (tableName, primaryKeyName, primaryKeyValue, columnsAndValues) => {
  const conn = await connectToDatabase();
  let iterator = 0;
  let queryString = "UPDATE ";
  queryString = queryString.concat(tableName, " SET ");
  let valuesToBeAdded = [];

  for (const columnName in columnsAndValues) {
    let columnValue = columnsAndValues[columnName];
    valuesToBeAdded.push(columnValue);
    if (iterator === Object.keys(columnsAndValues).length - 1) {
      queryString = queryString.concat(columnName, " = ? ");
    } else {
      queryString = queryString.concat(columnName, " = ?, ");
    }

    iterator++;
  }

  queryString = queryString.concat(" WHERE ", primaryKeyName, " = ", primaryKeyValue, ";");
  
  let [response] = await conn.query(queryString, valuesToBeAdded);
  console.log(JSON.stringify(response) + " record(s) updated");

  await endQuery(conn);
  return response;
}

export const deleteRow = async (tableName, primaryKeyName, primaryKeyValue) => {
  const conn = await connectToDatabase();
  let queryString = "DELETE FROM ";
  queryString = queryString.concat(tableName, " WHERE ", primaryKeyName, " = ", primaryKeyValue, ";");

  await conn.query(queryString);

  await endQuery(conn);
}

export const getRowByID = async (tableName, primaryKeyName, primaryKeyValue) => {
  const conn = await connectToDatabase();
  let queryString = "SELECT * FROM ";
  queryString = queryString.concat(tableName, " WHERE ", primaryKeyName, " = ", primaryKeyValue, ";");

  let [response] = await conn.query(queryString);

  await endQuery(conn);

  return response[0];
}

//Should be used with caution (basically just for logging in with users and passwords cause emails are unique)
export const getRow = async (tableName, columnsAndValues) => {
  const conn = await connectToDatabase();

  let queryString = "SELECT * FROM ";
  queryString = queryString.concat(tableName, " WHERE ");
  let iterator = 0;
  let values = [];

  for (const columnName in columnsAndValues) {
    let columnValue = columnsAndValues[columnName];
    values.push(columnValue);
    if (iterator === Object.keys(columnsAndValues).length - 1) {
      queryString = queryString.concat(columnName, " = ?;");
    } else {
      queryString = queryString.concat(columnName, " = ? AND ");
    }

    iterator++;
  }

  let [rows, fields] = await conn.query(queryString, values);

  await endQuery(conn);

  return rows[0];
}

export const getAllRows = async (tableName) => {
  const conn = await connectToDatabase();
  let queryString = "SELECT * FROM ";
  queryString = queryString.concat(tableName, ";");

  let [response] = await conn.query(queryString);

  await endQuery(conn);

  return response;
}

const endQuery = async (conn) => {
  conn.end(function (err) {
    if(err) throw err;
    else  console.log('Done.')
  });
}

