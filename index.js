const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const users = require("./routes/users");
const rentals = require("./routes/rentals");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("connected"))
  .catch(() => console.error("could not connect"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
