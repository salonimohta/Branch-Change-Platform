import React, { Component } from "react";
import './index.css';
import {courseValueToIdMapping,courseValueToNameMapping,getKeyByValue} from '../../requiredData';
import axios from "axios"
import {API} from '../../config'
import Session from 'react-session-api'

/* The PopUp component comes up when the admin presses detail button along a student's application,
  the details of the student, that is admission no, current branch, dept, course and gpa and session is 
  displayed, along with the preferences the student has opted for in his/her application
  in the form of checkboxes out of which only one can be selected by the Admin, to approve the request.
  Two buttons Approve and Decline are present in the popup, approve approves the request and makes the changes in 
  database by calling the respective API, whereas Decline is non functional as of now
*/

export default class PopUp extends Component {
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
    this.onlyOne=this.onlyOne.bind(this);
    this.approveRequest=this.approveRequest.bind(this);
  }
  //handleClick method calls the function toggle present in parent class (CheckStatus)
  handleClick = () => {
    this.props.toggle();
  };
  //onlyOne allows only option to be selected from all the options the student has specified
  onlyOne=(id)=>{
    var checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {  
      if (Number(item.id) !== id) item.checked = false;
    })
  };
  /* approveRequest is called when the admin clicks on the Approve button, it sends a post request to the server 
  about the request being approved */
  approveRequest=()=>{
    var checkboxes = document.getElementsByName('check');
    var checkboxOffered=null;
    checkboxes.forEach((item) => {  
      if (item.checked) checkboxOffered=item;
    })
    axios({
      method: 'post',
      url: `${API}/users/set-offered`,
      headers: {
        Accepts:'application/json',
        "Content-Type":"application/json",
        Authorization: 'Bearer ' +Session.get('token')
       },
      data: {
        id: checkboxOffered.id
        }
    })
    .then(response=>{
      if (response.status===200){
        alert('The branch change request has been approved! Please refresh the page to load the changes');
      }
      else alert('There has been an error while processing your request! Try logging in again');
    })
    .catch(error=>alert(error));
  };

render() {
  //console.log(this.props.applicationInfo);
  const applications=this.props.applicationInfo.applications;
  const currCourseId=this.props.applicationInfo.currentDetails.current_course_id;
  const currBranch=this.props.applicationInfo.currentDetails.branchDetails.name;
  const currCourse=courseValueToNameMapping[getKeyByValue(courseValueToIdMapping,currCourseId)];
  const currDept=this.props.applicationInfo.currentDetails.departmentDetails.name;
  return (
   <div className="modal">
     {/*<div className="modal_content">*/}
     <div class="card">
        <div class="card-header">
          <h4>Student Details :</h4>
          <a href="#" className="close closePopUp" onClick={this.handleClick}>&times;</a>
        </div>
        <div class="card-body">
          <span className="popupLabel">Admission No:</span>   {this.props.admNo} <br/>
          <span className="popupLabel">Current Course: </span> {currCourse} <br/>
          <span className="popupLabel">Current Branch:</span> {currBranch}  <br/>
          <span className="popupLabel">Current Department:</span> {currDept}  <br/>
          <span className="popupLabel">CGPA: </span>  <br/>
          <span className="popupLabel">Academic Status:</span> {this.props.applicationInfo.currentDetails.acad_status} <br/>
          <span className="popupLabel">Session:</span> {this.props.applicationInfo.currentDetails.session} <br/><br/>
          <span className="popupLabel">Preferences:</span> <br/><br/>
          {applications.map((application,index)=>{
            return(
              <div>
            <input type="checkbox" name="check" onClick={()=>this.onlyOne(application.id)} id={application.id} />&nbsp;
          <label for={application.id}>{index+1}: {courseValueToNameMapping[getKeyByValue(courseValueToIdMapping,application.course_id)]} in {application.branchDetails.name}</label><span style={{whiteSpace:"pre-wrap"}}> (Department: {application.departmentDetails.name})</span><br/>
            </div>
            )
          })}
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-success" onClick={this.approveRequest}>Approve</button>&nbsp;&nbsp;
          <button class="btn btn-danger">Decline</button>
        </div>
      </div>
    </div>
  );
 }
}