import React, { Component } from 'react'
import NavBar from './NavBar';
import { graphql } from "react-apollo";
import gql from 'graphql-tag';

class Signup extends Component {

    state = {
        username: '',
        name: '',
        email: '',
        password: ''
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {username, email, name, password} = this.state
        this.props.createUserMutation({
            variables: {username, name, email, password}
        }).then((res) => {
            console.log(res)
            localStorage.setItem('token', res.data.createUser.token)
            this.setState({email: '', password: ''})
            window.location.reload();
            this.props.history.push('/')
        }).catch((err) => {
            console.log(err.message)
        });
    }


  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
            <div className="row justify-content-center">
                <div className="login_form col-md-5 mt-5">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-5 text-center">
                            <h1>SignUp</h1>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" onChange={e => this.setState({username: e.target.value})} value={this.state.username}  className="form-control" placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <input type="text" onChange={e => this.setState({name: e.target.value})} value={this.state.name}  className="form-control" placeholder="Fullname"/>
                            </div>
                            <div className="form-group">
                                <input type="email" onChange={e => this.setState({email: e.target.value})} value={this.state.email}  className="form-control" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={e => this.setState({password: e.target.value})} value={this.state.password}  className="form-control" placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Signup</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const CREATE_USER_MUTATION = gql`
    mutation CreateUserMutation($username: String!, $name: String!, $email: String!, $password: String!){
        createUser(data: {
            username: $username,
            name: $name,
            email: $email,
            password: $password
        }){
            user{
                id
            }
            token
        }
    }
`;

export default graphql(CREATE_USER_MUTATION, {name: 'createUserMutation'})(Signup)
