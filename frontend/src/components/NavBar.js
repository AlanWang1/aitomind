import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        const style ={
            margin:"0% 0% 2ch 0%"
        }
        return (
            <nav className="navbar" style={style} >
                <nav className="navbar-brand">
                  <p className="is-size-3 has-text-weight-semibold"> Name</p> 
                </nav>
            </nav>
        )
    }
}
