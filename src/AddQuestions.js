import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Footer from './Footer';
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

class AddQuestions extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: "",
        option1: "",
        option2: "",
        option3: "",
        answer: 0,
        explanation: "",
        id: 0,
        numberOfChildren: 0
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setQuestionID = this.setQuestionID.bind(this);
    }

    componentDidMount(){
      if(this.props.firebase.auth().currentUser !== null){
        this.setQuestionID(this.props.firebase.auth().currentUser.uid);
      }
    }

    setQuestionID(userUID){
      this.props.firebase.database().ref('/' + userUID).once("value")
        .then(snapshot => this.setState({
          numberOfChildren: snapshot.numChildren(),
          id: snapshot.numChildren()
        }));
    }

    createQuestion(userUID,text,explanation,option1,option2,option3,answer,numberOfChildren){
      this.props.firebase.database().ref('/' + userUID + '/' + numberOfChildren ).set({
        answer: Number.parseInt(answer,10),
        explanation: explanation,
        id : numberOfChildren + 1,
        option1: option1,
        option2: option2,
        option3: option3,
        text: text
      });
    }


    handleSubmit(event) {
      if(this.props.firebase.auth().currentUser !== null){
        this.createQuestion(this.props.firebase.auth().currentUser.uid,this.state.text,this.state.explanation,this.state.option1,this.state.option2,this.state.option3,this.state.answer,this.state.numberOfChildren);
        this.setQuestionID(this.props.firebase.auth().currentUser.uid);
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
      console.log(this.state)
    }

    render() {
      return (
        <div>
              <Header isAuthenticated={true}/>
              <Row>
                <Col>
                  <Card bg="light">
                      <Card.Body>
                        <Card.Title><h2>Add a Question</h2></Card.Title>
                        <Card.Text>
                          <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="text">
                              <Form.Label>Text</Form.Label>
                              <Form.Control type="text" placeholder="Your Question" name="text" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="option1">
                              <Form.Label>Text Option 1</Form.Label>
                              <Form.Control type="text" placeholder="Text for Option 1" name="option1" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="option2">
                              <Form.Label>Text Option 2</Form.Label>
                              <Form.Control type="text" placeholder="Text for Option 2" name="option2" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="option3">
                              <Form.Label>Text Option 3</Form.Label>
                              <Form.Control type="text" placeholder="Text for Option 3" name="option3" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="answer">
                              <Form.Label>Solution</Form.Label>
                              <Form.Control as="select" multiple name="answer" onChange={this.handleInputChange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="explanation">
                              <Form.Label>Explanation of Solution</Form.Label>
                              <Form.Control type="text" placeholder="Your Explanation" name="explanation" onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                              Add Question
                            </Button>
                          </Form>
                        </Card.Text>
                      </Card.Body>
                  </Card>
                </Col>
              </Row>
        </div>

      )
    }
  }


  export default AddQuestions;