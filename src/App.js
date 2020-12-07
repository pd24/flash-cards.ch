import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StartScreen from './StartScreen';
import AddQuestion from './AddQuestions';
import {Navbar,Nav} from 'react-bootstrap';
import logo from './logo.png';
import {
  BrowserRouter as Router,Link, Route, Switch
} from "react-router-dom";
import AddQuestions from './AddQuestions';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import SignUp from './SignUp';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
import Container from 'react-bootstrap/Container';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

class App extends React.Component {
  constructor(props){
    super(props);
    /*
    this.firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTHDOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_ID,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_ID,
    };*/
    this.firebaseConfig = {
      apiKey: "AIzaSyBRmdazVJJ7jGrxz95A8EtsC_2Bb3a-c5Y",
      authDomain: "auth-55ed7.firebaseapp.com",
      databaseURL: "https://auth-55ed7-default-rtdb.firebaseio.com/",
      projectId: "auth-55ed7",
      storageBucket: "auth-55ed7.appspot.com",
      messagingSenderId: "844347414766",
      appId: "1:844347414766:web:d82a223640c1329a2e3bff",
    };
    this.defaultProject = {};
    this.status = "";
    this.state = {
      userAuthenticated: false,
      firebase: null
  };
    
  }
  componentWillMount() {
    if (!firebase.apps.length) {
      try {
          firebase.initializeApp(this.firebaseConfig)
      } catch (err) {
          console.error('Firebase initialization error raised', err.stack)
      }
    }

    if(firebase.auth().currentUser !== null){
      this.setState({ userAuthenticated: true });
    }

  }

  componentDidMount(){
    if(firebase.auth().currentUser !== null){
      this.setState({ userAuthenticated: true });
    }
    console.log(this.state.userAuthenticated)
  }

  render(){ 
    return(
      <div class="Container">
        <Container fluid="md">
          <Router>
          <Switch>
            <Route exact path="/" render={(props) => <Login {...props} firebase={firebase}/>}/>
            <Route path="/login" render={(props) => <Login {...props} firebase={firebase}/>}/>
            <Route path="/logout" render={(props) => <Login {...props} firebase={firebase} logout={true}/>}/>
            <Route path="/signup" render={(props) => <SignUp {...props} firebase={firebase}/>}/>
            <Route path="/questions/add" render={(props) => <AddQuestions {...props} firebase={firebase}/>}/>
          </Switch>
        </Router>
        <Footer />
        </Container>
        
      </div>

    )
  }
}

export default App;

