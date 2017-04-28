import React, { Component } from 'react'


class ParkExplorer extends Component {
    
    constructor(props) {
        super(props)
        this.onBttnClick()
    }
    
    onBttnClick () {
        const retrieveData = this.props.retrieveData
        const handleData = this.props.handleData
        if ((typeof retrieveData === 'function') && (typeof handleData === 'function')) {
            return retrieveData().then(handleData)
        }
        else if (typeof retrieveData !== 'function') {
            throw new TypeError('Need a function to be passed for retrieveData prop')
        }
        throw new TypeError('Need a function to be passed for handleData prop')
    }
        
    render() {
        const imgStyle = {
            width: "500px",
            height: "500px"
        }
        const descriptionStyle = {
            maxWidth: "700px",
            margin: "0px auto",
            position: 'relative',
            top: '25px',
            fontSize: '20px'
        }
        const bttnStyle = {
            position: 'relative',
            top: '55px',
            maxWidth: "7000px",
            margin: "0px auto",
            width: '100px',
            display: 'block',
            border: 'solid',
            borderRadius: '10%',
            padding: '5px',
            textDecoration: 'none',
            color: 'black'
        }       
        const parkLinkStyle = {
            display: 'block',
            position: 'relative',
            top: '75px',
            fontSize: '14px',
            color: 'black'
        }
        
        return (
            <div className="ParkExplorer">
                <h1>{this.props.fullName}</h1>
                <img style={imgStyle} src={this.props.profileImage}/>
                <p style={descriptionStyle}> {this.props.description} </p>
                <a href="#" style={bttnStyle} onClick={() => this.onBttnClick()}> Next </a>
                <a href={this.props.websiteURL} style={parkLinkStyle}>Park Website</a>
            </div>
        )
    }
}

module.exports = ParkExplorer