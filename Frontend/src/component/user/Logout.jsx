import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class Logout extends Component{

    constructor(props){
        super(props);
        this.state ={
            user:[],
            message: null
        }
        this.logout= this.logout.bind(this);
    }
    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        ApiService.fetchUserById(sessionStorage.getItem("userId"))
            .then((resp) => {
                console.log(resp)
                this.setState({user: resp.data})
            console.log(this.state.user);
            });
          
    }

logout = (e) => {
        e.preventDefault();
       sessionStorage.clear();
                this.props.history.push('/');
           
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div className="image" style={{height: '800px'}}>
            <div className="d-flex justify-content-center ">
                <h2 className="d-flex justify-content-center   text-center" align="center"  >Checkout Page</h2>
                <div className="alert alert-success text-center" role="alert">
 <p   style={{fontSize: "20px",fontWeight:"bold" }}> Order Successfully placed Order Id {sessionStorage.getItem("orderId")}  </p>
 <p style={{fontSize: "20px",fontWeight:"bold" }}>Total Amount to be Paid <u> {sessionStorage.getItem("amount")}  Rs </u>  by <u>{this.state.user.name}</u></p>
</div>
              

                <button className="btn btn-success" onClick={this.logout}>Logout</button>
           
    </div>
    </div>
        );
    }
}

export default Logout;