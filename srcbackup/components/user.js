import React, {Component} from "react";
import { connect } from "react-redux";
import Service from "../services/user_service";

class getUserDashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            content: "",
        };

        console.log("ALL Props-->", this.props)
    }

    componentDidMount(){
        Service.getUserDashboard().then(
            response => {
                this.setState({
                    content: response.data
                });

                console.log("Content-->", this.state.content);
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
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        {this.state.content}
                    </h3>
                </header>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {user} = state.auth;
    console.log("Mapped Props-->", {user})
    return{
        user,
    }
}

export default connect(mapStateToProps)(getUserDashboard);
