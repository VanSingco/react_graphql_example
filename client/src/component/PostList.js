import React from 'react';
import {Query} from 'react-apollo';
import gql from "graphql-tag";

const POSTS = gql`
    {
        posts{
            id
            title
            content
            author{
                username
            }
        }
    }

`;

const PostList = () => (
    <Query query={POSTS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div className="row">
            {data.posts.map(post => {
                return (
                    <div className="col-md-4" key={post.id}>
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{post.author.username}</h6>
                            <p className="card-text">{post.content}</p>
                            <a href="#" className="card-link">Read More...</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      );
    }}
  </Query>
)

export default PostList