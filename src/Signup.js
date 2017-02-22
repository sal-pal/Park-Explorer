/**         
            Signup component permits the developer to choose the implementation 
            of how: 
                1) to make a request to a signup service.
                2) to handle a respsonse from the signup request. 
                3) to handle errors that occured during the signup request
                
        
            Props:
                title (string)
                
                makeSignupRequest (function)
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
                            <Signup makeSignupRequest={() => makeRequest()}}/>
                        
                handleSignupResponse (function) 
                
                handleSignupRequestError (function)
**/


import React, { Component } from 'react'



class Signup extends Component {
    
    constructor(props) {
        super(props)
        this.state = {username: undefined, password: undefined, reEnteredPassword: undefined, credentials: undefined}
    }
    
    handleSubmit() {
        const password = this.state.password
        const reEnteredPassword = reEnteredPassword

        if (password !== reEnteredPassword) {
            return alert("Passwords do not match")
        }
        
        const makeSignupRequest = this.props.makeSignupRequest
        const handleSignupResponse = this.props.handleSignupResponse
        const handleSignupRequestError = this.props.handleSignupRequestError
        
        const credentials = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
        
        this.setState({credentials: credentials}, () => {
            makeSignupRequest().then(handleSignupResponse, handleSignupRequestError)    
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
    
    updateReEnteredPassword (event) {
        const value = event.target.value
        this.setState({reEnteredPassword: value})
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
        const reEnteredPasswordStyle = {
            display: "block",
            maxWidth: "300px",
            margin: "0px auto",
            position: "relative",
            top: "15px"
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
            top: "25px"
        }
        
        return (
            <div className="Signup">
                <h1 style={titleStyle}>{this.props.title}</h1>
                <input type="text" style={usernameStyle} placeholder="Username" onChange={event => this.updateUsername(event)}/>
                <input type="password" style={passwordStyle} placeholder="Password" onChange={event => this.updatePassword(event)}/>
                <input type="password" style={reEnteredPasswordStyle} placeholder="Re-enter Password" onChange={event => this.updateReEnteredPassword(event)}/>
                <button style={buttonStyle} onClick={() => this.handleSubmit()}>Submit</button>
            </div>
        )
    }
}


module.exports = Signup