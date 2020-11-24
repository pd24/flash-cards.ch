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
      this.state = {quizStarted: false, questions: []};
      this.startQuiz = this.startQuiz.bind(this);
    }
    startQuiz(){
      this.setState(quizStarted => ({
        quizStarted: true
      }));
    }

    componentDidMount() {
      fetch('http://35.195.189.10/list')
      .then((response) => response.json())
      .then(results => {
          this.setState({ questions: results });
      });
    }
  
    render(){
      if(this.state.quizStarted){
        return (
          <Container fluid="md">
            <Header />
            <Questions questions={this.state.questions} />
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
                  <h1>Welcome!</h1>
                  <p>
                  Your flashcard app.
                  </p>
                    <p>
                      <Button variant="primary" onClick={this.startQuiz}>Start learning</Button>
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