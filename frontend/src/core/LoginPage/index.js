import React from 'react'
import './index.css'
import Login from '../../Components/Login'

/* Login Page along with basic css returns only one type of component called Login for both types of users */

export default class LoginPage extends React.Component{
   constructor(){
     super();
     this.state={
       activeTab: "student"
     };
     this.handleSelect=this.handleSelect.bind(this);
   }
   //This method is used to update the state of the tab as selected by the user, can be student or admin only
   handleSelect(type){
     this.setState({activeTab:type});
   }
   /* ComponentDidMount() is used so that all the localStorage and sessionStorage is cleared and 
   history props only contains the path of loginPage, this.props.history.length=1 is done, so that when the user 
   logs out of the platform and is redirected here, the user cannot get back to the last page it visited before being redirected */
   componentDidMount(){
    this.props.history[0]=this.props.history[this.props.history.length-1];
    this.props.history.length=1;
     localStorage.clear();
     sessionStorage.clear();
   }
    render(){
        return(
            <div className="loginPage">
              <div>
                <br/>
                <div className="loginBox">
                  <div className="loginImage">
                    <div className="loginHeader">Branch Change IIT(ISM)</div>
                    <br/>
                    <img src={require("../../logo.png")} alt="ISM_logo" />
                    </div>
                    {/*<div className="vl" />*/}
                  <div className="loginForm">
                <div class="card-body">
                    <ul class="nav nav-pills" id="myTab3" role="tablist">
                      <li class="nav-item">
                        {this.state.activeTab==="student"?
                        <a class="nav-link active" data-toggle="tab" href="#home3" role="tab" aria-controls="home" aria-selected="true" onClick={()=>this.handleSelect("student")}>Student</a>
                        :
                        <a class="nav-link" data-toggle="tab" href="#home3" role="tab" aria-controls="home" aria-selected="true" onClick={()=>this.handleSelect("student")}>Student</a>
                        }
                        </li>
                      <li class="nav-item">
                        {this.state.activeTab==="admin"?
                        <a class="nav-link active" data-toggle="tab" href="#profile3" role="tab" aria-controls="profile" aria-selected="false" onClick={()=>this.handleSelect("admin")}>Admin</a>
                        :
                        <a class="nav-link" data-toggle="tab" href="#profile3" role="tab" aria-controls="profile" aria-selected="false" onClick={()=>this.handleSelect("admin")}>Admin</a>
                      }
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent2">
                        {this.state.activeTab==="student" ? <Login username="Admission No." type="Student" /> : <Login username="User Id" type="Admin" />}
                    </div>
                  </div>
                  </div>
                    </div>
                    <br/>
                    </div>
                    </div>
        )
    }
}
