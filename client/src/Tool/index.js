import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import './index.css';

const ADD_POST_MUTATION = gql`
  mutation addPost($content: String!, $author: String!) {
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
    const { content, author } = this.state;
    if (content === '')
      return;
    else {
      mutation({ variables: { content, author }})
        .then(res => {
          console.log('Success');
          this.setState({ content: '' });
        })
        .catch(e => console.log(e));
    }
  }

  render() {
    return (
      <Mutation mutation={ADD_POST_MUTATION}>
        {(addPost, { data }) => (
          <div id="tool-box">
            <form id="tool-box-form" onSubmit={e => this.handleSubmit(e, addPost)}>
              <div id="tool-box-title">Poster un commentaire</div>
              <textarea id="tool-box-textarea" value={this.state.content} onChange={e => this.setState({ content: e.target.value })}></textarea>
              <button id="tool-box-submit" type='submit'>Poster</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
};