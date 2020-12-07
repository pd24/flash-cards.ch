import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Questions from './Questions';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import { Router, Route, Switch } from "react-router";
import {Navbar,Nav} from 'react-bootstrap';
import logo from './logo.png';
import AddQuestions from './AddQuestions';



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

    componentDidMount(){
      //Logging In User
     if(this.props.firebase.auth().currentUser !== null){
      var currentUser = this.props.firebase.auth().currentUser;
      var db = this.props.firebase.database();
      //var ref = db.ref("https://auth-55ed7-default-rtdb.firebaseio.com/auth-55ed7-default-rtdb/f4MWwLwBQchPRJGd5Z498Hup8yn2")
        return db.ref('/' + currentUser.uid).once('value').then((snap) => {
          var data = []
          snap.forEach(s => {
            data.push({id: s.val().id,explanation: s.val().explanation, answer: s.val().answer, option1: s.val().option1, option2: s.val().option2, option3: s.val().option3, text: s.val().text})
          });
          this.setState({ questions: data });
        });
     }
    }
    
  
    render(){
      if(this.state.quizStarted){
        return (
            <Questions questions={this.state.questions} />
        )
      }
      return (
        <div>
        
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
            </div>
      );
    }
  }

  export default StartScreen;