/**
        handleAuthentication
            Connects authentication service and responds to the results
            
            1) Connect to our server
            2) Respond to the 3 possible forms of output
                -If success, render main component
                -If failure, print "gave incorrect username and password"
                -If error, print "an error occured with the server. Please try again"
**/



import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
const Login = require('./Login.js')


class App extends Component {  
  
    constructor() {
        super()
    }
    
    handleAuthentication (endpoint, credentials) {
        const init = {method: 'POST', body: credentials}
        fetch(endpoint, init).then((output) => {
            const result = JSON.parse(output).result
            if (result === "success") {
                //render park-tinder component
            }
            else if (result === "failure") {
                //print "gave incorrect username and password"
            }
            else {
                //"an error occured with the server. Please try again"
            }
        }) 
    }
    
    render() {
        return (
            <div className="App">
            <img className="mountains" src="https://julieshannonfuller.com/wp-content/uploads/2014/08/jsf-mountains.png"/>
            <Login title="Hello" onAuthentication={this.handleAuthentication}/>
            </div>
        )
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
