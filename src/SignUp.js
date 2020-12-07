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

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import {Navbar,Nav} from 'react-bootstrap';
import logo from './logo.png';
import {
  BrowserRouter as Router,Link, Route, Switch, Redirect
} from "react-router-dom";

class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        userAuthenticated: this.props.firebase.auth().currentUser === null ? false : true,
        redirect: false,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      this.props.firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then(() => 
          this.setState({redirect: true})
      ).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
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

 
    render() {
        if (this.state.redirect === true) {
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
                            <Card.Title><h2>SignUp</h2></Card.Title>
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
                                    Sign Up
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


  export default SignUp;