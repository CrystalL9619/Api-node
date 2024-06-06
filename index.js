const express = require("express");
const path = require("path");
const connection = require("./src/database/db");

const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/projects", async (req, res) => {
  let db = await connection();
  let result = await db.collection("Projects").find({});
  let response = await result.toArray();
  res.status(200).send(response);
});

app.use("/api/links", async (req, res) => {
  let db = await connection();
  let result = await db.collection("Links").find({});
  let response = await result.toArray();
  res.status(200).send(response);
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  let db = await connection();
  await db.collection("Contact").insertOne({ name, email, message });
  res.status(200).json({ message: "Form submitted successfully" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
