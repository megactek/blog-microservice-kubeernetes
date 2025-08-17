import React, { useState } from "react";
import axios from "axios";
// import { POST_API } from "../../../config";
import { API_URL } from "../config";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  async function onSubmit(e) {
    try {
      e.preventDefault();

      await axios.post(`${API_URL}/posts/create`, { title });

      setTitle("");
    } catch (error) {}
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            id="title"
          />
        </div>
        <button className="btn btn-primary mt-2 " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
