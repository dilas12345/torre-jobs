import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button"

import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../actions/auth";

const required = (value) => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This Field is required!
            </div>
        );
    }
};
class Login extends Component {
    constructor(props){
        super(props)

        this.onLogin = this.onLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            // message: ""
        }

        console.log("Login Props", this.props)
    };

    onChangeUsername(a) {
        this.setState({
            username: a.target.value
        });
    };

    onChangePassword(a){
        this.setState({
            password: a.target.value
        })
    };

    onLogin(a) {
        a.preventDefault();

        this.setState({
        //   message: "",
          loading: true
        });
    
        this.form.validateAll();
    
        const {dispatch, history} = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            dispatch(login(this.state.username, this.state.password))
             .then(() => {
                console.log("I got hit")

                history.push("/profile");
                window.location.reload();
            })
            .catch(() => {
                this.setState({
                    loading: false
                })
            })
        } else {
            this.setState({
                loading: false
            });
        }
    }
    render(){
        const{ isLoggedIn, message } = this.props;
        console.log("LoggedIn-->", this.props);
        if(isLoggedIn) {
            return <Redirect to="/profile" />;
        }
        return(
            <div className="col-mid-12">
                <div className="card card-container">
                    <Form
                        onSubmit = {this.onLogin}
                        ref = {c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="username">
                                Username
                            </label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />  
                        </div>

                        <div className="form-group">
                            <button 
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <CheckButton
                            style={{ display: "none"}}
                            ref = {c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {isLoggedIn} = state.auth;
    console.log("LoogedIn--->", isLoggedIn)
    const {message} = state.message;
    return{
        isLoggedIn,
        message
    };
}
export default connect(mapStateToProps)(Login)
