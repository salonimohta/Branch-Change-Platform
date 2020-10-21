import React from 'react';
import Header from './../Components/Header'
import Content from './content'
import Footer from './../Components/Footer'

export default class Layout extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <Header />
                <br/>
                <Content />
                <br/>
                <Footer />
            </div>
        )
    }
}