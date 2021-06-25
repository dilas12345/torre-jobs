import React, { Component } from "react";
import Services from "../services/user_service";
import Jobs from "../services/job";

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            content: "",
            jobs: [],
            opportunities: [],
            contents: []
        }
    }

    bios = (e) => {
        e.preventDefault();

        alert(Jobs.getBiosDashboard());
        Jobs.getBiosDashboard().then(
            response => {
                this.setState({
                    contents: response.data
                });
                alert(this.state.contents)
                console.log("contents-->", this.state.contents);
            },
            error => {
                this.setState({
                    contents: (
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
                    contents: response.data
                });
                alert(this.state.contents.code)
                console.log("contents-->", this.state.contents);
            },
            error => {
                this.setState({
                    contents: (
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
                    contentss: response.data
                });
                console.log("HEllo World-->", this.state.contentss)

            },
            error => {
                this.setState({
                    contentss: 
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
                        {this.state.content} {" "}
                        Welcome Home
                    </h3>
                </header>

                <div >
                    <button onClick={this.bios} className="btn btn-primary btn-block">
                        Get Jobs
                    </button>
                    <p>
                        <strong>Bios Data:</strong> { " " }
                       {this.state.contents.maps}
                    </p>

                    <button onClick={this.opportunities} className="btn btn-primary btn-block">
                        Get Opportunity
                    </button>
                    <p>
                        <strong>Opportunity Data:</strong> { " " }
                        {/* {this.state.contents} */}
                    </p>
                </div> 
            </div>
        )
    }
}

export default Home;