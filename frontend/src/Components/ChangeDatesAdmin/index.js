import React from 'react'
import axios from "axios"
import {API} from '../../config'
import Session from 'react-session-api'

/* the changeDatesAdmin allows the admin to reset dates for branch change application start and end */
export default class ChangeDatesAdmin extends React.Component{
  constructor(props){
    super(props);
    this.state={
      resetStartDate: false,
      resetEndDate: false,
      startDate: '2020-01-01',
      endDate: '2020-01-01'
    };
    this.submitStartDate=this.submitStartDate.bind(this);
    this.submitEndDate=this.submitEndDate.bind(this);
  }
  componentDidUpdate(prevProps){
    if (this.props.applicationEndDate!==prevProps.applicationEndDate){
      this.setState({startDate:this.props.applicationStartDate,endDate:this.props.applicationEndDate});
    }
  }
  submitStartDate(){

  }
  submitEndDate(){
    let date=this.state.endDate;
    Session.set('token',localStorage.getItem('token'));
        axios({
        method: 'post',
        url: `${API}/users/submission-deadline`,
        headers: {
          Accepts:'application/json',
          "Content-Type":"application/json",
          Authorization: 'Bearer ' +Session.get('token')
         },
        data: {
            deadline: date
          }
        })
        .then(response=>{
          if (response.status===200){
            alert('Successfully changed the Application End Date, Please refresh the page to view the changes!');
          }
          else{
            alert('There has been some error, please log in again!');
            this.props.history.push('/');
          }
        })
        .catch(error => alert(error));
  }
    render(){
      return(
            <div class="card">
                  <div class="card-header">
                    <h4>Change Branch Request Application Dates</h4>
                  </div>
                  <div class="card-body">
                    <div class="form-group row">
                      <label>Application Start Date &nbsp;</label>
                      {this.state.resetStartDate ? 
                      <div>
                        <input type="date" min="2001-01-01" max="2030-01-01" value={this.state.startDate} onChange={(e)=>{this.setState({startDate:e.target.value})}} />
                        &nbsp;&nbsp;<button class="btn-sm btn-primary" onClick={this.submitStartDate}>Confirm</button>
                      </div>
                      :
                      <div>
                      <input type="date" min="2001-01-01" max="2030-01-01" value={this.state.startDate} disabled />
                      &nbsp;&nbsp;<button class="btn-sm btn-primary" onClick={()=>{this.setState({resetStartDate: true})}}>Reset</button>
                      </div>
                      }
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="form-group row">
                      <label>Application End Date &nbsp;</label>
                      {this.state.resetEndDate ? 
                      <div class="col-sm-9">
                        <input type="date" min="2001-01-01" max="2030-01-01" value={this.state.endDate} onChange={(e)=>{this.setState({endDate:e.target.value})}}/>
                        &nbsp;&nbsp;<button class="btn-sm btn-primary" onClick={this.submitEndDate}>Confirm</button>
                      </div>
                      :
                      <div>
                      <input type="date" min="2001-01-01" max="2030-01-01" value={this.state.endDate} disabled />
                      &nbsp;&nbsp;<button class="btn-sm btn-primary" onClick={()=>{this.setState({resetEndDate: true})}}>Reset</button>
                      </div>
                      }
                    </div>
                  </div>
                </div>
        )
    }
}