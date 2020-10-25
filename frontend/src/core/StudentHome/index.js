import React from 'react'
import './index.css'
import {Link} from 'react-router-dom'

export default class StudentHome extends React.Component{
    constructor(){
        super();
        this.requestBranchChange=this.requestBranchChange.bind(this);
    }
    requestBranchChange=()=>{
        this.props.history.push('/branchChangeRequest');
    }
    render(){
        const imagePath=localStorage.getItem('imagePath');
        const name=localStorage.getItem('studentName');
        const admissionNo=localStorage.getItem('admissionNo');
        const course=localStorage.getItem('course');
        const branch=localStorage.getItem('branch');
        const branchChangeRequestSubmitted=localStorage.getItem('branchChangeRequestSubmitted');
        return(
            <div>
            <div className="box1">
                <div style={{marginLeft:"10px"}}>
                    Student Details:
                </div>
                <div className="box2">
                <div>
                <img src={`${imagePath}`} alt="Student Image" />
                </div>
                <div style={{marginRight: "300px"}}>
                {name}<br/>{admissionNo}<br/>{course}<br/>{branch}
                </div>
                </div>
            </div><br/><br></br>
            {branchChangeRequestSubmitted ? 
            <div className="buttonSpace">
            <div>
            <button type="submit" class="btn btn-lg btn-primary">
                View Request
            </button>
            </div>
            <div>
            <button type="submit" class="btn btn-lg btn-primary disabled" disabled>
                Request Branch Change
            </button>
            </div>
            </div>
            :
            <div className="buttonSpace">
                <div>
            <button type="submit" class="btn btn-lg btn-primary disabled" disabled>
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