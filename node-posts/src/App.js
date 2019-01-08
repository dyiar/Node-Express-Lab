import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Posts from "./Components/Posts";
import Post from "./Components/Post";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      post: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/posts")
      .then(response => {
        console.log(response);
        this.setState({
          posts: response.data.posts
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
