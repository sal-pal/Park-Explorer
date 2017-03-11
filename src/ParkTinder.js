import React, { Component } from 'react'


class ParkTinder extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    bttnOnClickHandler () {
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
        const resrveLinkStyle = {
            display: 'block',
            position: 'relative',
            top: '78px',
            fontSize: '14px',
            color: 'black'
        }
        
        return (
            <div className="ParkTinder">
                <h1>Title</h1>
                <img style={imgStyle} src="https://www.nps.gov/common/uploads/structured_data/3C7CCAA8-1DD8-B71B-0BE7C1B0BC469D34.jpg"/>
                <p style={descriptionStyle}>Visit Yellowstone and experience the worlds first national park. Marvel at a volcano’s hidden power rising up in colorful hot springs, mudpots, and geysers. Explore mountains, forests, and lakes to watch wildlife and witness the drama of the natural world unfold. Discover the history that led to the conservation of our national treasures “for the benefit and enjoyment of the people.</p>
                <a href="#" style={backwardBttnStyle} onClick={() => this.bttnOnClickHandler()}>Backward</a>
                <a href="#" style={forwardBttnStyle} onClick={() => this.bttnOnClickHandler()}>Forward</a>
                <a href="#" style={parkLinkStyle}>Park Website</a>
                <a href="#" style={resrveLinkStyle}>Book a Reservation</a>
            </div>
        )
    }
}

module.exports = ParkTinder