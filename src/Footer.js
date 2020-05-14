import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
              <br></br>
              <Row>
                <Col sm>© Group ID: 2211 - Spring Semester 2020 - Introduction to Programming </Col>
              </Row>
            </div>
          );
    }
  }

  export default Footer;