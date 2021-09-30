import React, { Component } from 'react';
import { FormErrors } from './FormErrors';

import ApiService from "../../service/ApiService";
import '../../Form.css'
class Registration extends Component {
  constructor (props) {
    super(props);
    this.state = {
     
      name: '',
      password: '',
      email: '',
      city: '',
      state: '',
      contactNo: '',
      
      adharNo: '',
      role:'',
      message: null,
      formErrors: {email: '', password: '',contactNo: ''},
      emailValid: false,
      passwordValid: false,
      conatactNoValid:false,
      formValid: false
    }
    this.loginUser=this.loginUser.bind(this);
    this.saveUser=this.saveUser.bind(this);
    this.onChange=this.onChange.bind(this);
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
    let contactNoValid = this.state.conatactNoValid;
    switch(fieldName) {
    
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
        case 'contactNo':
            contactNoValid = value.length === 10;
            fieldValidationErrors.contactNo =contactNoValid ? '' : ' is not a valid contact';
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    contactNoValid: contactNoValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.role)

}
loginUser(e){
e.preventDefault();
window.location.href="/"
}
saveUser = (e) => {
    e.preventDefault();
    console.log(this.state.role);
    let user = {name: this.state.name, password: this.state.password, email: this.state.email, city: this.state.city,state: this.state.state,contactNo: this.state.contactNo, adharNo: this.state.adharNo, accountNo: this.state.accountNo,role: this.state.role};
    ApiService.addUser(user)
        .then(res => {
            this.setState({message : 'User added successfully.'});
            this.props.history.push('/');
        }
        ).catch(err => {
            console.log("in error "+err.response.data)
           //err.response.data =>DTO on the server side :ErrorResponse
            alert(err.response.data.message)
            this.props.history.push('/register');}
            );
}


  render () {
    return (
        <div className="image"  >
      <form className="demoForm">
        <h2>Sign up</h2>
        <div className="panel panel-default" >
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="form-group">
                    <label>Name:</label>
                    <input type="text" placeholder="Name" name="name" className="form-control"
                     value={this.state.name} onChange={this.onChange} required/>
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
        <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`}>
          <label htmlFor="text">Contact No</label>
          <input type="text" className="form-control" name="contactNo"
            placeholder="Contact"
            value={this.state.contactNo}
            onChange={this.handleUserInput}  />
        </div>
        <div className="form-group">
                    <label>Adhar Number:</label>
                    <input type="text" placeholder="Adhar number" name="adharNo" className="form-control" value={this.state.adharNo} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input type="text" placeholder="Pune" name="city" className="form-control" value={this.state.city} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <input type="text" placeholder="Maharashtra" name="state" className="form-control" value={this.state.state} onChange={this.onChange} required/>
                </div>
               
                <div onChange={this.onChange}>
        <input type="radio" value="PRODUCER" name="role" /> PRODUCER
        <input type="radio" value="BUYER" name="role" /> BUYER
        
      </div>
        <button type="submit" className="btn btn-primary"style={{width:'100px',margin:'20px'}} disabled={!this.state.formValid} onClick={this.saveUser}>Sign up</button>
        <button type="submit" className="btn btn-primary" style={{width:'100px',margin:'20px',textAlign:'center'}} onClick={this.loginUser}>Login</button>
      </form>
      </div>
    )
  }
}

export default Registration;
