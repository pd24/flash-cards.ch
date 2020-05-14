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
        questions:[
        {id: 1,text:"What does the LAMP stack stand for?", answer:1, option1: "Linux, Apache, MySQL, PHP/Perl/Python", option2: "Linux, Android, Machine Learning, Perl", option3: "Linux, Algorithm, Motherboard, Packet Switching" },
        {id: 2,text:"What is an advantage of Dependency Injection ?", answer:2, option1: "Executes the main method, which starts the program ",option2: "Dependency injection makes testing easier", option3: "Dependency injection protects from tests" },
        {id: 3,text:"What does MVP mean?", answer:3, option1: "Most Valuable Programmer (MVP)",option2: "Model,Variable,Controller", option3: "Model, View, Controller" },
        {id: 4,text:"What are some bad parts of Javascript?", answer:1, option1:"Eval,Callback Hell", option2: "Strict Mode", option3: "The performance of the original language java" },
        {id: 5,text:"What's the output for false == '0' in Javascript", answer:2, option1: "NaN",option2: "true", option3: "false" },
        {id: 6,text:"What's the output for [1,2,3] + [4,5,6] in Javascript", answer:3, option1:"[5,7,9]",option2:"[1,2,3,4,5,6]", option3:"1,2,34,5,6"  },
        {id: 7,text:"Javascript inherits from the Java language...", answer:3, option1: "True",option2: "Java is the native language and Javascript is an extension of it", option3: "False" },
        {id: 8,text:"It's possible to pass a function to a variable in Javascript", answer:1, option1: "True",option2: "False", option3: "Only if the variable is final" },
        {id: 9,text:"What's ReactJS ?", answer:1, option1: "It's a Frontend Framework", option2: "It's reactive programming. A programming paradigm", option3: "It's a Framework for live message exchange between servers" },
        {id: 10,text:"What's Pascal ?", answer:2, option1: "Pascal is a Software Architecture Design",option2: "Pascal is a Programming language", option3: "Pascal is a Pattern used in Software Engineering" }
      ],
      questionExplanation:[
        {id: 1,text:"Linux, Apache, MySQL, PHP/Perl/Python"},
        {id: 2,text:"Dependency injection results in maintainable, testable, readable, flexible, and extensible code " },
        {id: 3,text:"Model View Controller (usually known as MVC) is a software design pattern commonly used for developing user interfaces which divides the related program logic into three interconnected elements." },
        {id: 4,text:"Eval: Executing JavaScript from a string is an enormous security risk. It is far too easy for a hacker to run dangerous code when you use eval(). Callback Hell: Callback hell (long nesting of functions) is caused by poor coding practices." },
        {id: 5,text:"Its True because == in Javascript converts the operands into the same types before comparing them." },
        {id: 6,text:"1,2,34,5,6"},
        {id: 7,text:"False, these are 2 different languages" },
        {id: 8,text:"A function  can be stored in a variable in Javascript" },
        {id: 9,text:"A JavaScript library for building user interfaces (Frontend Framework) " },
        {id: 10,text:"Pascal is an imperative and procedural programming language, designed by Niklaus Wirth as a small, efficient language intended to encourage good programming practices using structured programming and data structuring.", answer:1 }
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