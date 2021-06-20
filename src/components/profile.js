import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {connect} from "react-redux";
import Jobs from "../services/job";

class Profile extends Component{
    constructor(props){
        super(props)

        this.state = {
            jobs: [],
            opportunities: [],
            content: []
        };
    }

    // componentDidMount() {
    //     const recentUser = Service.getRecentUser();

    //     if(!recentUser) this.setState({
    //         redirect: "/home"
    //     });
    //     this.setState({ recentUser: recentUser, userIsReady: true })
    // }

    bios = (e) => {
        e.preventDefault();
        // alert(Jobs.getBiosDashboard());
        Jobs.getBiosDashboard().then(
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

      opportunities = (e) => {
        e.preventDefault();
        // alert(Jobs.getBiosDashboard());
        Jobs.getBiosDashboard().then(
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
    render(){
        const {user: recentUser} = this.props;
        console.log("ALl props==>", this.props)
        const {bios, opportunities} = this.state;

        if(!recentUser) {
            return <Redirect to = {"/login"}/>
        }

        return(
            <div className="container">
                <div >
                    <header className="jumbotron">
                        <h3>
                            <strong>{recentUser.username}</strong> Profile
                        </h3>
                    </header>

                    <p>
                        <strong>Id:</strong> { " " }
                        {recentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong> { " " }
                        {recentUser.email}
                    </p>
                </div> 

                <div >
                    <button onClick={this.bios} className="btn btn-primary btn-block">
                        Get Jobs
                    </button>
                    <p>
                        <strong>Bios Data:</strong> { " " }
                       {this.state.content.code}
                    </p>

                    <button className="btn btn-primary btn-block">
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

function mapStateToProps(state){
    const {user} = state.auth;
    return{
        user,
    }
}
export default connect(mapStateToProps)(Profile);