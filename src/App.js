import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'    
const Login = require('./Login.js')
const Signup = require('./Signup.js')


class App extends Component {  
  
    constructor() {
        super()
        this.state = {responseMsg: undefined}
    }
    
    makeSignupRequest (endpoint) {
        //const init = {method: 'POST', body: credentials}
        //return fetch(endpoint)
    }
    
    handleSignupResponse (result) {
        console.log(result)
    }
    
    render() {
        const style = {
            textAlign: 'center',
            position: 'relative',
            top: '100%'
        }
        
        return (
            <div className="App" style={style}>
                <img className="mountains" src="https://julieshannonfuller.com/wp-content/uploads/2014/08/jsf-mountains.png"/>
                <Signup title="Signup" makeSignupRequest={} handleSignupResponse={}/>    
                <p>{this.state.responseMsg}</p>
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


//<Login title="Park Tinder Login" authenticationEndpoint="#" onAuthentication={() => this.handleAuthentication()}/>         fetch("https://dry-river-67944.herokuapp.com/1252548")