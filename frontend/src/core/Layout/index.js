import React from 'react';
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

export default class Layout extends React.Component{
    constructor(){
        super();
    }
    render(){
            const {children} = this.props;
        return(
			<div className="parent">
                <div>
                <Header/> 
                </div>
                <br/>
                <div>

			 {
                 children
             }
             <br/>
                </div>
             <Footer />
            </div>
        )
    }
}