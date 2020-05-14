import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Fade from 'react-bootstrap/Fade';
import useState from 'react';
import {
  BrowserRouter as Router,
  Link 
} from "react-router-dom";
import StartScreen from './StartScreen';

function Progress(props){
  return (<div class="Progress">
      <ProgressBar animated now={props.progressInPercent} label={`${props.progressInPercent}%`} />
    </div>)
}

function WrongAnsweredQuestions(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => setOpen(!open)}
        aria-controls="example-fade-text"
        aria-expanded={open}
        size="sm" block
      >
        Falsch beantwortete Fragen anzeigen
      </Button>
      <br></br>
      <Fade in={open}>
        <div id="example-fade-text">
          {props.questions}
        </div>
      </Fade>
    </div>
  );
}

class Questions extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentQuestionId: 0,
        questions:[
        {id: 1,text:"Frage 1", answer:1 },
        {id: 2,text:"Frage 2", answer:2 },
        {id: 3,text:"Frage 3", answer:3 },
        {id: 4,text:"Frage 4", answer:1 },
        {id: 5,text:"Frage 5", answer:1 },
        {id: 6,text:"Frage 6", answer:1 },
        {id: 7,text:"Frage 7", answer:1 },
        {id: 8,text:"Frage 8", answer:1 },
        {id: 9,text:"Frage 9", answer:1 },
        {id: 10,text:"Frage 10", answer:1 }
      ],
      questionExplanation:[
        {id: 1,text:"Explaination of Frage 1", answer:1 },
        {id: 2,text:"Explaination of Frage 2", answer:2 },
        {id: 3,text:"Explaination of Frage 3", answer:3 },
        {id: 4,text:"Explaination of Frage 4", answer:1 },
        {id: 5,text:"Explaination of Frage 5", answer:1 },
        {id: 6,text:"Explaination of Frage 6", answer:1 },
        {id: 7,text:"Explaination of Frage 7", answer:1 },
        {id: 8,text:"Explaination of Frage 8", answer:1 },
        {id: 9,text:"Explaination of Frage 9", answer:1 },
        {id: 10,text:"Explaination of Frage 10", answer:1 }
      ],
      wronglyAnsweredQuestions:[],
      correctlyAnsweredQuestions:[],
      progressInPercent: 0,
      lastSelectedOption: 0
    };
      this.incrementCurrentQuestionId = this.incrementCurrentQuestionId.bind(this);
      this.handleAnswer = this.handleAnswer.bind(this);
      this.showNextQuestion = this.showNextQuestion.bind(this);
    }


    incrementCurrentQuestionId(){
      this.setState((state) => {
        return {currentQuestionId: state.currentQuestionId + 1}
      });
    }

    increaseProgressbar(){
      this.setState((state) => {
        return {progressInPercent: state.progressInPercent + (100/state.questions.length) }
      });
    }

    handleAnswer(e){
      this.setState({
        lastSelectedOption: e.target.value
      });
    }

    showNextQuestion(){
      if(this.state.questions[this.state.currentQuestionId].answer == this.state.lastSelectedOption){
        this.state.correctlyAnsweredQuestions.push(this.state.questions[this.state.currentQuestionId].id);
      }else{
        this.state.wronglyAnsweredQuestions.push(this.state.questions[this.state.currentQuestionId].id);
      }
      this.incrementCurrentQuestionId();
      this.increaseProgressbar();
    }

    render() {
      if(this.state.currentQuestionId < this.state.questions.length){
        var question = this.state.questions[this.state.currentQuestionId];
        return (
          <div>
            <Row>
              <Col>
                <ProgressBar animated now={this.state.progressInPercent} label={`${this.state.progressInPercent}%`} />
              </Col>
            </Row>
            <Row>
                <Col>
                  <Card bg="light">
                      <Card.Body>
                        <Card.Title>Frage {question.id} / {this.state.questions.length}</Card.Title>
                        <Card.Text>
                        <Form onChange={this.handleAnswer}>
                        <div key={`default-radio`} className="mb-3">
                          <Form.Check 
                            type='radio'
                            id={`answer1`}
                            label={`Antwort 1`}
                            value={1}
                            name='answer'
                          />
                          <Form.Check 
                            type='radio'
                            id={`answer2`}
                            label={`Antwort 2`}
                            value={2}
                            name='answer'
                          />
                          <Form.Check 
                            type='radio'
                            id={`answer3`}
                            label={`Antwort 3`}
                            value={3}
                            name='answer'
                          />
                          </div>
                          
                          <Button variant="primary" size="lg" value="Weiter" onClick={this.showNextQuestion}>
                            Nächste Frage
                          </Button>{' '}
                        </Form>
                        </Card.Text>
                        
                      </Card.Body>
                  </Card>
                </Col>
              </Row>
          </div>
        );
      }else{
        var wronglyAnsweredQuestionExplanations = this.state.questionExplanation.map((explanation) => {
          if(this.state.wronglyAnsweredQuestions.includes(explanation.id)){
            return (
              <div>
                <Card>
                  <Card.Header>{this.state.questions[explanation.id -1].text}</Card.Header>
                  <Card.Body>
                    <Card.Text>{explanation.text}</Card.Text>
                  </Card.Body>
                </Card><br></br>
              </div>
              
            );
          }
        });
        
        return(
          <div>
            <Row>
              <Col>
                <ProgressBar>
                  <ProgressBar striped variant="success" now={this.state.correctlyAnsweredQuestions.length * 10} label={ this.state.correctlyAnsweredQuestions.length * 10 + '%' } key={1} />
                  <ProgressBar striped variant="danger" now={this.state.questions.length * 10 - this.state.correctlyAnsweredQuestions.length * 10} label={this.state.questions.length * 10 - this.state.correctlyAnsweredQuestions.length * 10 + '%'} key={2} />
                </ProgressBar>
              </Col>
            </Row>
            <Row>
                <Col>
                  <Card bg="light">
                      <Card.Body>
                        <Card.Text>
                        <Container>
                          <Row>
                            <Col></Col>
                            <Col><Card.Title><h3>Deine Punktzahl {this.state.correctlyAnsweredQuestions.length * 10} / {this.state.questions.length * 10}</h3></Card.Title></Col>
                            <Col></Col>
                          </Row>
                        </Container>
                        <br></br>
                        <Button href="/" variant="primary" size="sm" block>
                              Neuer Versuch
                        </Button>
                            
                        <br></br>
                        <WrongAnsweredQuestions questions={wronglyAnsweredQuestionExplanations} />
                        </Card.Text>
                      </Card.Body>
                  </Card>
                </Col>
              </Row>
              
          </div>
        );
      }
      

      
    }
  }


  export default Questions;