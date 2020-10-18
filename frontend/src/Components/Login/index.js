import React from 'react'
import './index.css'

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          error:'',
          username:'',
          password:'',
          showMsg:false,
          loading:false
        }     
        this.handleChange = this.handleChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        
       }
       componentWillMount(){
       
       }
        componentDidMount(){
        
        //if (!this.props.buildingBurger && this.props.authRedirectPath !== 'home') {
        //   this.props.onSetAuthRedirectPath();
       // }
/*
            const data  =localStorage.getItem('tiktok');

            if(data){
          //    return  history.push(`/`)
                return  this.props.history.push(`/home`)
            }else{

              return <Redirect to='/'/>;
            }
*/

        }
        handleChange(evt){
      //  alert(evt.target.value);
      //  console.log({[evt.target.name]: evt.target.value});
        let data=[this.setState({ [evt.target.name]: evt.target.value })];
        //  console.log(data);
      }
      onSubmitHandler(e){
         e.preventDefault();
         if(this.state.username === ''){
          this.setState({status:false,error:"Please Enter Username",showMsg:true});
          return false;
        }else{
           this.setState({status:true,error:"",showMsg:false});
        }

        if(this.state.password === ''){
         this.setState({status:false,error:"Please Enter password",showMsg:true});
         return false;
       }else{
          this.setState({status:true,error:"",showMsg:false});
       }
    }
    render(){
        const username=this.props.username;
        const userType=this.props.type;
        return(
            <div id="app">
    <section className="section">
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div className="card card-primary">
              <div className="card-header">
        <h4>Login as {userType}</h4>
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
                      <input type="checkbox" name="remember" className="custom-control-input" tabIndex="3" id="remember-me"/>
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