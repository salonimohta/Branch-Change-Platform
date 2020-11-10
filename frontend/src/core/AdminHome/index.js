import React from 'react'
import './index.css'
import {Tab,Nav,Row,Col} from 'react-bootstrap'
import CheckStatus from './../../Components/CheckStatus'
import BranchChangeResult from './../../Components/BranchChangeResult'
import Dashboard from '../../Components/Dashboard'
import ChangeDatesAdmin from '../../Components/ChangeDatesAdmin'
import axios from "axios"
import {API} from '../../config'
import Session from 'react-session-api'

/* The AdminHome component is divided into Tabs:
    1. Change Dates (where Admin can give dates for when the Application will start and end)
    2. Check Status (where Admin will check status of all the branch change requests received till now)
    3. View Statistics (where Admin will be able to view a dashboard of the branch change results of this year)
    4. Download Result (where Admin can see the result and also download it in excel format)
*/

export default class AdminHome extends React.Component{
    constructor(){
        super();
        this.state={
            TabSelected: false,
            resultDatePassed: true,
            currentTab: "zero",
            branchChangeApplications: [],
            results: []
        };
        this.changeTab=this.changeTab.bind(this);
        this.getStudentApplications=this.getStudentApplications.bind(this);
    }
    componentDidMount(){
        if (!localStorage.getItem('token')){
            alert('It seems like you are not logged in, Please log in first');
            this.props.history.push('/');
        }
    }
    //this method returns only those applications which have a student associated with it
    getStudentApplications=(application)=>{
        return application.currentDetails;
    }
    /*this method is used when admin changes tab, each tab change demands some information from server
    which is sent as a get request to the server based on the tab name */
    changeTab=(key)=>{
        Session.set('token',localStorage.getItem('token'));
        if (key==="allApplications"){
            axios({
                method: 'get',
                url: `${API}/users/view-all-branch-applications`,
                headers: {
                Accepts:'application/json',
                "Content-Type":"application/json",
                Authorization: 'Bearer ' +Session.get('token')
                }
            })
            .then(response=>{
                let applications=response.data.branchChangeApplications.filter(this.getStudentApplications);
                this.setState({branchChangeApplications:applications});
                //console.log(applications);
            })
            .catch(error => alert(error));
        }
        else if (key==="results"){
            axios({
                method: 'get',
                url: `${API}/users/get-results`,
                headers: {
                  Accepts:'application/json',
                  "Content-Type":"application/json",
                  Authorization: 'Bearer ' +Session.get('token')
                 }
              })
              .then(response=>{
                  if (response.status===200){
                    console.log(response);
                    this.setState({results:response.data.results});
                  }
                  else alert('Something went wrong!');
              })
              .catch(error=>alert(error));
        }
        this.setState({TabSelected:true,currentTab:key});
    };
    render(){
        return(
            <div>
                <Tab.Container id="left-tabs-example" activeKey={this.state.currentTab}>
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="dateChange" className="navTab" onSelect={()=>this.changeTab("dateChange")}>Change Date</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="allApplications" className="navTab" onSelect={()=>this.changeTab("allApplications")}>Check Status</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="dashboard" className="navTab" onSelect={()=>this.changeTab("dashboard")}>View Statistics</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="results" className="navTab" onSelect={()=>this.changeTab("results")}>Download Result</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <div className="tabContents">
                            {this.state.TabSelected 
                                ? null : 
                                <ol>
                                    <li>To check status of branch change requests, click the tab titled <span style={{color:"red"}}>Check Status</span></li>
                                    <li>To view branch change statistics and dashboard, after declaration of result, click on the tab titled <span style={{color:"red"}}>View Statistics</span></li>
                                    <li>To download the branch change result, click on the third tab titled <span style={{color:"red"}}>Download Result</span></li>
                                </ol>
                            }
                        {this.state.currentTab==="dateChange"?    
                            <div>
                            <ChangeDatesAdmin />
                            </div>
                            : null }
                        {this.state.currentTab==="allApplications"?    
                            <div>
                            <CheckStatus branchChangeApplications={this.state.branchChangeApplications} />
                            </div>
                            : null }
                        
                        {this.state.currentTab==="dashboard"?
                            this.state.resultDatePassed
                            ?
                            <div> 
                            <h2>Dashboard for Branch Change Result 20xx-xx</h2>
                            <Dashboard />
                            </div> 
                            : "The result statistics is not available!"
                            : null }
                        {this.state.currentTab==="results"?
                            this.state.resultDatePassed
                            ? 
                            <div>
                                <h2>Result for year 20xx-xx</h2>
                                <BranchChangeResult results={this.state.results} />
                            </div> 
                            : "The result has not been declared yet!"
                            : null }
                        </div>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        )
    }
}
