/**
        1) Finish handleSubmit
            +
        2) Check that the component works
**/




import React, { Component } from 'react'


class Login extends Component {
    
    constructor(props) {
        super(props)
    }
    
    handleSubmit() {
        const endpoint = this.props.endpoint
        const callback = this.props.onArrivalOfAuthenticationResults
                
        //Requesting the server to check if user is a member
        fetch(endpoint).then(callback)        
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