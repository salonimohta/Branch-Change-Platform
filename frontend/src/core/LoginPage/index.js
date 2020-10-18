import React from 'react'
import './index.css'
import Login from '../../Components/Login'
import {Tabs,Tab} from 'react-bootstrap'

export default class LoginPage extends React.Component{
    render(){
        return(
            <div className="loginPage">
                <div className="loginBox">
                <div class="card-body">
                    <ul class="nav nav-pills" id="myTab3" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link" id="home-tab3" data-toggle="tab" href="#home3" role="tab" aria-controls="home" aria-selected="true">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="profile-tab3" data-toggle="tab" href="#profile3" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent2">
                      <div class="tab-pane fade active show" id="home3" role="tabpanel" aria-labelledby="home-tab3">
                        <Login username="Admission No." type="Student" />
                      </div>
                      <div class="tab-pane fade" id="profile3" role="tabpanel" aria-labelledby="profile-tab3">
                        <Login username="Email" type="Admin" />
                      </div>
                    </div>
                  </div>
                    {/*<div>
                        <img src={require("../../logo.png")} alt="ISM_logo" />
                    </div>
                    <div className="loginForm">
                    <Tabs defaultActiveKey="student" id="uncontrolled-tab-example">
                    <Tab eventKey="student" title="Student">
                      <Login username="Admission No." type="Student" />
                    </Tab>
                    <Tab eventKey="admin" title="Admin">
                      <Login username="Email" type="Admin" />
                    </Tab>
                  </Tabs>
                    </div>*/}
        </div>
            </div>
        )
    }
}
