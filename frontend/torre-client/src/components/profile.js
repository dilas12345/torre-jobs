import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Service from "../services/user_service";
import {searchOne} from "../actions/auth";
import search_service from "../services/search_service";

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key={r.id}>
      {r.name}
    </li>
  ))
  return <ul>{options}</ul>
}
class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
        opportunities: [],
        contents: [],

        offset: '',
        results: []
    }
    console.log("State logs", this.state.contents)
  }

  getInfo = () => {
    // search_service.searchOne()
    //   .then(({ data }) => {
    //     this.setState({
    //       results: data.data                             
    //     })
    //   })
    const { dispatch, data } = this.props;

    dispatch(search_service(this.state.offset, this.state.size))
      .then(() => {
        this.setState({
          results: data.data
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });

      console.log("Search content", search_service)
  }

  handleInputChange = () => {
    this.setState({
      offset: this.search.value
    }, () => {
      if (this.state.offset && this.state.offset.length > 1) {
        if (this.state.offset.length % 2 === 0) {
          this.getInfo()

          console.log("Search result", this.getInfo())
        }
      } else if (!this.state.offset) {
        
      }
    })
  }
  
  getBiosJobs() {
    Service.getBiosDashboard()
      .then(res=>{
          console.log('Response from main API: ',res)
          console.log('Home Data: ',res.data)
          let biosData=res.data;
          this.setState({Bios:biosData.code,Details:biosData.message})

      })
      .catch(err=>{
          console.log(err);
      })
  }

  getBiosPeople() {
    Service.getOppDashboard()
      .then(res=>{
          console.log('Response from main API: ',res)
          console.log('Home Data: ',res.data)
          let biosData=res.data;
          this.setState({Bios:biosData.code,Details:biosData.message})

      })
      .catch(err=>{
          console.log(err);
      })
  }

  render() {
    const { user: currentUser } = this.props;
    // const {conterenderData} = this.state;

    // console.log("Hello", this.getBiosJobs())
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

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
            <button onClick={this.getBiosJobs} className="btn btn-primary btn-block">
                Get Jobs
            </button>
            <p>
                <strong>Bios Data:</strong> { " " }
                {/* {this.state.Data} */}
            </p>
            {/* <ul>
              hfaldfkahdk
              {this.getBiosJobs().arrOfNumbers.map((item, i) => {

              return <li key={i}>{item}</li>

              })}
            </ul> */}

            <button onClick={this.getBiosPeople} className="btn btn-primary btn-block">
                Get Opportunity
            </button>
            <p>
                <strong>Opportunity Data:</strong> { " " }
            </p>

        </div> 

        <form>
          <input
            placeholder="Search for Job..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
            {/* <button onClick={this.getInfo} className="btn btn-primary btn-block">
                Search
            </button> */}
          {/* <p>{this.state.offset}</p> */}
          <Suggestions results={this.state.results} />
        </form>

        <form>
          <input
            placeholder="Search for People..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          {/* <p>{this.state.offset}</p> */}
          <Suggestions results={this.state.results} />
        </form>
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
