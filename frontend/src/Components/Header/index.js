import React from 'react';
import './index.css';
import {API} from '../../config'
import Session from 'react-session-api'
import axios from "axios"
import Logout from './../Logout'

const logoutSession=()=>{
	axios({
		method: 'post',
		url: `${API}/users/logout`,
		headers: {
		  Accepts:'application/json',
		  "Content-Type":"application/json"
		 },
		data: {
		   username: this.state.username
		  }
	  })
	  .then(response=>{
		  if (response.status===200){
			  Session.clear();
			  localStorage.clear();
			  this.props.history.push('/');
			  this.props.history[0]=this.props.history[this.props.history.length-1];
			  this.props.history.length=1;
		  }
		  else alert('We could not log you out due to some internal error!');
	  })

}

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
					{/*<a href="#" data-html="true" data-container="body" data-trigger="click" data-toggle="popover" data-placement="bottom" data-content="<a href='/'><i class='fas fa-sign-out-alt fa-fw fa-2x' aria-hidden='true'></i> Logout</a>" data-original-title="" title=""><i class="fa fa-user-circle fa-3x" /></a>
					*/}
					<Logout />
					</div>
			</div>
			</div>
        )
    }
}