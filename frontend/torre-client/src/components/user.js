import { response } from "express";
import React, {Component} from "react";
import Service from "../services/user_service";

class getUserDashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            content: "",
        };
    }

    componentDidMount(){
        Service.getUserDashboard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content: (
                        error.response &&
                        error.response.data && 
                        error.response.data.message
                    ) || error.message || error.toString()
                });
            }
        );
        
    }

    render(){
        return(
            <div className={container}>
                <header className="jumbotron">
                    <h3>
                        {this.state.content}
                    </h3>
                </header>
            </div>
        )
    }
}