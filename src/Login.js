/**
        
**/




import React, { Component } from 'react'


class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {username: undefined, password: undefined}
    }
    
    handleSubmit() {
        const endpoint = this.props.authenticationEndpoint
        const callback = this.props.handleAuthentication
        const credentials = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
        callback(endpoint, credentials)

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
        return (
            <div className="Login">
                <h1>{this.props.title}</h1>
                <input type="text" className="formElem" placeholder="Username" onChange={this.updateUsername}/>
                <input type="password" className="formElem" placeholder="Password" onChange={this.updatePassword}/>
                <button className="formElem" onClick={() => this.handleSubmit()}>Submit</button>
                <a href="#">Sign Up</a> 
            </div>
        )
    }
}



module.exports = Login