/**
    Login component permits the developer to choose the implementation 
    of how: 
        1) to make a request to a login service.
        2) to handle a respsonse from the login request. 
        3) to handle errors that occured during the login request


    Props:
        title (string)

        makeLoginRequest (function)
            -Username and password are available to developer as a JSON
             string via this.state.credentials
            -The function making the http request MUST return a promise,
             and this promise must always be returned.
                Example:
                    function makeRequest () {
                        return fetch(endpoint)
                    }
                    .......
                    .......     
                    <Login makeSignupRequest={() => makeRequest()}}/>

        handleLoginResponse (function) 

        handleLoginRequestError (function)
**/




import React, { Component } from 'react'


class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {username: undefined, password: undefined, credentials: undefined}
    }
    
    handleSubmit() {

        const makeLoginRequest = this.props.makeLoginRequest
        const handleLoginResponse = this.props.handleLoginResponse
        const handleLoginRequestError = this.props.handleLoginRequestError        
        
        const credentials = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
        
        this.setState({credentials: credentials}, () => {
            makeLoginRequest().then(handleLoginResponse, handleLoginRequestError)    
        })

    }
    
    updateUsername(event) {
        const value = event.target.value
        this.setState({username: value})
    }
    
    updatePassword(event) {
        const value = event.target.value
        this.setState({password: value})
    }
    
    render() {  
        
        const usernameStyle = {
            display: "block",
            maxWidth: "300px",
            margin: "0px auto"
        }
        const passwordStyle = {
            display: "block",
            maxWidth: "300px",
            margin: "0px auto",
            position: "relative",
            top: "8px"
        }
        const titleStyle = {
            fontSize: "30px",
            position: "relative",
            top: "5%"
        }
        const buttonStyle = {
            display: "block",
            maxWidth: "300px",
            margin: "0px auto",
            position: "relative",
            top: "15px"
        }
        const linkStyle = {
            fontSize: "12px",
            position: "relative",
            top: "17px"   
        }
        
        return (
            <div className="Login">
                <h1 style={titleStyle}>{this.props.title}</h1>
                <input type="text" style={usernameStyle} placeholder="Username" onChange={event => this.updateUsername(event)}/>
                <input type="password" style={passwordStyle} placeholder="Password" onChange={event => this.updatePassword(event)}/>
                <button style={buttonStyle} onClick={() => this.handleSubmit()}>Submit</button>
                <a href="#" style={linkStyle}>Sign Up</a>
            </div>
        )
    }
}


module.exports = Login