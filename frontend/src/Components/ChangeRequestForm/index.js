import React from 'react';
import './index.css'
import axios from "axios"
import {API} from '../../config'
import Session from 'react-session-api'

var deptByCourseCategory = {
  BTech: ["Computer Science and Engineering","Electronic Engineering","Electrical Engineering"],
  DualDegree: ["Computer Science and Engineering"],
  Int_MTech: ["Mathematics and Computing","Applied Geology","Applied Geophysics"]
}

var deptValuesDropdown = {
  BTech: ["cse","ece","ee"],
  DualDegree: ["cse"],
  Int_MTech: ["mnc","agl","agp"]
}

var branchByCourseAndDeptCategory = {
    BTech: {cse:["Computer Science and Engineering"],ece:["Electronics Engineering"],ee:["Electrical Engineering"]},
    DualDegree: {cse:["Computer Science and Engineering+Computer Science and Engineering"]},
    Int_MTech: {mnc:["Mathematics and Computing"],agl:["Applied Geology"],agp:["Applied Geophysics"]}
}

var branchValuesDropdown = {
  BTech: {cse:["cse"],ece:["ece"],ee:["ee"]},
  DualDegree: {cse:["cse+cse"]},
  Int_MTech: {mnc:["mnc"],agl:["agl"],agp:["agp"]}
}

var optionInfo={
  courseFilled: false,
  deptFilled: false,
  course: '',
  course_id: '',
  branch: '',
  branch_id: '',
  dept: '',
  dept_id: ''
}

var optionsFilled=[];

const admissionNo=localStorage.getItem('admissionNo');
const currCourse=localStorage.getItem('course');
const currBranch=localStorage.getItem('branch');
const currCourseValue=currCourse.toLowerCase().includes("bachelor")?"BTech":currCourse.toLowerCase().includes("master")?"Int_MTech":"DualDegree";

var BTechBranchesUsed=[];
var DDBranchesUsed=[];
var IntMTechBranchesUsed=[];

if (currCourseValue==="BTech") BTechBranchesUsed.push(currBranch);
else if (currCourseValue==="DualDegree") DDBranchesUsed.push(currBranch);
else if (currCourseValue==="Int_MTech") IntMTechBranchesUsed.push(currBranch);

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
      /*let branchNameList=[...this.state.branchNamesFilled];
      let courseNameList=[...this.state.courseNamesFilled];*/
      if (this.props.number===this.state.preferenceFilled.length){
        if (this.state.preferenceFilled[this.props.courseNum].course==="BTech") BTechBranchesUsed.push(event.target.value);
        else if (this.state.preferenceFilled[this.props.courseNum].course==="DualDegree") DDBranchesUsed.push(event.target.value);
        else IntMTechBranchesUsed.push(event.target.value);
      }
      else{
        if (this.state.preferenceFilled[this.props.courseNum].course==="BTech") BTechBranchesUsed[this.props.courseNum]=event.target.value;
        else if (this.state.preferenceFilled[this.props.courseNum].course==="DualDegree") DDBranchesUsed[this.props.courseNum]=event.target.value;
        else IntMTechBranchesUsed[this.props.courseNum]=event.target.value;
      }
      let preferences=[...this.state.preferenceFilled];
      preferences[this.props.courseNum].branch=event.target.value;
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
        this.state={
            preferences:[<Preference number="1" courseNum="0" />],
        };
        this.submitForm=this.submitForm.bind(this);
    }
    submitForm=()=>{
      //validate fields before submitting

      axios({
        method: 'post',
        url: `${API}/users/submit-application`,
        headers: {
          Accepts:'application/json',
          "Content-Type":"application/json",
          Authorization: 'Bearer ' +Session.get('token')
         },
        data: {
           /*username: this.state.username,
           password: this.state.password*/
          }
      })
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
                      <label for="inputName3" class="col-sm-3 col-form-label">Name</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" id="inputName3" placeholder="Your Name.." />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputAdm3" class="col-sm-3 col-form-label">Admission No</label>
                      <div class="col-sm-9">
                        <input class="form-control" id="inputAdm3" value={admissionNo} readonly="" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputEmail3" class="col-sm-3 col-form-label">Email</label>
                      <div class="col-sm-9">
                        <input class="form-control" id="inputEmail3" value="sample@email.com" readonly="" />
                      </div>
                    </div>
                    <div class="form-group row">
                    <label for="inputCurrCourse3" class="col-sm-3 col-form-label">Current Course</label>
                      <div class="col-sm-9">
                      <select class="form-control" id="inputCurrCourse3" value={currCourseValue} disabled>
                        <option value="BTech">Bachelor of Technology</option>
                        <option value="DualDegree">Integrated Master of Technology (Dual Degree)</option>
                      </select>
                      </div>
                    </div>
                    <div class="form-group row">
                    <label for="inputCurrCourse3" class="col-sm-3 col-form-label">Current Branch</label>
                      <div class="col-sm-9">
                      <select class="form-control" id="inputCurrCourse3" value="CSE" disabled>
                        <option value="cse">Computer Science and Engineering</option>
                        <option value="ee">Electronics Engineering</option>
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
                      <label for="inputCount3" class="col-sm-3 col-form-label">No of courses opted</label>
                      <div class="col-sm-9">
                        <input type="number" class="form-control-sm" id="inputCount3" min="1" max="5" />
                      </div>
                    </div>
                  <div class="card-footer">
                    <button type="submit" class="btn btn-success" onSubmit={this.submitForm}>Submit</button>
                  </div>
                </div>
                </div>
              </div>
        )
    }
}