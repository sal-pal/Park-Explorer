import React, { Component } from 'react'


class ParkTinder extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
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
        const parkLinkStyle = {
            position: 'relative',
            top: '35px'
        }
        const resrveLinkStyle = {
            display: 'block',
            position: 'relative',
            top: '38px'            
        }
        
        return (
            <div className="ParkTinder">
                <h1>Title</h1>
                <img style={imgStyle} src="https://www.nps.gov/common/uploads/structured_data/3C7CCAA8-1DD8-B71B-0BE7C1B0BC469D34.jpg"/>
                <p style={descriptionStyle}>Visit Yellowstone and experience the worlds first national park. Marvel at a volcano’s hidden power rising up in colorful hot springs, mudpots, and geysers. Explore mountains, forests, and lakes to watch wildlife and witness the drama of the natural world unfold. Discover the history that led to the conservation of our national treasures “for the benefit and enjoyment of the people.</p>
                <a href="#" style={parkLinkStyle}>Park Website</a>
                <a href="#" style={resrveLinkStyle}>Book a Reservation</a>
            </div>
        )
    }
}

module.exports = ParkTinder