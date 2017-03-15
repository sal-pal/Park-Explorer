import React, { Component } from 'react'


class ParkTinder extends Component {
    
    constructor(props) {
        super(props)
        this.state = {curntParkIndex: 0, fullName: undefined, description: undefined, profileImage: undefined, websiteURL: undefined}
    }
    
    onBttnClick () {
        const retrieveData = this.props.retrieveData
        const handleData = this.props.handleData
        if ((typeof retrieveData === 'function') && (typeof handleData === 'function')) {
            const curntParkIndex = this.state.curntParkIndex
            return retrieveData(curntParkIndex).then(handleData)
        }
        else if (typeof retrieveData !== 'function') {
            throw new TypeError('Need a function to be passed for retrieveData prop')
        }
        throw new TypeError('Need a function to be passed for handleData prop')
    }
    
    onFrwrdBttnClick () {
        const curntParkIndex = this.state.curntParkIndex
        switch (curntParkIndex) {
            case 58:
                this.setState({curntParkIndex: 0}, () => this.onBttnClick())
            
            default:
                const nextState = {curntParkIndex: this.state.curntParkIndex + 1}
                this.setState(nextState, () => this.onBttnClick())
                
        }
    }
    
    onBckwrdBttnClick () {
        const curntParkIndex = this.state.curntParkIndex
        switch (curntParkIndex) {
            case 0:
                this.setState({curntParkIndex: 58}, () => this.onBttnClick())
            
            default:
                const nextState = {curntParkIndex: this.state.curntParkIndex - 1}
                this.setState(nextState, () => this.onBttnClick())
                
        }
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
        const backwardBttnStyle = {
            position: 'relative',
            top: '55px',
            right: '5%',
            display: 'inline',
            border: 'solid',
            borderRadius: '10%',
            padding: '2.5px',
            textDecoration: 'none',
            color: 'black'
        }
        const forwardBttnStyle = {
            position: 'relative',
            top: '55px',
            left: '5%',
            display: 'inline',
            border: 'solid',
            borderRadius: '10%',
            padding: '2.5px',
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
            <div className="ParkTinder">
                <h1>{this.state.fullName}</h1>
                <img style={imgStyle} src={this.state.profileImage}/>
                <p style={descriptionStyle}> {this.state.description} </p>
                <a href="#" style={backwardBttnStyle} onClick={this.onBckwrdBttnClick.bind(this)}> Backward </a>
                <a href="#" style={forwardBttnStyle} onClick={this.onFrwrdBttnClick.bind(this)}> Forward </a>
                <a href={this.state.websiteURL} style={parkLinkStyle}>Park Website</a>
            </div>
        )
    }
}

module.exports = ParkTinder