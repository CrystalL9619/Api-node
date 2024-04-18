const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const connection = require("./src/database/db");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || "8000";

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/projects", async (req, res) => {
  let db = await connection();
  let result = await db.collection("Projects").find({});
  let response = await result.toArray();
  let responseInJSON = JSON.stringify(response);

  res.status(200).send(responseInJSON);
});
app.use("/api/links", async (req, res) => {
  let db = await connection();
  let result = await db.collection("Links").find({});
  let response = await result.toArray();
  let responseInJSON = JSON.stringify(response);

  res.status(200).send(responseInJSON);
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
