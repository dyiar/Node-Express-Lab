import React from "react";

const Post = props => {
  return (
    <div className="post">
      <h1>{props.title}</h1>
      <p>{props.contents}</p>
    </div>
  );
};

export default Post;
