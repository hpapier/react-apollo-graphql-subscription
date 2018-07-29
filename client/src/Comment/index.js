import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FETCH_POST_QUERY = gql`
  query {
    getPost {
      id
      content
      author
    }
  }
`;

const POST_ADDED_SUBSCRIPTION = gql`
  subscription {
    postAdded {
      id
      content
      author
    }
  }
`;

class Posts extends React.Component {
  componentDidMount() {
    this.props.subscribeToMorePost();
  }

  render() {
    const { post } = this.props;
    console.log(post);
    return (
      <div>
        Hello
      </div>
    );
  }
}

export default class Comment extends React.Component {
  render() {
    return (
      <Query query={FETCH_POST_QUERY}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading)
          return <div>Loading...</div>;

        const subscribeToMorePost = () => {
          subscribeToMore({
            document: POST_ADDED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              
              // =====================
              console.log('-- PREV --');
              console.log(prev);
              console.log('-- SUB DATA --');
              console.log(subscriptionData);
              // =====================

              if (!subscriptionData.data || !subscriptionData.data.postAdded)
                return prev;

              const postAdded = subscriptionData.data.postAdded;

              return Object.assign({}, prev, { post: [...prev.post, postAdded] });
            }
          });
        }

        return <Posts post={data.post} subscribeToMorePost={subscribeToMorePost} />;
      }}
      </Query>
    );
  }
};