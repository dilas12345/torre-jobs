import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from 'react-router-dom';

import Service from "./services/auth_service";
import Home from './components/home';
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
class App extends Component {

  constructor(props){
    super(props)
    
    this.logout = this.logout.bind(this);

    this.state = {
      hRDashboard: false,
      adminDashboard: false,
      recentUser: undefined,
    };
  }

  componentDidMount(){
    const user = Service.getRecentUser();

    if(user){
      this.setState({
        recentUser: user,
        hRDashboard: user.roles.includes("ROLE_HR"),
        adminDashboard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logout(){
    Service.logout();
  }

  render(){
    const { recentUser, hRDashboard, adminDashboard} = this.state;

    return(
      <div>
        <nav className="navbar navnar-expand navbar-dark bg-dark">
          <Link to = {"/"} className="navbar-brand" >
            Torre Jobs
          </Link>

          <div className="navbar-nav mr-auto">
            <li>
              <Link to={"/home"}>
                Home
              </Link>
            </li>

            {adminDashboard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Dashboard
                </Link>
              </li>
            )}

            {hRDashboard && (
              <li className="nav-item">
                <Link to={"/hr"} className="nav-link">
                  HR Dashboard
                </Link>
              </li>
            )}

            {recentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User Dashboard
                </Link>
              </li>
            )}
          </div>

          {recentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-links">
                 {recentUser.username}
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  LogOut
                </Link>
              </li>
            </div>
          ): (
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
        <div>
          <Switch>
            <Route exact path={["/", "home"]} component={Home}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
