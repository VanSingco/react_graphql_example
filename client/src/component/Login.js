import React, { Component } from 'react'
import NavBar from './NavBar';
import { graphql } from "react-apollo";
import gql from 'graphql-tag'

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: ''
    }

    onSubmet = (e) => {
        e.preventDefault();
        console.log(this.props)
        const {email, password} = this.state

        this.props.loginUserMutation({
            variables: {email, password}
        }).then((res) => {
            localStorage.setItem('token', res.data.loginUser.token)
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
                            <h1>Login</h1>
                        </div>
                        <form onSubmit={this.onSubmet}>
                            <div className="form-group">
                                <input type="email" onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} className="form-control" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} className="form-control" placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
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

const LOGIN_USER_MUTATION = gql`
    mutation LoginUserMutation($email: String!, $password: String!){
        loginUser(data: {
            email: $email, 
            password:$password
        }){
            user{
                id
            }
            token
        }
    }
`;

export default graphql(LOGIN_USER_MUTATION, {name: 'loginUserMutation'})(Login)
