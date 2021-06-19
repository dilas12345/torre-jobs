import React, {Component} from "react";
import {Form, Input, CheckButton} from "react-validation";

import Service from "../services/auth_service";

class Login extends Component {
    render(){
        return(
            <div>
                <div>
                    <Form>
                        <div>
                            <label></label>
                            <Input/>

                            <div>
                                <button>
                                    <span>Login</span>
                                </button>
                            </div>

                            <CheckButton/>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login
