import React from 'react';
import './index.css'
import axios from "axios"
import {API} from '../../config'
import Session from 'react-session-api'
import {NameToIdMapping,getKeyByValue,deptNameValueMapping,deptValuesDropdown,branchNameValueMapping,branchByCourseAndDeptCategory,branchValuesDropdown,deptByCourseCategory} from '../../requiredData';

var optionsFilled=[];

const studentName=localStorage.getItem('studentName');
const admissionNo=localStorage.getItem('admissionNo');
const currCourse=localStorage.getItem('course');
const currBranch=localStorage.getItem('branch');
const currCourseValue=currCourse.toLowerCase().includes("bachelor")?"BTech":currCourse.toLowerCase().includes("master")?"Int_MTech":"DualDegree";
const currBranchValue=getKeyByValue(branchNameValueMapping,currBranch.toLowerCase());
const currDept=localStorage.getItem('dept');
const currDeptValue=getKeyByValue(deptNameValueMapping,currDept.toLowerCase());

var BTechBranchesUsed=[];
var DDBranchesUsed=[];
var IntMTechBranchesUsed=[];

if (currCourseValue==="BTech") BTechBranchesUsed.push(currBranchValue);
else if (currCourseValue==="DualDegree") DDBranchesUsed.push(currBranchValue);
else if (currCourseValue==="Int_MTech") IntMTechBranchesUsed.push(currBranchValue);

class Preference extends React.Component{
    constructor(props){
        super(props);
        this.state={
          preferenceFilled:[...optionsFilled,{courseFilled: false,deptFilled:false}]
        };
        optionsFilled.push({courseFilled:false,deptFilled:false});
        this.changeCourse=this.changeCourse.bind(this);
        this.changeDept=this.changeDept.bind(this);
        this.changeBranch=this.changeBranch.bind(this);
    };
    changeCourse(event) {
      const value=event.target.value;
      let preferences=[...this.state.preferenceFilled];
      preferences[this.props.courseNum].courseFilled=true;
      preferences[this.props.courseNum].course=value;
      preferences[this.props.courseNum].courseId=NameToIdMapping[value];
      optionsFilled=preferences;
      this.setState({preferenceFilled:preferences});
      if (this.state.preferenceFilled[this.props.courseNum].courseFilled===true){
        let courseName=this.state.preferenceFilled[this.props.courseNum].course;
        if (courseName.length===0) document.getElementById(`deptPref${this.props.courseNum}`).innerHTML = "<option></option>";
        else {
            var deptOptions = "<option value='' disabled selected>Select Department</option>";
            for (var categoryId in deptByCourseCategory[courseName]) {
              let currDeptValueElem=deptValuesDropdown[courseName][categoryId];
              deptOptions += "<option value=\""+ currDeptValueElem + "\">" + deptByCourseCategory[courseName][categoryId] + "</option>";
            }
            document.getElementById(`deptPref${this.props.courseNum}`).innerHTML = deptOptions;
        }
    }
    }
    changeDept(event){
      const value=event.target.value;
      let preferences=[...this.state.preferenceFilled]; 
      preferences[this.props.courseNum].deptFilled=true;
      preferences[this.props.courseNum].dept=value;
      if (value==="mnc") preferences[this.props.courseNum].deptId="m&c";
      else preferences[this.props.courseNum].deptId=value;
      optionsFilled=preferences; 
      this.setState({preferenceFilled:preferences}); 
      if (this.state.preferenceFilled[this.props.courseNum].courseFilled&&this.state.preferenceFilled[this.props.courseNum].deptFilled===true){
        let courseName=this.state.preferenceFilled[this.props.courseNum].course;
        let deptName=this.state.preferenceFilled[this.props.courseNum].dept;
        if (courseName.length===0 || deptName.length===0) document.getElementById(`branchPref${this.props.courseNum}`).innerHTML = "<option></option>";
        else {
            var branchOptions = "<option value='' disabled selected>Select Branch</option>";
            for (var categoryId in branchByCourseAndDeptCategory[courseName][deptName]) {
              let currBranchValueElem=branchValuesDropdown[courseName][deptName][categoryId];
              if ((courseName==="BTech" && BTechBranchesUsed.includes(currBranchValueElem) || (courseName==="DualDegree" && DDBranchesUsed.includes(currBranchValueElem)) || (courseName==="Int_MTech" && IntMTechBranchesUsed.includes(currBranchValueElem)))){
                branchOptions += "<option value=\""+ currBranchValueElem + "\" disabled>" + branchByCourseAndDeptCategory[courseName][deptName][categoryId] + "</option>";
              }
              else{
                branchOptions += "<option value=\""+ currBranchValueElem + "\">" + branchByCourseAndDeptCategory[courseName][deptName][categoryId] + "</option>";
              }
            }
            document.getElementById(`branchPref${this.props.courseNum}`).innerHTML = branchOptions;
        }
    } 
    }
    changeBranch(event){
      const value=event.target.value;
      if (this.props.number===this.state.preferenceFilled.length){
        if (this.state.preferenceFilled[this.props.courseNum].course==="BTech") BTechBranchesUsed.push(value);
        else if (this.state.preferenceFilled[this.props.courseNum].course==="DualDegree") DDBranchesUsed.push(value);
        else IntMTechBranchesUsed.push(value);
      }
      else{
        if (this.state.preferenceFilled[this.props.courseNum].course==="BTech") BTechBranchesUsed[this.props.courseNum]=value;
        else if (this.state.preferenceFilled[this.props.courseNum].course==="DualDegree") DDBranchesUsed[this.props.courseNum]=value;
        else IntMTechBranchesUsed[this.props.courseNum]=value;
      }
      let preferences=[...this.state.preferenceFilled];
      preferences[this.props.courseNum].branch=value;
      if (value==="mnc") preferences[this.props.courseNum].branchId="m&c";
      else preferences[this.props.courseNum].branchId=value;
      optionsFilled=preferences;
      this.setState({preferenceFilled:preferences});
      if (this.props.number===this.state.preferenceFilled.length){
        alert(`You have filled ${this.props.number} out of 5 choices!`);
      }
      else{
        alert(`You have modified your Preference number ${this.props.number}`);
      }
    }
    render(){
    return(
        <div>
            <h5>Preference {this.props.number}:</h5>
        <div class="row">
        <div class="form-group col-lg-6">
        <label for="course" class="col-sm-3 col-form-label">Course</label>
            <div class="col-sm-9">
            <select class="form-control" id="course" onChange={this.changeCourse}>
                <option value="" disabled selected>Select Course</option>
            <option value="BTech">Bachelor of Technology</option>
            <option value="DualDegree">Dual Degree</option>
            <option value="Int_MTech">Integrated Master of Technology</option>
            </select>
            </div>
        </div>
        <div class="form-group col-lg-6">
        <label for={`deptPref${this.props.courseNum}`} class="col-sm-3 col-form-label">Department</label>
            <div class="col-sm-9">
            { this.state.preferenceFilled[this.props.courseNum].courseFilled ?
              <select class="form-control" name={`deptPref${this.props.courseNum}`} id={`deptPref${this.props.courseNum}`} onChange={this.changeDept}>
              <option value="" disabled selected>Select Department</option>
            </select>
              :
              <select class="form-control" name={`deptPref${this.props.courseNum}`} id={`deptPref${this.props.courseNum}`} disabled>
                <option value="" disabled selected>Select Department</option>
              </select>
            }
            
            </div>
        </div>
        <div class="form-group col-lg-6">
        <label for={`branchPref${this.props.courseNum}`} class="col-sm-3 col-form-label">Branch</label>
            <div class="col-sm-9">

            { this.state.preferenceFilled[this.props.courseNum].courseFilled&&this.state.preferenceFilled[this.props.courseNum].deptFilled ?
              <select class="form-control" name={`branchPref${this.props.courseNum}`} id={`branchPref${this.props.courseNum}`} onChange={this.changeBranch}>
              <option value="" disabled selected>Select Branch</option>
            </select>
              :
              <select class="form-control" name={`branchPref${this.props.courseNum}`} id={`branchPref${this.props.courseNum}`} disabled>
                <option value="" disabled selected>Select Branch</option>
              </select>
            }
            </div>
        </div>
        </div>
        </div>
    )
    }
}

