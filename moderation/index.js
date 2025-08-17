const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { EVENT_BUS_API } = require("./config");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log(`Event Recceived: ${type}`);
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post(EVENT_BUS_API, {
      type: "CommentModerated",
      data: { ...data, status },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation service is listening on port 4003");
});
