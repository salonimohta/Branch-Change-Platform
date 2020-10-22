import React from 'react'
import './index.css'
import {Link} from 'react-router-dom'

export default class StudentHome extends React.Component{
    constructor(){
        super();
        this.state={
            imageURL: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Frollercoasteryears.com%2Ftop-20-ways-successful-students-succeed-school%2F&psig=AOvVaw3m32iouPOU_bKC57hKwQuo&ust=1602932405539000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiqzNf6uOwCFQAAAAAdAAAAABAD',
            name: 'John Doe',
            admno: '19JE00XXXX',
            course: 'BTech',
            dept: 'Computer Science and Engineering',
            requestSubmitted: false
        };
        this.requestBranchChange=this.requestBranchChange.bind(this);
    }
    requestBranchChange=()=>{
        this.props.history.push('/branchChangeRequest');
    }
    render(){
        return(
            <div>
            <div className="box1">
                <div style={{marginLeft:"10px"}}>
                    Student Details:
                </div>
                <div className="box2">
                <div>
                <img src={`${this.state.imageURL}`} alt="Student Image" />
                </div>
                <div style={{marginRight: "300px"}}>
                    {this.state.name}<br/>{this.state.admno}<br/>{this.state.course}<br/>{this.state.dept}
                </div>
                </div>
            </div><br/><br></br>
            {this.state.requestSubmitted ? 
            <div className="buttonSpace">
            <div>
            <button type="submit" class="btn btn-lg btn-primary">
                View Request
            </button>
            </div>
            <div>
            <button type="submit" class="btn btn-lg btn-primary" disabled>
                Request Branch Change
            </button>
            </div>
            </div>
            :
            <div className="buttonSpace">
                <div>
            <button type="submit" class="btn btn-lg btn-primary" disabled>
                View Request
            </button>
            </div>
            <div>
            <button type="submit" class="btn btn-lg btn-primary" onClick={this.requestBranchChange}>
            Request Branch Change
            </button>
            </div>
            </div>
            }
            </div>
        )
    }
}