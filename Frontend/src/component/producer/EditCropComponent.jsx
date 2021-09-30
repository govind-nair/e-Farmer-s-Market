import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import  '../../Form.css'
class EditCropComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            cropName: '',
            quantity: '',
            price: '',
            dateOfUpload: ''
        }
        this.saveCrop = this.saveCrop.bind(this);
        this.loadCrop = this.loadCrop.bind(this);
    }

    componentDidMount() {
        this.loadCrop();
    }

    loadCrop() {
        ApiService.fetchCropsById(window.localStorage.getItem("cropId"))
            .then((res) => {
                console.log("In fetch crop")
                console.log(res.data);
                let crop = res.data;
                this.setState({
                id: crop.id,         
                cropName: crop.cropName,
                quantity: crop.quantity,
                price: crop.price,
                dateOfUpload: crop.dateOfUpload,
                })
                console.log(this.state.cropName);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveCrop = (e) => {
        e.preventDefault();
        let crop = {id: this.state.id, cropName: this.state.cropName, quantity: this.state.quantity, price: this.state.price, dateOfUpload: this.state.dateOfUpload};
        ApiService.editCrop(crop)
            .then(res => {
                this.setState({message : 'crop details updated successfully.'});
                this.props.history.push('/producer');
            });
    }

    render() {
        return (
            <div className="image" style={{height: '500px'}}>
                <h2 className="text-center">Edit crop</h2>
                <form className="demoForm">

                    <div className="form-group">
                        <label>Crop Name:</label>
                        <input type="text" placeholder="cropName" name="cropName" className="form-control" readOnly={true} defaultValue={this.state.cropName}/>
                    </div>


                    <div className="form-group">
                        <label>Quantity Name (Kgs):</label>
                        <input placeholder="number" name="quantity" className="form-control" value={this.state.quantity} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" placeholder="price" name="price" className="form-control" value={this.state.price} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>DateOfUpload:</label>
                        <input type="date" placeholder="dateOfUpload" name="dateOfUpload" className="form-control" value={this.state.dateOfUpload} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveCrop}>Update</button>
                </form>
            </div>
        );
    }
}

export default EditCropComponent;