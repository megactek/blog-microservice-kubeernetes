import React, { useState } from "react";
import axios from "axios";
// import { COMMENT_API } from "../../../config";
import { API_URL } from "../config";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  async function onSubmit(e) {
    try {
      e.preventDefault();

      await axios.post(`${API_URL}/post/${postId}/comments`, {
        content,
      });

      setContent("");
    } catch {}
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="newComment">New Comment</label>
          <input
            type="text"
            className="form-control"
            id="newComment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-2"> Submit</button>
      </form>
    </div>
  );
}
