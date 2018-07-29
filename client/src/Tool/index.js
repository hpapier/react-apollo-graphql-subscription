import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_POST_MUTATION = gql`
  mutation addPost($content: String!, $author: String!) {
    addPost(content: $content, author: $author) {
      content
      author
    }
  }
`;

export default class Tool extends React.Component {
  state = {
    content: '',
    author: localStorage.getItem('user') || ''
  };

  handleSubmit = (e, mutation) => {
    console.log(mutation);
    e.preventDefault();
    mutation({ variables: { content: this.state.content, author: this.state.author }})
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <Mutation mutation={ADD_POST_MUTATION}>
        {(addPost, { data }) => (
          <div>
            <div>Poster un commentaire</div>
            <form onSubmit={e => this.handleSubmit(e, addPost)}>
              <textarea onChange={e => this.setState({ content: e.target.value })}></textarea>
              <button type='submit'>Poster</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
};