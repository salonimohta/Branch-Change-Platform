import React from 'react';
import './index.css';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
export default class Header extends React.Component{
    render(){
        return (
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
					<div className="accIcon">
					<AccountCircleOutlinedIcon style={{fontSize: 40}} />
					</div>
			</div>
        )
    }
}