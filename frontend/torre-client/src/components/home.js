import React, { Component } from "react";
import Services from "../services/user_service";
import Jobs from "../services/job";

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            contents: "",
            jobs: [],
            opportunities: [],
            content: []
        }
    }

    bios = (e) => {
        e.preventDefault();

        alert(Jobs.getBiosDashboard());
        Jobs.getBiosDashboard().then(
            response => {
                this.setState({
                    content: response.data
                });
                alert(this.state.content)
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

      opportunities = (e) => {
        e.preventDefault();
        // alert(Jobs.getBiosDashboard());
        Jobs.getOppDashboard().then(
            response => {
                this.setState({
                    content: response.data
                });
                alert(this.state.content.code)
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

    componentDidMount(){
        Services.getPublicContent().then(
            // console.log("Data gotten==>"),
            response => {
                this.setState({
                    contents: response.data
                });
                console.log("HEllo World-->", this.state.contents)

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
                        {this.state.contents} {" "}
                        Welcome Home
                    </h3>
                </header>

                <div >
                    <button onClick={this.bios} className="btn btn-primary btn-block">
                        Get Jobs
                    </button>
                    <p>
                        <strong>Bios Data:</strong> { " " }
                       {this.state.content.maps}
                    </p>

                    <button onClick={this.opportunities} className="btn btn-primary btn-block">
                        Get Opportunity
                    </button>
                    <p>
                        <strong>Opportunity Data:</strong> { " " }
                        {/* {this.state.content} */}
                    </p>
                </div> 
            </div>
        )
    }
}

export default Home;