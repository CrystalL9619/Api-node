require("dotenv").config();
//import MongoClient from mongodb
const { MongoClient } = require("mongodb");

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;

const client = new MongoClient(dbUrl);

console.log(dbUrl);
//MONGODB FUNCTIONS
async function connection() {
  db = client.db("Portfolio"); //inside (),if line 6 already specify the database ,then leave it blank here. if not , write "testdb" here
  return db;
}

module.exports = connection;
