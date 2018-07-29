import React, { Component } from 'react';
import Tool from '../Tool';
import Comment from '../Comment';
import './index.css';
import LoggedOut from './LoggedOut';

const LoggedIn = () => (
  <div>
    <Tool />
    <Comment />
  </div>
);

class App extends Component {
  state = {
    refetch: false
  }

  checkUser = () => {
    const user = localStorage.getItem('user');
    if (user)
      return <LoggedIn />;
    else
      return <LoggedOut changeState={() => this.setState({ refetch: true })} />;
  }

  render() {
    return (
      <div>
        { this.checkUser() }
      </div>
    );
  }
}

export default App;
