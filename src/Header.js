import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav} from 'react-bootstrap';
import logo from './logo.png';
import {
  BrowserRouter as Router,Link, Route, Switch
} from "react-router-dom";

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
      if(this.props.isAuthenticated === true){
        return(
          <Navbar bg="light">
            <Navbar.Brand>
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="University logo"
              /> {' '}
              University of St. Gallen 
            </Navbar.Brand>
              <Nav className="mr-auto">
                <Link to="/">Home</Link>
                <Link to="/questions/add">Add Questions</Link>
                <Link to="/logout">Logout</Link>
              </Nav> 
         </Navbar>
        );
      }else{
        return(
          <Navbar bg="light">
            <Navbar.Brand>
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="University logo"
              /> {' '}
              University of St. Gallen 
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </Nav> 
          </Navbar>
        );
      }
      
    }
}

export default Header;
