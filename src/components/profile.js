import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Service from "../services/user_service";

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      opportunities: [],
      contents: [],
    }

    this.getBiosJobs = this.getBiosJobs.bind(this);

    console.log("State logs", this.state.contents)
  }

  async getBiosJobs() {
    Service.getBiosDashboard().then(
        response => {
            this.setState({
                contents: response.data
            });
            // alert(this.state.contents)
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

  async componentDidMount() {
    const contents = await this.getBiosJobs();
    this.setState({contents})
  }

  // componentDidMount() {
  //     Service.getBiosDashboard().then(
  //         response => {
  //             this.setState({
  //                 contents: response.data
  //             });
  //             alert(this.state.contents)
  //             console.log("contents-->", this.state.contents);
  //         },
  //         error => {
  //             this.setState({
  //                 contents: (
  //                     error.response &&
  //                     error.response.data && 
  //                     error.response.data.message
  //                 ) || error.message || error.toString()
  //             });
  //         }
  //     );
  // }

  // opportunities = (e) => {
  //   e.preventDefault();
  //   // alert(Jobs.getBiosDashboard());
  //   Service.getOppDashboard().then(
  //       response => {
  //           this.setState({
  //               data: response.data
  //           });
  //           alert(this.state.data.code)
  //           console.log("contents-->", this.state.data);
  //       },
  //       error => {
  //           this.setState({
  //               contents: (
  //                   error.response &&
  //                   error.response.data && 
  //                   error.response.data.message
  //               ) || error.message || error.toString()
  //           });
  //       }
  //   );
  // }

  render() {
    const { user: currentUser } = this.props;
    const {contents} = this.state
    // console.log("Profile Data-->", this.props)
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    const JobsBios = ({ code, message }) => (

      <div>
    
        {/* <img src={avatar} /> */}
    
        <div>
    
          <p>{code}</p>
    
          <p>{message}</p>
    
        </div>
    
      </div>
    
    );

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>

        <div >
            <button onClick={this.bios} className="btn btn-primary btn-block">
                Get Jobs
            </button>
            <p>
                <strong>Bios Data:</strong> { " " }
            </p>

            <div>
              {this.state.contents.map((content) => (
              <JobsBios

                code={`${content} ${content}`}

                // avatar={user.picture.thumbnail}

                // email={user.email}

                // key={user.id.value}

              />

              ))}
            </div>

            <button onClick={this.opportunities} className="btn btn-primary btn-block">
                Get Opportunity
            </button>
            <p>
                <strong>Opportunity Data:</strong> { " " }
            </p>
        </div> 

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
