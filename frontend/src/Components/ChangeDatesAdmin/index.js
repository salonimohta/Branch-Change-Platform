import React from 'react'

export default class ChangeDatesAdmin extends React.Component{
    render(){
        return(
            <div class="card">
                  <div class="card-header">
                    <h4>Change Branch Request Application Dates</h4>
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                      <label>Application Start Date </label>
                      <input type="date" min="2001-01-01" max="2030-01-01" />
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                      <label>Application End Date </label>
                      <input type="date" min="2001-01-01" max="2030-01-01" />
                    </div>
                  </div>
                </div>
        )
    }
}