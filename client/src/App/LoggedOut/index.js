import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
        <div>
          <form onSubmit={e => this.handleSubmit(e, addUser)}>
            <label>Username</label>
            <input type='text' onChange={e => this.setState({ name: e.target.value })} />
            <label>Password</label>
            <input type='password' onChange={e => this.setState({ pwd: e.target.value })} />
            <button type='submit'>Connection</button>
          </form>
        </div>
      )}
      </Mutation>
    );
  }
};