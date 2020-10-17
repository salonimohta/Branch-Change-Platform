import React from 'react'
import './index.css'
/*import {Tab,Nav,Row,Col} from 'react-bootstrap'*/
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default class AdminHome extends React.Component{
    constructor(){
        super();
        this.state={
            TabSelected: false,
            resultDatePassed: false
        };
    }
    changeState=()=>{
        this.setState({TabSelected:true});
    };
    render(){
        return(
            <div>
                <Tab.Container id="left-tabs-example">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first" className="navTab" onSelect={this.changeState}>Check Status</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second" className="navTab" onSelect={this.changeState}>View Statistics</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third" className="navTab" onSelect={this.changeState}>Download Result</Nav.Link>
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
                        <Tab.Pane eventKey="first">
                            <h2>Status of Branch Change Requests:</h2>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            {this.state.resultDatePassed
                            ? <h2>Dashboard for Branch Change Result 20xx-xx</h2> : "The result statistics is not available!"}
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            {this.state.resultDatePassed
                            ? 
                            <div>
                                <h2>Result for year 20xx-xx</h2>
                                <button type="submit" className="btn btn-primary">Download</button>
                            </div> 
                            : "The result has not been declared yet!"}
                        </Tab.Pane>
                        </div>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        )
    }
}
