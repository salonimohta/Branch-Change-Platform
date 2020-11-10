import React from 'react';
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

/* This Layout component specifies the layout of every page within the branch change platform, typical layout includes
    1. Header
    2. Page component (obtained from props)
    3. Footer
*/

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