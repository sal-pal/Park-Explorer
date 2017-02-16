import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'



class Login extends Component {
    
    constructor(props) {
        super(props)
    }
    
    handleSubmit() {
        
        const endpoint = this.props.endpoint
        const callback = this.props.onArrivalOfAuthenticationResults
                
        //Pass it to fetch
        fetch(endpoint).then(callback)
        
        //When results recieved, invoke the callback
        
    }
    
    render() {
        return (
            <div className="Login">
                <h1>{this.props.title}</h1>
                <input type="text" className="formElem" placeholder="Username"/>
                <input type="text" className="formElem" placeholder="Password"/>
                <button className="formElem" onClick={() => this.handleSubmit()}>Submit</button>
                <a href="#">Sign Up</a> 
            </div>
        )
    }
}



class App extends Component {  
  render() {
    return (
      <div className="App">
        <img className="mountains" src="https://julieshannonfuller.com/wp-content/uploads/2014/08/jsf-mountains.png"/>
        <Login title="Hello"/>
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
