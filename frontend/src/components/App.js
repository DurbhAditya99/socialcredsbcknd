import React, { Component,useEffect } from 'react'
import {render} from 'react-dom'
import Navbar from './header'
import NavbarL from './headerloggedin';
import HomePage from './HomePage';
import Footer from './footer'


export default class App extends Component{
    constructor(props){
        super(props);
        
    }



    render(){

        return(
            <div>
            {localStorage.getItem('token') ?  <NavbarL /> : <Navbar /> }
            <div style={{marginBottom: 500}}> 
            <HomePage />
            </div>
            <Footer />
            
            </div>
           
        )
    }
}

const appDiv = document.getElementById("app")
render(<App />,appDiv);