import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StartScreen from './StartScreen';
import {
  BrowserRouter as Router,Link, Route, Switch
} from "react-router-dom";




class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){ 
    return(
      <div class="Container">
          <Router>
            <Route exact path="/" component={StartScreen} />
          </Router>
    </div>
    );
  }
}

export default App;

