import React from 'react'

/* the changeDatesAdmin allows the admin to reset dates for branch change application start and end */
export default class ChangeDatesAdmin extends React.Component{
  constructor(props){
    super(props);
    this.state={
      resetStartDate: false,
      resetEndDate: false,
      startDate: '2020-01-01',
      endDate: '2020-01-01',
    };
    this.submitStartDate=this.submitStartDate.bind(this);
    this.submitEndDate=this.submitEndDate.bind(this);
  }
  submitStartDate(event){

  }
  submitEndDate(event){
    
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