//import MongoClient from mongodb
const { MongoClient } = require("mongodb");

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.rejunxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(dbUrl);
console.log(dbUrl);
//MONGODB FUNCTIONS
async function connection() {
  db = client.db("Portfolio"); //inside (),if line 6 already specify the database ,then leave it blank here. if not , write "testdb" here
  return db;
}

module.exports = connection;
