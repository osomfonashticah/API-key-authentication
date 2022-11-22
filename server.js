const express = require("express");

const app = express();

const port = process.env.PORT || 5001;
const API = require("./apiAuth");
const { users, Countries } = require("./initialData");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    data: { message: "You can get list of countries at /api/country" },
  });
});

app.post("/api/register", (req, res) => {
  let username = req.body.username;
  let user = API.createUser(username, req);
  res.status(201).send({ data: user });
});

app.get("/api/country", API.authenticateKey, (req, res) => {
  let today = new Date().toISOString().split("T")[0];
  console.log(today);
  res.status(200).send({ data: Countries });
});

app.post("/api/country", API.authenticateKey, (req, res) => {
  let country = {
    _id: Date.now(),
    name: req.body.country,
  };

  Countries.push(country);
  res.status(201).send({ data: country });
});

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
