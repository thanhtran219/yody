import dotenv from "dotenv";
import sql from 'mssql';

dotenv.config();

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_HOST,
  database: process.env.SQL_DATABASE,
  options: {
    port: parseInt(process.env.SQL_PORT,10),
    encrypt: false,
    trustServerCertificate: true,
  },
};

const pool = new sql.ConnectionPool(config);

const getConnection = async (req, res, next) => {
  try {
    await pool.connect();
    req.db = pool;
    next();
  } catch (error) {
    console.log("Error connecting to database: ", error.message);
    next(error);
  }
};

export { getConnection, sql };