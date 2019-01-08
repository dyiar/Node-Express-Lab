import React, { Component } from "react";

import Post from "./Post";

class Posts extends Component {
  render() {
    return (
      <div className="posts">
        {this.props.posts.map(post => {
          return (
            <Post post={post} title={post.title} contents={post.contents} />
          );
        })}
      </div>
    );
  }
}

export default Posts;
