import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Questions from './Questions';
import Header from './Header';
import Footer from './Footer';

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
                  <h1>Welcome !</h1>
                    <p>
                      <Button variant="primary" onClick={this.startQuiz}>Start Quiz</Button>
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