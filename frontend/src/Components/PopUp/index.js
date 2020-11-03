import React, { Component } from "react";
import './index.css';


export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  onlyOne=(checkbox)=>{
    var checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    })
  };

render() {
  return (
   <div className="modal">
     {/*<div className="modal_content">*/}
     <div class="card">
        <div class="card-header">
          <h4>Student Details :</h4>
          <a href="#" className="close closePopUp" onClick={this.handleClick}>&times;</a>
        </div>
        <div class="card-body">
          Admission No:   {this.props.admNo} <br/>
          Current Course:   <br/>
          Current Branch:   <br/>
          Current Department:   <br/>
          CGPA:   <br/>
          Session:  <br/><br/>
          Preferences: <br/><br/>
          <input type="checkbox" name="check" onClick={this.onlyOne} id="first" />&nbsp;
          <label for="first">First: BTech in CSE</label><br/>
          <input type="checkbox" name="check" onClick={this.onlyOne} id="second" />&nbsp;
          <label for="second">Second: BTech in ECE</label><br/>
          <input type="checkbox" name="check" onClick={this.onlyOne} id="third" />&nbsp;
          <label for="third">Third: </label>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-success">Approve</button>&nbsp;&nbsp;
          <button class="btn btn-danger">Decline</button>
        </div>
      </div>
    </div>
  );
 }
}