import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Fade from 'react-bootstrap/Fade';


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
        Show wrong answered questions
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
        questions: props.questions,
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
                <ProgressBar animated now={this.state.progressInPercent} label={`${this.state.progressInPercent.toFixed(2)}%`} />
              </Col>
            </Row>
            <Row>
                <Col>
                  <Card bg="light">
                      <Card.Body>
                        <Card.Title>Question {question.id} / {this.state.questions.length}</Card.Title>
                        <Card.Text>
                          <h2>{question.text}</h2>

                        <Form onChange={this.handleAnswer}>
                        <div key={`default-radio`} className="mb-3">
                          <Form.Check 
                            type='radio'
                            id={`answer1`}
                            label={question.option1}
                            value={1}
                            name='answer'
                          />
                          <Form.Check 
                            type='radio'
                            id={`answer2`}
                            label={question.option2}
                            value={2}
                            name='answer'
                          />
                          <Form.Check 
                            type='radio'
                            id={`answer3`}
                            label={question.option3}
                            value={3}
                            name='answer'
                          />
                          </div>
                          
                          <Button variant="primary" size="lg" value="Weiter" onClick={this.showNextQuestion}>
                            Next Question
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
        var wronglyAnsweredQuestionExplanations = this.state.questions.map((explanation) => {
          if(this.state.wronglyAnsweredQuestions.includes(explanation.id)){
            return (
              <div>
                <Card>
                  <Card.Header>{this.state.questions[explanation.id -1].text}</Card.Header>
                  <Card.Body>
                    <Card.Text>{explanation.explanation}</Card.Text>
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
                            <Col><Card.Title><h3>Your score {this.state.correctlyAnsweredQuestions.length * 10} / {this.state.questions.length * 10}</h3></Card.Title></Col>
                            <Col></Col>
                          </Row>
                        </Container>
                        <br></br>
                        <Button href="/" variant="primary" size="sm" block>
                              New attempt
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