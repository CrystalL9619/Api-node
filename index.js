const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const connection = require("./src/database/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware

app.use(
  cors({
    origin: "https://vercel.com/crystals-projects-80265bd0",
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
