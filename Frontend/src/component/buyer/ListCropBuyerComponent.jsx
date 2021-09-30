import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListCropBuyerComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            crops: [], 
           buyerId:'', 
           cropId:'', 
            message: null,
            amountvalid:false
           
        }
        this.checkOut = this.checkOut.bind(this);
        this.reloadCropList = this.reloadCropList.bind(this);    
        this.handleDecrement=this.handleDecrement.bind(this);
        this.handleIncrement=this.handleIncrement.bind(this);
        this.editUser=this.editUser.bind(this);
        this.deleteUser=this.deleteUser.bind(this);
        this.logout= this.logout.bind(this);
        this.listOrder=this.listOrder.bind(this);
    }

    componentDidMount() {         
        this.reloadCropList();
    }

    reloadCropList() {
        ApiService.fetchCrops()
            .then((resp) => {
                this.setState({crops: resp.data})
               console.log(this.state.crops); 
    var newState = [...this.state.crops];
    newState.forEach(function(file) {
      file.qty = 0
      file.total = 0
    })
    this.setState({crops: newState}, function() {
      console.log(this.state.crops);
    })
            });
          

    }


    checkOut = (e) => {
        e.preventDefault();
        var amount=0;
        const data=[];
        this.state.crops.map((crop) => {
            if(crop.qty!==0) {
              console.log(crop.id);
               amount=crop.total+amount;
                        
               console.log(crop.name)
               console.log(amount);
data.push({  buyerId:sessionStorage.getItem("userId") ,quantity : crop.qty,cropId:crop.id,total:crop.total,name:crop.cropName});

            }
        })
        sessionStorage.setItem("data",JSON.stringify ( data));
        sessionStorage.setItem("amount",amount);
        console.log(data)
      
        // let data = { buyerId:sessionStorage.getItem("userId") , quantity:this.state.crops.qty,cropId:this.state.crops.id};
       if(amount > 0){
        ApiService.checkOut(data)
            .then(res => {
                
                console.log(res.data);
                this.props.history.push('/checkout');
            }
            ).catch(err => { console.log("in error "+err)
                console.log("in error "+err.response.data)
               //err.response.data =>DTO on the server side :ErrorResponse
                alert(err.response.data.message)
                this.props.history.push('/');}
                );
        }
        else{
            alert("Add items in the cart")
            this.props.history.push('/buyer');
        }
    }



   handleDecrement=(crop_id)=>{
    const newItems = [...this.state.crops]; // clone the array 
   newItems.map(item => {
 //   console.log(item)
        var price=item.price;
        if(item.id === crop_id && item.qty>0){
        item.qty=item.qty - 1;
        item.total=price*item.qty;}
    })
  this.setState({crops:newItems})
   }
 
   handleIncrement=(crop_id)=>{
    const newItems = [...this.state.crops]; // clone the array 
 
    newItems.map(item => {
   //    console.log(item.qty)
        if(item.id === crop_id && item.qty<item.quantity){
        item.qty=item.qty +1;
        item.total=item.price*item.qty;}
    })  
  this.setState({crops:newItems})
   }
   editUser(){
    this.props.history.push("/edit-user")
}
deleteUser() {

    ApiService.deleteUser(sessionStorage.getItem("userId"))
       .then(res => {
           this.setState({message : 'User deleted successfully.'});
          this.props.history.push('/')
       })

}
listOrder(){
  
        this.props.history.push('/orders')
}
logout = (e) => {
    e.preventDefault();
   sessionStorage.clear();
            this.props.history.push('/');
       
}

    render() {
        return (
            <div className="image" style={{height: '800px'}}>
                <div className="App-header2">
                <h2 className="text-center">Crop Details</h2>
                <div style={{display:" inline-block"}} align="center" >
                   
                <button className="btn btn-danger" style={{width:'100px',margin:'20px'}} onClick={() => this.editUser()} data-inline="true"> Edit user</button>
               
                <button className="btn btn-danger" style={{width:'100px',margin:'20px'}} onClick={() => this.deleteUser()} data-inline="true"> Delete user</button>
                <button className="btn btn-danger" style={{width:'100px',margin:'20px'}} onClick={() => this.listOrder()} data-inline="true"> Order History</button>
                <button className="btn btn-success" style={{width:'100px',margin:'20px'}}onClick={this.logout}>Logout</button>
              
</div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="hidden" style={{textAlign:" center"}}>Id</th>
                            <th  style={{textAlign:" center"}}>CropName</th>
                            <th style={{textAlign:" center"}}>Max Quantity (Kgs</th>
                            <th style={{textAlign:" center"}}>Unit Price</th>
                            <th style={{textAlign:" center"}}>Date Of Upload</th>
                           
                            <th style={{textAlign:" center"}}>Price</th>
                            <th style={{textAlign:" center"}}>Quantity (Kgs)</th>
                           
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
                                    <td>{crop.total}</td>
             {/* <!--   <td> <Counter count={this.state.quantity} handler={this.handler}/></td>      / */}
                {/* <td>{this.state.quantity*this.props.price}</td> */}
                <td >
                <div style={{display: "inline-block"}}>
                 
<button type="button" className="input-group-text" style={{marginLeft: '8px',marginTop:'20px'}} onClick={()=>this.handleDecrement(crop.id)}>-</button>

{/* <div className="form-control text-center " >{crop.qty}</div> */}
<input type="text"value= {crop.qty} style={{textAlign:" center",width:"50px"}}/>

<button type="button" className="input-group-text" style={{marginLeft: 'px',marginBottom:'30px'}} onClick={()=>this.handleIncrement(crop.id)}>+</button>

</div>
                </td>
                                    </tr>
                            )
                        }
                         
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={this.checkOut} disabled={false}>CheckOut</button>
</div>
           
        );
    }

}

export default ListCropBuyerComponent;