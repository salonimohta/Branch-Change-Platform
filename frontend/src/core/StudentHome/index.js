import React from 'react'
import './index.css'
import axios from "axios"
import {API} from '../../config'
import Session from 'react-session-api'
import {viewRequestGeneratePDF} from './../../Components/viewRequestPDFGenerator'


export default class StudentHome extends React.Component{
    constructor(){
        super();
        this.state={
            branchChangeRequestSubmitted: false,
            branchChangeApplication: []
        }
        this.requestBranchChange=this.requestBranchChange.bind(this);
    }
    requestBranchChange=()=>{
        this.props.history.push('/branchChangeRequest');
    }
    /* Whenever the Student Home page is mounted, a get request is sent to the server to 
    update the status about the branch change request submission of the student */
    componentDidMount(){
        //Session token is set from localStorage because on refresh the Session gets cleared
        Session.set('token',localStorage.getItem('token'));
        axios({
            method: 'get',
            url: `${API}/users/view-branch-application`,
            headers: {
              Accepts:'application/json',
              "Content-Type":"application/json",
              Authorization: 'Bearer '+Session.get('token')
             }
          })
          .then(response=>{
              if (response.status===200){
              if (response.data.completeBranchChangeApplications.length>0){
                  this.setState({branchChangeRequestSubmitted: true,branchChangeApplication: response.data.completeBranchChangeApplications});
                }
                else{
                    this.setState({branchChangeRequestSubmitted: false,branchChangeApplication: []});
                }
            }
          }) 
          .catch(error => alert('The status of branch Change Request could not be fetched due to some error'))
    }
    render(){
        /* details of the student are stored in constant variables to be used in the page */
        const imagePath=localStorage.getItem('imagePath');
        const name=localStorage.getItem('studentName');
        const admissionNo=localStorage.getItem('admissionNo');
        const course=localStorage.getItem('course');
        const branch=localStorage.getItem('branch');
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
                <div className="details">
                {name}<br/>{admissionNo}<br/>{course}<br/>{branch}
                </div>
                </div>
            </div><br/><br></br>
            {/* If the branch change request is submitted then, the student can only view the request as a pdf, and the request to fill the form will be disabled */}
            {this.state.branchChangeRequestSubmitted ? 
            <div className="buttonSpace">
            <div>
            <button type="submit" class="btn btn-lg btn-primary" onClick={()=>viewRequestGeneratePDF(this.state.branchChangeApplication)}>
                View Request
            </button>
            </div><br/>
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
            </div><br/>
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