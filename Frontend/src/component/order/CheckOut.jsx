import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class CheckOut extends Component {

    constructor(props) {
        super(props)
        this.state = {
            crops: [],
            message: null
        }
        this.reloadCropList = this.reloadCropList.bind(this);
        this.placeOrder=this.placeOrder.bind(this);
        this.logout=this.logout.bind(this);
    }

    componentDidMount() {
        this.reloadCropList();
    }

    reloadCropList() {
    var data=[]
        data=JSON.parse ( sessionStorage.getItem("data"));
    //    this.setState({crops:data});
    //    console.log("reload crop list"+this.state.crops);
            data.map(function(crop) {

               return console.log(crop.total)
            })
            this.setState({crops:data})
    }

   placeOrder(){
       var data={total:sessionStorage.getItem("amount"),buyerId:sessionStorage.getItem("userId")};
       var orderId;
       console.log(data)
    ApiService.addOrder(data)
    .then((resp) => {
        orderId=resp.data.id;
        sessionStorage.setItem("orderId",orderId);
      this.props.history.push("/logout");
    });
   }
   logout = (e) => {
    e.preventDefault();
   sessionStorage.clear();
            this.props.history.push('/');
       
}


    render() {
        return (
            <div className="image" style={{height: '800px'}}>
                  <div className="App-header3" height='100px'>
                <button className="btn btn-success" style={{width:'100px',margin:'20px'}} onClick={this.logout}>Logout</button>
                    </div>
                <h2 className="text-center">Order Details</h2>
              
                <table className="table ">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th style={{textAlign:" center"}}>CropName</th>
                            <th style={{textAlign:" center"}}>Quantity (Kgs)</th>
                            <th style={{textAlign:" center"}}> Price</th>                                                       
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.crops.map(
                        crop =>
                                    <tr key={crop.id}>
                                        <td style={{textAlign:" center"}}>{crop.name}</td>
                                        <td style={{textAlign:" center"}}>{crop.quantity}</td>
                                        <td style={{textAlign:" center"}}>{crop.total}</td>
                                    </tr>
                            )
                        }
                          
                           
                        
                       
                    </tbody>
                </table>
                <div style={{textAlign:" center",alignItems:'center',fontSize:20,color:'black',fontWeight:'bold'}}>Total Amount {sessionStorage.getItem("amount")} </div>
                            
                <button className="btn btn-success" onClick={this.placeOrder} style={{marginTop:'30px'}}>Place Order</button>
            </div>
        );
    }

}

export default CheckOut;