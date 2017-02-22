/**
        Implement the 2 prop design in here
**/


import React, { Component } from 'react'



class Signup extends Component {
    
    constructor(props) {
        super(props)
        this.state = {username: undefined, password: undefined, reEnteredPassword: undefined, credentials: undefined}
    }
    
    handleSubmit() {
        
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
        return (
            <div className="Signup">
                <h1>{this.props.title}</h1>
                <input type="text" className="formElem" placeholder="Username" onChange={event => this.updateUsername(event)}/>
                <input type="password" className="formElem" placeholder="Password" onChange={event => this.updatePassword(event)}/>
                <input type="password" className="formElem" placeholder="Re-enter Password" onChange={event => this.updateReEnteredPassword(event)}/>
                <button className="formElem" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
        )
    }
}


module.exports = Signup