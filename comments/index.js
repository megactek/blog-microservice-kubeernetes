const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");
const { EVENT_BUS_API } = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/post/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/post/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;
  await axios.post(EVENT_BUS_API, {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  console.log(`Event Receieved: ${type}`);

  if (type === "CommentModerated") {
    const { postId, status, id } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((c) => c.id === id);

    comment.status = status;

    await axios
      .post(EVENT_BUS_API, { type: "CommentUpdated", data })
      .catch((err) => {});
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Comment service listening on port 4001");
});
