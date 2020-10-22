import React from 'react';
import './index.css';
import {Popover, OverlayTrigger} from 'react-bootstrap';


const Overlay = () => {
	const popover = (
	  <Popover id="1">
		<Popover.Title as="h3">Title One</Popover.Title>
		<Popover.Content>Test Content</Popover.Content>
	  </Popover>
	);
	return popover;
  };

export default class Header extends React.Component{
	constructor(){
		super();
		this.state={
			displayLogout: false
		};
	}
	handleClick=()=>{
		this.setState({displayLogout: !this.state.displayLogout});
	}
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
					<a href="#" data-toggle="popover-hover" data-img="https://mdbootstrap.com/img/logo/mdb192x192.jpg"><i class="fa fa-user-circle fa-4x"></i></a>
					</div>
			</div>
			</div>
        )
    }
}