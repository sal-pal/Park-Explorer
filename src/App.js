import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'

class App extends Component {  
  render() {
    return (
      <div className="App">
        
        <h1> 
           Welcome to Park Forum! <br/>
           Please Log In
        </h1>
        
        <input type="text" className="formElem" placeholder="Username"/>
        <input type="text" className="formElem" placeholder="Password"/>
        <button className="formElem">Sumbit</button>
        <a href="#">Sign Up</a>
      </div>
    );
  }
}



function run() {
    ReactDOM.render(<App/>, document.getElementById('root'));
}

if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', run);
} 
else {
    window.attachEvent('onload', run);
}
