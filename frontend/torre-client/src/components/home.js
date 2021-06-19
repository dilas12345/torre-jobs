import React, { Component } from "react";
import Services from "../services/user_service";

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            contents: ""
        }
    }

    componentDidMount(){
        Services.getPublicContent().then(
            // console.log("Data gotten==>"),
            response => {
                this.setState({
                    contents: response.data
                });
                // console.log("Data gotten==>", this.state.contents)

            },
            error => {
                this.setState({
                    contents: 
                    (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }
    render(){
        return(
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        {this.state.contents}
                    </h3>
                </header>
            </div>
        )
    }
}

export default Home;