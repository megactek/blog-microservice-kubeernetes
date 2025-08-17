import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
// import { QUERY_API } from "../../../config";

export default function PostList() {
  const [posts, setPosts] = useState({});

  async function fetchPosts() {
    const res = await axios.get(`${API_URL}/posts`);
    setPosts(res.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
      key={post.id}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}
