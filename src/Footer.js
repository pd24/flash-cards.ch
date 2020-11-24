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
                <Col sm>© PD - DSCS 2020 Project</Col>
              </Row>
            </div>
          );
    }
  }

  export default Footer;