export default class ChangeRequestForm extends React.Component{
    constructor(){
        super();
        const num=1;
        this.state={
            name: studentName,
            admissionNo: admissionNo,
            currCourse: currCourse,
            currBranch: currBranch,
            currDept: currDept,
            countCourse: 1,
            preferences:[<Preference number={num} courseNum={num-1} />],
        };
        this.submitForm=this.submitForm.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange=(event)=>{
      this.setState({[event.target.id]: event.target.value})
    }
    submitForm=()=>{
      //validate fields before submitting
      if (this.state.admissionNo!==admissionNo){
        alert('Invalid admission No.!');
      } 
      else if(this.state.currBranch!==currBranch){
        alert('Invalid value for current branch!');
      }
      else if(this.state.currCourse!==currCourse){
        alert('Invalid value for current course!');
      } 
      else if(this.state.currDept!==currDept){
        alert('Invalid value for current department!');
      }
      else if(this.state.countCourse!==optionsFilled.length.toString()){
        alert('No of courses opted does not match with number of preferences filled!');
      }
      else{
        let options=[];
        for (var item in optionsFilled){
          options.push({dept_id:optionsFilled[item].deptId,branch_id:optionsFilled[item].branchId,course_id:optionsFilled[item].courseId});
        }
      axios({
        method: 'post',
        url: `${API}/users/submit-application`,
        headers: {
          Accepts:'application/json',
          "Content-Type":"application/json",
          Authorization: 'Bearer ' +Session.get('token')
         },
        data: {
            options: options,
            number_of_options: Number(this.state.countCourse)
          }
        })
        .then(response=>{
          console.log(response);
        })
      }
    }
    removePreference=()=>{
        let preferenceList=[...this.state.preferences];
        if (preferenceList.length===optionsFilled.length){
          let course=optionsFilled[optionsFilled.length-1].course;
          let branch=optionsFilled[optionsFilled.length-1].branch;
          if (branch.length>0){
            if (course==="BTech") BTechBranchesUsed.pop();
            else if (course==="DualDegree") DDBranchesUsed.pop();
            else IntMTechBranchesUsed.pop();
          }
          optionsFilled.pop();
        }
        preferenceList.pop();
        this.setState({preferences:preferenceList});
    }
    addPreference=()=>{
        const num=this.state.preferences.length+1;
        this.setState({preferences: [...this.state.preferences,<Preference number={num} courseNum={num-1} />]});
    };
    render(){
        return(
          <div className="requestForm">
            <div class="card">
                  <div class="card-header">
                    <h4>Branch Change Request Form</h4>
                  </div>
                  <div class="card-body">
                    <div class="form-group row">
                      <label for="name" class="col-sm-3 col-form-label">Name</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" id="name" value={studentName} onChange={this.handleChange} readonly="" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="admissionNo" class="col-sm-3 col-form-label">Admission No</label>
                      <div class="col-sm-9">
                        <input class="form-control" id="admissionNo" value={admissionNo} onChange={this.handleChange} readonly="" />
                      </div>
                    </div>
                    <div class="form-group row">
                    <label for="currCourse" class="col-sm-3 col-form-label">Current Course</label>
                      <div class="col-sm-9">
                      <select class="form-control" id="currCourse" value={currCourseValue} onChange={this.handleChange} disabled>
                        <option value="BTech">Bachelor of Technology</option>
                        <option value="DualDegree">Dual Degree</option>
                        <option value="Int_MTech">Integrated Master of Technology</option>
                      </select>
                      </div>
                    </div>
                    <div class="form-group row">
                    <label for="currDept" class="col-sm-3 col-form-label">Current Department</label>
                      <div class="col-sm-9">
                      <select class="form-control" id="currDept" value={currDeptValue} onChange={this.handleChange} disabled>
                        {Object.keys(deptNameValueMapping).map(function(key, index) {
                          return <option value={key}>{deptNameValueMapping[key]}</option>
                        })}
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                    <label for="currBranch" class="col-sm-3 col-form-label">Current Branch</label>
                      <div class="col-sm-9">
                      <select class="form-control" id="currBranch" value={currBranchValue} onChange={this.handleChange} disabled>
                      {Object.keys(branchNameValueMapping).map(function(key, index) {
                          return <option value={key}>{branchNameValueMapping[key]}</option>
                        })}
                      </select>
                      </div>
                    </div>
                    <div>
                        <h5>Branch Change Preferences:</h5>
                        <h6>(The branch/course in Preference 1 will be considered first and so on..)</h6>
                        {/*<div class="card l-bg-cyan preferenceBar">
                  <div class="card-statistic-3">
                    <div class="card-icon card-icon-large"><i class="fa fa-briefcase"></i></div>
                    <div class="card-content">
                      <h4 class="card-title">Preferences Filled</h4>
                      <span>{this.state.preferences.length}/5</span>
                      <div class="progress mt-1 mb-1" data-height="8" style={{height: "8px;"}}>
                        {this.state.preferences.length===1?
                        <div class="progress-bar l-bg-orange" role="progressbar" data-width="50%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: "20%;"}}></div>
                      :
                          this.state.preferences.length===2?
                          <div class="progress-bar l-bg-orange" role="progressbar" data-width="40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "40%;"}}></div>
                          :
                          this.state.preferences.length===3?
                          <div class="progress-bar l-bg-orange" role="progressbar" data-width="60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%;"}}></div>
                          :
                          this.state.preferences.length===4?
                          <div class="progress-bar l-bg-orange" role="progressbar" data-width="80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: "80%;"}}></div>
                          :
                          this.state.preferences.length===5?
                          <div class="progress-bar l-bg-orange" role="progressbar" data-width="100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%;"}}></div>
                          :
                          null
                      }
                      </div>
                      <p class="mb-0 text-sm">
                        <span class="text-nowrap">{5-this.state.preferences.length} more left</span>
                      </p>
                    </div>
                  </div>
                    </div>*/}
                        {this.state.preferences}
                        {this.state.preferences.length===5 ? 
                            <button onClick={this.addPreference} disabled class="btn btn-light">+ Add</button>
                            : 
                            <button onClick={this.addPreference} class="btn btn-light">+ Add</button>
                        }
                        {this.state.preferences.length>=2 ? 
                            <button onClick={this.removePreference} class="btn btn-danger float-right">- Remove</button>
                            :
                            null
                        }
                    </div>
                    <br/>
                    <div class="form-group row">
                      <label for="countCourse" class="col-sm-3 col-form-label">No of courses opted</label>
                      <div class="col-sm-9">
                        <input type="number" class="form-control-sm" id="countCourse" min="1" max="5" onChange={this.handleChange} />
                      </div>
                    </div>
                  <div class="card-footer">
                    <button type="submit" class="btn btn-success" onClick={this.submitForm}>Submit</button>
                  </div>
                </div>
                </div>
              </div>
        )
    }
}