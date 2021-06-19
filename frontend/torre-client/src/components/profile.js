import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import Service from "../services/auth_service";
import BioService from "../services/job";

class Profile extends Component{
    constructor(props){
        super(props)

        this.state = {
            redirect: null,
            userIsReady: false,
            recentUser: { username: ""},

            bios: [],
            opportunities: []
        };
    }

    componentDidMount() {
        const recentUser = Service.getRecentUser();

        if(!recentUser) this.setState({
            redirect: "/home"
        });
        this.setState({ recentUser: recentUser, userIsReady: true })
    }

    fetchData() {
        const bios = BioService.getBiosDashboard();
        const opportunities = BioService.getOppDashboard();

        this.setState({ bios: bios, opportunities: opportunities})

    }

    render(){
        if(this.state.redirect) {
            return <Redirect to = {this.state.redirect}/>
        }

        const {recentUser, bios, opportunities} = this.state;
        return(
            <div className="container">
                {(this.state.userIsReady) ? 
                    <div >
                        <header className="jumbotron">
                            <h3>
                                <strong>{recentUser.username}</strong>
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
                : null}

                <div>
                    <button>
                        Get Jobs
                    </button>

                    <button>
                        Get Opportunity
                    </button>
                </div>

                <div >
                    <p>
                        <strong>Id:</strong> { " " }
                        {bios}
                    </p>
                    <p>
                        <strong>Id:</strong> { " " }
                        {opportunities}
                    </p>
                    </div> 
                
            </div>
        )
    }
}

export default Profile;