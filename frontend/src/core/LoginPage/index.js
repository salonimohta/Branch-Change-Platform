import React from 'react'
import './index.css'
import Login from '../../Components/Login'

export default class LoginPage extends React.Component{
   constructor(){
     super();
     this.state={
       activeTab: "student"
     };
     this.handleSelect=this.handleSelect.bind(this);
   }
   handleSelect(type){
     this.setState({activeTab:type});
   }
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
