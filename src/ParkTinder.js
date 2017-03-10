import React, { Component } from 'react'


class ParkTinder extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        return (
            <div className="ParkTinder">
                <h1>Title</h1>
                <img src="https://julieshannonfuller.com/wp-content/uploads/2014/08/jsf-mountains.png"/>
                <p>Visit Yellowstone and experience the worlds first national park. Marvel at a volcano’s hidden power rising up in colorful hot springs, mudpots, and geysers. Explore mountains, forests, and lakes to watch wildlife and witness the drama of the natural world unfold. Discover the history that led to the conservation of our national treasures “for the benefit and enjoyment of the people.</p>
                <a href="#">Park Website</a>
                <a href="#">Book a Reservation</a>
            </div>
        )
    }
}

module.exports = ParkTinder