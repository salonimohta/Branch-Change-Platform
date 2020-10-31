import React from 'react'
import './index.css'
import {Tab,Nav,Row,Col} from 'react-bootstrap'
import CheckStatus from './../../Components/CheckStatus'
import BranchChangeResult from './../../Components/BranchChangeResult'
import Dashboard from '../../Components/Dashboard'
import ChangeDatesAdmin from '../../Components/ChangeDatesAdmin'

export default class AdminHome extends React.Component{
    constructor(){
        super();
        this.state={
            TabSelected: false,
            resultDatePassed: true,
            currentTab: "zero"
        };
        this.changeState=this.changeState.bind(this);
    }
    changeState=(key)=>{
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
                        <Nav.Link eventKey="dateChange" className="navTab" onSelect={()=>this.changeState("dateChange")}>Change Date</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="first" className="navTab" onSelect={()=>this.changeState("first")}>Check Status</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second" className="navTab" onSelect={()=>this.changeState("second")}>View Statistics</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third" className="navTab" onSelect={()=>this.changeState("third")}>Download Result</Nav.Link>
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
                        {this.state.currentTab==="first"?    
                            <div>
                            <CheckStatus />
                            </div>
                            : null }
                        
                        {this.state.currentTab==="second"?
                            this.state.resultDatePassed
                            ?
                            <div> 
                            <h2>Dashboard for Branch Change Result 20xx-xx</h2>
                            <Dashboard />
                            </div> 
                            : "The result statistics is not available!"
                            : null }
                        {this.state.currentTab==="third"?
                            this.state.resultDatePassed
                            ? 
                            <div>
                                <h2>Result for year 20xx-xx</h2>
                                <BranchChangeResult />
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
