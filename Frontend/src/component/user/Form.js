import React, { Component } from 'react';
import { FormErrors } from './FormErrors';

import ApiService from "../../service/ApiService";
import '../../Form.css'
class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.loginUser= this.loginUser.bind(this);
    this.registerUser=this.registerUser.bind(this);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }
  loginUser = (e) => {
    e.preventDefault();
    let user = { password: this.state.password, email: this.state.email};
    ApiService.loginUser(user)
        .then(res => {
            console.log(res.data);
           
            window.sessionStorage.setItem("userId", res.data.id);
            this.setState({message : 'User Logged in successfully.'});
            console.log(res.data.role);
            if(res.data.role === "PRODUCER")
            this.props.history.push('/producer');
            else
            this.props.history.push('/buyer');
        }
        ).catch(err => { console.log("in error "+err)
            console.log("in error "+err.response.data)
           //err.response.data =>DTO on the server side :ErrorResponse
            alert(err.response.data.message)
            this.props.history.push('/');}
            );
}
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  registerUser=(e)=> {
    e.preventDefault();
    console.log("In register")
window.location.href="/register"
    console.log("In register")
}



  render () {
    return (
      <div className="image" style={{height: '500px'}}>
      <form className="demoForm">
        <h2>Sign up</h2>
        <div className="panel panel-default" >
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit" className="btn btn-primary"style={{width:'100px',margin:'20px'}} disabled={!this.state.formValid} onClick={this.loginUser}>Login</button>
        <button type="submit" className="btn btn-primary" style={{width:'100px',margin:'20px',textAlign:'center'}} disabled={!this.state}onClick={this.registerUser}>Register User</button>
      </form>
      </div>
    )
  }
}

export default Form;
