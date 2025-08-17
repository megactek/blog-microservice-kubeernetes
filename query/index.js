const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { EVENT_BUS_API } = require("./config");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

function handleEvent(type, data) {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id: id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = posts[postId];

    post.comments.push({ id, content });
  }

  if (type === "CommentUpdated") {
    const { id, content, status, postId } = data;

    const post = posts[postId];

    const comment = post.comments.find((c) => c.id === id);

    comment.status = status;
    comment.comment = content;
  }
}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(`Event receieved: ${type}`);
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Query service listening on port 4002");

  try {
    const res = await axios.get(EVENT_BUS_API);
    for (const event of res.data) {
      console.log(`Processing Event: ${event.type}`);
      handleEvent(event.type, event.data);
    }
  } catch {}
});
