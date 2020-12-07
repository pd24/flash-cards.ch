import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Footer from './Footer';
import AddQuestions from './AddQuestions';
import StartScreen from './StartScreen';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

import {Navbar,Nav} from 'react-bootstrap';
import logo from './logo.png';
import {
  BrowserRouter as Router,Link, Route, Switch, Redirect
} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        userAuthenticated: this.props.firebase.auth().currentUser === null ? false : true,
        currentUser: null,
        logout: false
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.logout = this.logout.bind(this);
      if(this.props.logout === true){
        this.logout();
        this.setState({ logout: true, userAuthenticated: false })
        console.log(this.state);
      }
      
    }

    handleSubmit(event) {
      
      this.props.firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(() => {this.setState({
        userAuthenticated: true
      })}).catch((error) => {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
      });
      
     if(this.props.firebase.auth().currentUser !== null){
      this.setState({ userAuthenticated: true });
     }
      event.preventDefault();
    }

    handleInputChange(event) {
      const target = event.target;
      const value =  target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
      
    }

    logout(){
      this.props.firebase.auth().signOut().then(() => this.setState({logout: true, userAuthenticated: false}))
      .catch(function(error) {
        // An error happened.
      });
      ;
    }
 

    render() {
    if (this.props.logout === true) {
        {this.logout()}   
        return <Redirect to='/' />
    }
    if(this.state.userAuthenticated === false){
      return (
        <div>
          <Header isAuthenticated={false}/>
              <Row>
                <Col>
                  <Card bg="light">
                      <Card.Body>
                        <Card.Title><h2>Login</h2></Card.Title>
                        <Card.Text>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter username" name="username" onChange={this.handleInputChange} />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                         </Form>  
                          
                        </Card.Text>
                      </Card.Body>
                  </Card>
                </Col>
              </Row>
        </div>
      );
    }else{
        return(
          <div>
            <Header isAuthenticated={true}/>
            <StartScreen firebase={this.props.firebase} />
          </div>
        );
    }
    }
  }


  export default Login;