import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListCropProducerComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            crops: [],
            message: null
        }
        this.deleteCrop = this.deleteCrop.bind(this);
        this.editCrop = this.editCrop.bind(this);
        this.addCrop = this.addCrop.bind(this);
        this.reloadCropList = this.reloadCropList.bind(this);
        this.editUser=this.editUser.bind(this);
        this.deleteUser=this.deleteUser.bind(this);
        this.logout= this.logout.bind(this);
    }

    componentDidMount() {
        this.reloadCropList();
    }
    editUser(){
        this.props.history.push("/edit-user")
    }
    reloadCropList() {
        ApiService.fetchCropsByUserId(sessionStorage.getItem('userId'))
            .then((resp) => {
                this.setState({crops: resp.data})
                console.log(this.state.crops);
            });
        
    }

    deleteCrop(cropId) {
        ApiService.deleteCrop(cropId)
           .then(res => {
               this.setState({message : 'Crop deleted successfully.'});
               this.setState({crops: this.state.crops.filter(crop => crop.id !== cropId)});
           })

    }

    editCrop(id) {
        window.localStorage.setItem("cropId", id);
        this.props.history.push('/edit-crop');
    }

    addCrop() {
        window.localStorage.removeItem("cropId");
        this.props.history.push('/add-crops');
    }
    deleteUser() {
        console.log(sessionStorage.getItem('userId'));
        ApiService.deleteUser(sessionStorage.getItem('userId'))
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
              this.props.history.push('/')
           })
    
    }

    logout = (e) => {
        e.preventDefault();
       sessionStorage.clear();
                this.props.history.push('/');
           
    }
    render() {
        return (
            <div className="image" style={{height: '600px'}}>
            <div className="App-header2">
                <h2 className="text-center">Crop Details</h2>
                <div style={{display:" inline-block"}} align="center" >
                <button className="btn btn-danger" style={{width:'100px',margin:'20px'}} onClick={() => this.addCrop()}> Add Crop</button>
                <button className="btn btn-danger" style={{width:'100px',margin:'20px'}} onClick={() => this.editUser()}> Edit user</button>
                <button className="btn btn-danger" style={{width:'100px',margin:'20px'}} onClick={() => this.deleteUser()}> Delete user</button>
                <button className="btn btn-success" style={{width:'100px',margin:'20px'}} onClick={this.logout}>Logout</button>
           </div>
                </div>
              
              
                <table className="table">
                    <thead>
                        <tr>
                            <th className="hidden" style={{textAlign:" center"}}>Id</th>
                            <th style={{textAlign:" center"}}> CropName</th>
                            <th style={{textAlign:" center"}}>Quantity (Kgs)</th>
                            <th style={{textAlign:" center"}}>Price</th>
                            <th style={{textAlign:" center"}}>Date Of Upload</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.crops.map(
                        crop =>
                                    <tr key={crop.id}>
                                        <td style={{textAlign:" center"}}>{crop.cropName}</td>
                                        <td style={{textAlign:" center"}}>{crop.quantity}</td>
                                        <td style={{textAlign:" center"}}>{crop.price}</td>
                                        <td style={{textAlign:" center"}}>{crop.dateOfUpload}</td>
                                       
                                        <td style={{textAlign:" center"}}>
                                            <button className="btn btn-success" onClick={() => this.deleteCrop(crop.id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editCrop(crop.id)} style={{marginLeft: '20px'}}> Edit</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
</div>
            
        );
    }

}

export default ListCropProducerComponent;