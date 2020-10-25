import React from 'react';
import './index.css'

var branchByCourseCategory = {
    BTech: ["Computer Science and Engineering", "Electronics Engineering", "Tea", "Others"],
    DualDegree: ["Mathematics and Computing", "Computer Science and Engineering", "Water", "Others"]
}

function changecat(value) {
    if (value.length == 0) document.getElementById("courseCategory").innerHTML = "<option></option>";
    else {
        var catOptions = "";
        for (var categoryId in branchByCourseCategory[value]) {
            catOptions += "<option>" + branchByCourseCategory[value][categoryId] + "</option>";
        }
        document.getElementById("courseCategory").innerHTML = catOptions;
    }
}

class Preference extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
    return(
        <div>
            <h5>Preference {this.props.number}:</h5>
        <div class="row">
        <div class="form-group col-lg-6">
        <label for="inputCourse3" class="col-sm-3 col-form-label">Course</label>
            <div class="col-sm-9">
            <select class="form-control" id="inputCourse3" onChange="changecat(this.value);">
                <option value="">Select Course</option>
            <option value="BTech">Bachelor of Technology</option>
            <option value="DualDegree">Integrated Master of Technology (Dual Degree)</option>
            </select>
            </div>
        </div>
        <div class="form-group col-lg-6">
        <label for="inputCourse3" class="col-sm-3 col-form-label">Branch</label>
            <div class="col-sm-9">
            <select class="form-control" name="courseCategory" id="courseCategory">
            <option value="" disabled selected>Select Branch</option>
        </select>
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
            preferences:[<Preference number="1" />,<Preference number="2" />]
        };
    }
    removePreference=()=>{
        //console.log(this.state.preferences.length);
        let preferenceList=[...this.state.preferences];
        preferenceList.pop();
        this.setState({preferences:preferenceList});
        //console.log(this.state.preferences.length);
    }
    addPreference=()=>{
        const num=this.state.preferences.length+1;
        this.setState({preferences: [...this.state.preferences,<Preference number={num} />]});
    };
    render(){
      const admissionNo=localStorage.getItem('admissionNo');
      const currCourse=localStorage.getItem('course');
      const currBranch=localStorage.getItem('branch');
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
                      <select class="form-control" id="inputCurrCourse3" value="BTech" disabled>
                        <option value="BTech">Bachelor of Technology</option>
                        <option value="BTech+MTech">Integrated Master of Technology (Dual Degree)</option>
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
                        {this.state.preferences.length>2 ? 
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