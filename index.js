import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

import contatosRoutes from './routes/contatos.js';

import sql from 'mssql'

const app = express();
const PORT = process.env.PORT || 3000;

// SQL Server configuration
var config = {
  "user": process.env.DB_USER, // Database username
  "password": process.env.DB_PASS, // Database password
  "server": process.env.DB_SERVER, // Server IP address
  "database": process.env.DB_DATABASE, // Database name
  "options": {
    "encrypt": false // Disable encryption
  }
}

// Connect to SQL Server
sql.connect(config, err => {
  if (err) {
    throw err;
  }
  console.log("Connection Successful!");
});
console.log('test');

app.use(bodyParser.json());
app.use(cors())

app.use('/contatos', contatosRoutes)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))