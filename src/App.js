import React, { Component } from 'react'
import ReactDOM from 'react-dom'
const Login = require('./Login.js')


class App extends Component {  
  
    constructor() {
        super()
        this.state = {responseMsg: undefined}
    }
    
    handleAuthentication (endpoint, credentials) {
        const init = {method: 'POST', body: credentials}
       
        fetch(endpoint, init).then((output) => {
            const result = JSON.parse(output).result
            if (result === "success") {
                //render park-tinder component
            }
            else if (result === "failure") {
                this.setState({responseMsg: "Gave incorrect username and/or password"})
            }
            else {
                this.setState({responseMsg: "An error occured with the server. Please try again"})
            }
        }) 
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
                <Login title="Park Tinder Login" authenticationEndpoint="#" onAuthentication={this.handleAuthentication}/>
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
