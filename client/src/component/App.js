import React, { Component } from 'react';
import NavBar from './NavBar';
import PostList from './PostList';

class App extends Component {
  render() {
    return (
      <div className="App">
       <NavBar/>
        <div className="container mt-5 mb-5">
          <PostList />
        </div>
      </div>
    );
  }
}

export default App;
