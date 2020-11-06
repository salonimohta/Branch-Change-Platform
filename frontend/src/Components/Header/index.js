import React from 'react';
import './index.css';
import Logout from './../Logout'


export default class Header extends React.Component{
	render(){
        return (
			<div>
			<div className="flex-container1">
				<div className="flex-container2">
					<div className="image">
					
						<img
						className="LogoImg"
						src={require("../../logo.png")}
						alt="ISM_logo"
						/>
					</div>
					<div className="heading">
					Branch Change Platform
					</div>
					</div>
					<br/>
					<div class="accIcon">
					<Logout />
					</div>
			</div>
			</div>
        )
    }
}