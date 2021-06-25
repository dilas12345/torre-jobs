import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

// import Service from "../services/auth_service";

import {connect} from "react-redux";
import { register } from "../actions/auth";

const required = (value) => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Fill In the required Field
            </div>
        );
    }
};

const verifyEmail = (value) => {
    if(!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                email is not Valid
            </div>
        );
    }
};

const verifyUsername = (value) => {
    if(value.length < 3 || value.length > 20) {
        return(
            <div className="alert alert-danger" role="alert">
                Username should be less than 8 characters
            </div>
        );
    }
};

const verifyPassword = (value) => {
    if(value.length < 8 || value.length > 20) {
        return(
            <div className="alert alert-danger" role="alert">
                Password should be less than 8 characters
            </div>
        );
    }
};

class Register extends Component {
    constructor(props) {
        super(props)
        this.onRegister = this.onRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            success: false,
        }
    }

    onChangeUsername(a){
        this.setState({
            username: a.target.value
        });
    };

    onChangeEmail(a){
        this.setState({
            email: a.target.value
        });
    };

    onChangePassword(a){
        this.setState({
            password: a.target.value
        });
    };


    onRegister(a){
        a.preventDefault();

        this.setState({
            // message: "",
            success: false
        });

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0) {
            this.props
             .dispatch(
                 register(this.state.username, this.state.email, this.state.password)
             )
             .then(() => {
                 this.setState({
                     success: true,
                 });
             })
             .catch(() => {
                this.setState({
                    success: false,
                });
             });
        }

    }
    render(){
        const { message } = this.props;
        return(
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.onRegister}
                        ref = {c => {
                            this.form =c;
                        }}
                    >
                        {!this.state.success && (
                            <>
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
                                        validator={[required, verifyUsername]}
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
                                        validator={[required, verifyPassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validator={[required, verifyEmail]}
                                    />
                                </div>  

                                <div className="form=group">
                                    <button className="btn btn-primary btn-block">
                                        Register
                                    </button>
                                </div>

                            </>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.success
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }

                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none"}}
                            ref = {c => {
                                this.checkBtn =c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    const {message} = state.message;
    return{
        message,
    }
}
export default connect(mapStateToProps)(Register);