import React from 'react';
import './index.css'

var branchByCourseCategory = {
    BTech: ["Computer Science and Engineering", "Electronics Engineering", "Others"],
    DualDegree: ["Mathematics and Computing", "Computer Science and Engineering", "Others"]
}

var branchValuesDropdown = {
  BTech: ["CSE", "ECE", "Others"],
  DualDegree: ["MnC", "CSE", "Others"]
}

var courseFilled=[];
var courseVal=[];
var branchVal=[];
const admissionNo=localStorage.getItem('admissionNo');
const currCourse=localStorage.getItem('course');
const currBranch=localStorage.getItem('branch');
const currCourseValue=currCourse.toLowerCase().includes("bachelor")?"BTech":"DualDegree";

var BTechBranchesUsed=[];
var DDBranchesUsed=[];

if (currCourseValue==="BTech") BTechBranchesUsed.push(currBranch);
else if (currCourseValue==="DualDegree") DDBranchesUsed.push(currBranch);

class Preference extends React.Component{
    constructor(props){
        super(props);
        this.state={
          courses: [...courseFilled,false], 
          courseNames: [...courseVal,''],
          branchNames: [...branchVal,'']
        };
        courseFilled.push(false);
        this.changecat=this.changecat.bind(this);
        this.handleChange=this.handleChange.bind(this);
    };
    changecat(event) {
      const value=event.target.value;
      let courseList=[...this.state.courses];
      let courseNameList=[...this.state.courseNames];
      let branchNameList=[...this.state.branchNames];
      courseList[this.props.courseNum]=true;
      courseNameList[this.props.courseNum]=value;
      courseFilled=courseList;
      courseVal=courseNameList;
      branchVal=branchNameList;
      this.setState({courses:courseList,courseNames:courseNameList,branchNames:branchNameList});
      if (value.length === 0) document.getElementById(`pref${this.props.courseNum}`).innerHTML = "<option></option>";
      else {
        console.log(BTechBranchesUsed);
          var catOptions = "<option value='' disabled selected>Select Branch</option>";
          for (var categoryId in branchByCourseCategory[value]) {
            if ((value==="BTech" && BTechBranchesUsed.includes(branchValuesDropdown[value][categoryId]) || (value==="DualDegree" && DDBranchesUsed.includes(branchValuesDropdown[value][categoryId])))){
              catOptions += "<option value=\""+ branchValuesDropdown[value][categoryId] + "\" disabled>" + branchByCourseCategory[value][categoryId] + "</option>";
            }
            else{
              catOptions += "<option value=\""+ branchValuesDropdown[value][categoryId] + "\">" + branchByCourseCategory[value][categoryId] + "</option>";
            }
          }
          document.getElementById(`pref${this.props.courseNum}`).innerHTML = catOptions;
      }
    }
    handleChange(event){
      let branchNameList=[...this.state.branchNames];
      let courseNameList=[...this.state.courseNames];
      if (this.props.number===branchNameList.length){
        if (courseNameList[this.props.courseNum]==="BTech") BTechBranchesUsed.push(event.target.value);
        else DDBranchesUsed.push(event.target.value);
      }
      else{
        if (courseNameList[this.props.courseNum]==="BTech") BTechBranchesUsed[this.props.courseNum]=event.target.value;
        else DDBranchesUsed[this.props.courseNum]=event.target.value;
      }
      branchNameList[this.props.courseNum]=event.target.value;
      branchVal=branchNameList;
      this.setState({branchNames:branchNameList});
      alert(`You have filled ${this.props.number} out of 5 choices!`);
    }
    render(){
    return(
        <div>
            <h5>Preference {this.props.number}:</h5>
        <div class="row">
        <div class="form-group col-lg-6">
        <label for="inputCourse3" class="col-sm-3 col-form-label">Course</label>
            <div class="col-sm-9">
            <select class="form-control" id="inputCourse3" onChange={this.changecat}>
                <option value="" disabled selected>Select Course</option>
            <option value="BTech">Bachelor of Technology</option>
            <option value="DualDegree">Integrated Master of Technology (Dual Degree)</option>
            </select>
            </div>
        </div>
        <div class="form-group col-lg-6">
        <label for="courseCategory" class="col-sm-3 col-form-label">Branch</label>
            <div class="col-sm-9">
              {console.log(this.props.courseNum,this.state.courses[this.props.courseNum])}
            { this.state.courses[this.props.courseNum]===false ?
              <select class="form-control" name={`pref${this.props.courseNum}`} id={`pref${this.props.courseNum}`} disabled>
                <option value="" disabled selected>Select Branch</option>
              </select>
            :
              <select class="form-control" name={`pref${this.props.courseNum}`} id={`pref${this.props.courseNum}`} onChange={this.handleChange}>
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
    }
    removePreference=()=>{
        let preferenceList=[...this.state.preferences];
        if (preferenceList.length===courseVal.length){
          courseFilled.pop();
          let course=courseVal.pop();
          let branch=branchVal.pop();
          if (branch.length>0){
            if (course==="BTech") BTechBranchesUsed.pop();
            else DDBranchesUsed.pop();
          }
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
                        <option value="CSE">Computer Science and Engineering</option>
                        <option value="EE">Electronics Engineering</option>
                      </select>
                      </div>
                    </div>
                    <div>
                        <h5>Branch Change Preferences:</h5>
                        <h6>(The branch/course in Preference 1 will be considered first and so on..)</h6>
                        
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
                    <button type="submit" class="btn btn-success">Submit</button>
                  </div>
                </div>
                </div>
              </div>
        )
    }
}