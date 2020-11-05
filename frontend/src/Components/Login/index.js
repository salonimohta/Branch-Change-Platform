import React from 'react'
import './index.css'
import {Redirect, withRouter} from 'react-router-dom'
import axios from "axios"
import {API} from '../../config'
import Session from 'react-session-api'

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          error:'',
          password:'',
          showMsg:false,
          loading:false,
          rememberMe:localStorage.getItem(`${this.props.type.toLowerCase()}rememberMe`) === 'true',
          username: localStorage.getItem(`${this.props.type.toLowerCase()}rememberMe`) === 'true' ? localStorage.getItem(`${this.props.type.toLowerCase()}username`) : '',
          userType: ''
        }     
        this.handleChange = this.handleChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
       }
       
      componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.type !== prevProps.type) {
          this.setState({
            error:'',
            password:'',
            showMsg:false,
            loading:false,
            rememberMe:localStorage.getItem(`${this.props.type.toLowerCase()}rememberMe`) === 'true',
            username: localStorage.getItem(`${this.props.type.toLowerCase()}rememberMe`) === 'true' ? localStorage.getItem(`${this.props.type.toLowerCase()}username`) : '',
            userType: this.props.type
          });
        }
      }
        handleChange(evt){
          const input = evt.target;
          const value = input.type === 'checkbox' ? input.checked : input.value;
          this.setState({ [input.name]: value });
      }
      onSubmitHandler(e){
          e.preventDefault();
          const { username, rememberMe } = this.state;
          localStorage.setItem(`${this.props.type.toLowerCase()}rememberMe`, rememberMe);
          localStorage.setItem(`${this.props.type.toLowerCase()}username`, rememberMe ? username : '');
          
          if(this.state.username === ''){
            this.setState({status:false,error:"Please Enter Username",showMsg:true});
            return false;
          }
          else{
            this.setState({status:true,error:"",showMsg:false});
          }

          if(this.state.password === ''){
            this.setState({status:false,error:"Please Enter password",showMsg:true});
            return false;
          }
          else{
           this.setState({status:true,error:"",showMsg:false});
          }
          axios({
            method: 'post',
            url: `${API}/users/login`,
            headers: {
              Accepts:'application/json',
              "Content-Type":"application/json"
             },
            data: {
               username: this.state.username,
               password: this.state.password
              }
          })
          .then(response=>{
              if (response.status===200){
                console.log(response.data.token);
                Session.set("token",response.data.token);
                if (this.props.type==="Student"){
                  let studentDetails=response.data.studentBranchDetails;
                  let studentName=studentDetails.user_detail.first_name;
                  if (studentDetails.user_detail.salutation!=="") studentName=studentDetails.user_detail.salutation+" "+studentName;
                  if (studentDetails.user_detail.middle_name!=="") studentName=studentName+" "+studentDetails.user_detail.middle_name;
                  if (studentDetails.user_detail.last_name!=="") studentName=studentName+" "+studentDetails.user_detail.last_name;
                  localStorage.setItem('studentName',studentName);
                  localStorage.setItem('admissionNo',studentDetails.user_detail.id);
                  localStorage.setItem('imagePath',studentDetails.user_detail.photopath);
                  localStorage.setItem('course',studentDetails.course.name);
                  localStorage.setItem('branch',studentDetails.branch.name);
                  localStorage.setItem('dept',studentDetails.department.name);
                  localStorage.setItem('branchChangeRequestSubmitted',response.data.branchChangeApplication.length>0?true:false);
                  this.props.history.push('/studentHome');
                }
                else{
                  this.props.history.push('/adminHome');
                }
              }
              else alert('Please Enter correct Credentials!');
          })

    }
    render(){
        const username=this.props.username;
        return(
            <div id="app">
    <section className="section">
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div className="card card-primary">
              <div className="card-header">
        <h4>Login as {this.state.userType}</h4>
              </div>
              {  this.props.error ?
       <div className= {this.props.error  ? "alert alert-danger" : "alert alert-success"} role="alert">
       <i className="fa fa-frown-o mr-2" aria-hidden="true"></i>{this.props.error}</div>
       :
       <div></div>

     }
              <div className="card-body">
                <form className="needs-validation" onSubmit={this.onSubmitHandler}>
                  <div className="form-group">
    <label htmlFor="email">{username}</label>
                    <input id="username" type="text" onChange={this.handleChange} value={this.state.username} className="form-control" name="username" tabIndex="1" required="required" autoFocus=""/>
                    <div className="invalid-feedback">
                      Please fill in your email
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="d-block">
                      <label htmlFor="password" className="control-label">Password</label>
                      <div className="float-right">
                        <a href="auth-forgot-password.html" className="text-small">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <input id="password" type="password" onChange={this.handleChange} value={this.state.password} className="form-control" name="password" tabIndex="2" required="required"/>
                    <div className="invalid-feedback">
                      please fill in your password
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" name="rememberMe" className="custom-control-input" tabIndex="3" id="remember-me" onChange={this.handleChange} checked={this.state.rememberMe} />
                      <label className="custom-control-label" htmlFor="remember-me">Remember Me</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                      Login
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
        )
    }
}

export default withRouter(Login);