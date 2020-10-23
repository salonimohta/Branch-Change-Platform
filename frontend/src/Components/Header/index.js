import React from 'react';
import './index.css';


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
					<i class="fa fa-user-circle fa-3x" data-container="body" data-trigger="click" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<a href='\'><i class='fas fa-sign-out-alt fa-fw fa-2x' aria-hidden='true'></i> Logout</a>" data-original-title="" title=""></i>
					</div>
			</div>
			</div>
        )
    }
}