import React from 'react'

export default class ChangeDatesAdmin extends React.Component{
    render(){
        return(
            <div class="card">
                  <div class="card-header">
                    <h4>Date &amp; Time Picker</h4>
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                      <label>Date Picker</label>
                      <input class="form-control datepicker" />
                    </div>
                  </div>
                </div>
        )
    }
}