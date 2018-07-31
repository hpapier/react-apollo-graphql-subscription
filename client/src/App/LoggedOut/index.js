import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import './index.css';

const ADD_USER_MUTATION = gql`
  mutation addUser($name: String!, $password: String!) {
    addUser(name: $name, password: $password) {
      name
    }
  }
`;

export default class LoggedOut extends React.Component {
  state = {
    name: '',
    pwd: ''
  }

  handleSubmit = (e, mutation) => {
    e.preventDefault();
    mutation({ variables: { name: this.state.name, password: this.state.pwd }})
      .then(({ data }) => {
        localStorage.setItem('user', data.addUser.name);
        this.props.changeState();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Mutation mutation={ADD_USER_MUTATION}>
      {(addUser, { data }) => (
        <div id="logged-out">
          <form id="logged-out-form" onSubmit={e => this.handleSubmit(e, addUser)}>
            <div id="logged-out-form-title">Real-Time Chat</div>
            <div id="logged-out-form-username-box">
              <label htmlFor="username" id="logged-out-form-label-username">Username</label>
              <input id="logged-out-form-input-username" type='text' name="username" onChange={e => this.setState({ name: e.target.value })} />
            </div>
            <div id="logged-out-form-pwd-box">
              <label htmlFor="pwd" id="logged-out-form-label-pwd">Password</label>
              <input autoComplete='off' id="logged-out-form-input-pwd" type='password' onChange={e => this.setState({ pwd: e.target.value })} />
            </div>
            <button id="logged-out-form-submit" type='submit'>Connection</button>
          </form>
        </div>
      )}
      </Mutation>
    );
  }
};