import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import logo from './logo.png';

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
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
            </Navbar>
    );
    }
}

export default Header;