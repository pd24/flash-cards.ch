import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Questions from './Questions';
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
                Universität St. Gallen 
              </Navbar.Brand>   
            </Navbar>
    );
    }
}
  
  class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
              <br></br>
              <Row>
                <Col sm>© Projektgruppe 84 - FS 20 - Supply Chain Simulation </Col>
              </Row>
            </div>
          );
    }
    
  }
  
  class StartScreen extends React.Component{
    constructor(props){
      super(props);
      this.state = {quizStarted: false};
      this.startQuiz = this.startQuiz.bind(this);
    }
    startQuiz(){
      this.setState(quizStarted => ({
        quizStarted: true
      }));
    }
  
    render(){
      if(this.state.quizStarted){
        return (
          <Container fluid="md">
            <Header />
            <Questions />
            <Footer />
          </Container>
        )
      }
      return (
        <Container fluid="md">
          <Header />
            <Row>
              <Col>
                <Jumbotron bg="light">
                  <h1>Herzlich Willkommen!</h1>
                  <p>
                    Auf dieser Seite findest du ein Quiz zum Thema Supply Chain Simulation, um deinen Lernstand abzufragen sowie dein
                    Wissen zu festigen.  
                  </p>
                  <p>
                    <Button variant="primary" onClick={this.startQuiz}>Quiz starten</Button>
                  </p>
                </Jumbotron>
              </Col>
            </Row>
          <Footer />
        </Container>
      );
    }
  }

  export default StartScreen;