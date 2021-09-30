import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../Form.css'
class EditUserComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id:'',
            name: '',
            password: '',
            email: '',
            city: '',
            state: '',
            contactNo: '',
            accountNo: '',
            adharNo: '',
            role:'',
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        ApiService.fetchUserById(sessionStorage.getItem("userId"))
            .then((res) => {
                let user = res.data;
                this.setState({
                id: user.id,
                name: user.name,
                email: user.email,
                password:user.password,
                city: user.city,
                state: user.state,
                contactNo: user.contactNo, 
                accountNo: user.accountNo, 
               role:user.role
               
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, name: this.state.name,password: this.state.password, email: this.state.email, contactNo: this.state.contactNo, accountNo: this.state.accountNo, state: this.state.state,city:this.state.city};
console.log(JSON.stringify(user))
        ApiService.editUser(user,user.id)
            .then(res => {
                this.setState({message : 'User details updated successfully.'});
                if(this.state.role === 'PRODUCER')
                this.props.history.push('/producer');
                else
                this.props.history.push('BUYER')
            });
    }

    render() {
        return (
            <div className="image">
                <h2 className="text-center">Edit User</h2>
                <form class='demoForm'>

                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" placeholder="name" name="name" className="form-control" defaultValue={this.state.name} readOnly='true'/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" placeholder="email@gmail.com" name="email" className="form-control" defaultValue={this.state.email} readOnly='true'/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" placeholder="asdsa" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                </div>
                
                <div className="form-group">
                    <label>Contact Number:</label>
                    <input type="text" placeholder="1234567890" name="contactNo" className="form-control" value={this.state.contactNo} onChange={this.onChange}/>
                </div>
               
                <div className="form-group">
                    <label>City:</label>
                    <input type="text" placeholder="pune" name="city" className="form-control" value={this.state.city} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <input type="text" placeholder="maharashtra" name="state" className="form-control" value={this.state.state} onChange={this.onChange}/>
                </div>

                    <button className="btn btn-success" onClick={this.saveUser}>Update</button>
                </form>
            </div>
        );
    }
}

export default EditUserComponent;