const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const {
  POST_API,
  COMMENT_API,
  QUERY_API,
  MODERATION_API,
} = require("./config");

const app = express();

app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post(`${POST_API}/events`, event).catch((err) => console.log(err));

  axios.post(`${COMMENT_API}/events`, event).catch((err) => console.log(err));

  axios.post(`${QUERY_API}/events`, event).catch((err) => console.log(err));

  axios
    .post(`${MODERATION_API}/events`, event)
    .catch((err) => console.log(err));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, function () {
  console.log("new event bus deployment");
  console.log("Event bus service running on port 4005");
});
