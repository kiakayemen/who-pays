import React from "react";
import { Component } from "react";
import { MyContext } from "./context";
import Stage2 from "./components/stage_2";
import Stage1 from "./components/stage_1";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {

  static contextType = MyContext;

  render(){
    return (
      <div className="wrapper">
        <div className="center-wrapper">
          <h1>KI KOON MIDE?</h1>
          {this.context.state.stage === 1 ?
            <Stage1 />
            :
            <Stage2/>
          }
        </div>
          <footer>
            <h4>Made By Kia</h4>
          </footer>
      </div>
    );
  }
}

export default App;
