import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../Form.css'
class AddCrop extends Component{

    constructor(props){
        super(props);
        this.state ={
            cropName: '',
            quantity: '',
            price: '',
            dateOfUpload: '',
           
            message: null
        }
        this.saveCrop = this.saveCrop.bind(this);
    }
 
logout=(e)=>
{
    e.preventDefault();
    
}
    saveCrop = (e) => {
        e.preventDefault();
        console.log(this.state.cropName);
        let crop = {cropName: this.state.cropName, quantity: this.state.quantity, price: this.state.price, dateOfUpload: this.state.dateOfUpload};
        ApiService.addCrop(sessionStorage.getItem('userId'),crop)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/producer');
            }
            ).catch(err => {
                console.log("in error "+err.response.data)
               //err.response.data =>DTO on the server side :ErrorResponse
                alert(err.response.data.message)
                this.props.history.push('/add-crops');}
                );
    }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
console.log()
    }
    render() {
        return(
            <div className="image" style={{height: '500px'}}>
                <h2 className="text-center">Add New Crops</h2>
                <form className="demoForm">
                <div className="form-group">
                    <label>Crop Name:</label>
                    <input type="text" placeholder="crop name" name="cropName" className="form-control" value={this.state.cropName} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Quantity (Kgs):</label>
                    <input type="number" placeholder="0 kgs" name="quantity" className="form-control" value={this.state.quantity} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="text" placeholder="0.00" name="price" className="form-control" value={this.state.price} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Date of Upload:</label>
                    <input type="date"  name="dateOfUpload" className="form-control" value={this.state.dateOfUpload} onChange={this.onChange}/>
                </div>
               

                <button className="btn btn-success" onClick={this.saveCrop}>Add</button>
                
            </form>
    </div>
        );
    }
}

export default AddCrop;