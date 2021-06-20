import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Router, Switch, Route, Link } from 'react-router-dom';

import {connect} from "react-redux";

// import Service from "./services/auth_service";
import Home from './components/home';
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import UserDashboard from "./components/user";
import { clearMessage } from './actions/message';

import {history} from './helpers/history';
import {logout} from "./actions/auth";
class App extends Component {

  constructor(props){
    super(props)
    
    this.logout = this.logout.bind(this);

    this.state = {
      hRDashboard: false,
      adminDashboard: false,
      currentUser: undefined,
    };

    console.log("ALl props", this.props)
    console.log("currentUser-->2.", this.state.currentUser);

    history.listen((location) => {
      props.dispatch(clearMessage());
    })
  }

  // componentDidMount(){
  //   // const user = Service.getcurrentUser();
  //   const user = this.props.user;

  //   console.log("User-->", user)

  //   if(user){
  //     this.setState({
  //       currentUser: user,
  //       hRDashboard: user.roles.includes("ROLE_HR"),
  //       adminDashboard: user.roles.includes("ROLE_ADMIN"),
  //     });
  //   }
  // }

  componentDidMount() {
    const user = this.props.user;
    console.log("User-->", user)
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_HR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }


  logout(){
    // Service.logout();
    this.props.dispatch(logout());
  }

  render(){
    const { currentUser, hRDashboard, adminDashboard} = this.state;

    return(
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to = {"/"} className="navbar-brand" >
              Torre Jobs
            </Link>

            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"}>
                  Home
                </Link>
              </li>

              {hRDashboard && (
                <li className="nav-item">
                  <Link to={"/hr"} className="nav-link">
                    HR Dashboard
                  </Link>
                </li>
              )}

              {adminDashboard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Dashboard
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/userDashboard"} className="nav-link">
                    User Dashboard
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-links">
                  {currentUser.username}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    LogOut
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Register
                  </Link>
                </li>
              </div>
            )} 
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "home"]} component={Home}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/userDashboard" component={UserDashboard} />
            </Switch>
          </div>
        </div>
      </Router>
      
    )
  }
}

function mapStateToProps(state) {
  const {user} = state.auth;
  return{
    user,
  }
}

export default connect(mapStateToProps)(App);
