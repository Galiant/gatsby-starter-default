import React from "react"

const Post = ({ post }) => (
  <div>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
    <hr />
  </div>
)

export default Post
