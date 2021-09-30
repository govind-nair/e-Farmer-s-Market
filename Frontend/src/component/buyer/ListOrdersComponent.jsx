import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListOrdersComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            message: null
        }

        this.reloadCropList = this.reloadCropList.bind(this);
        this.showCart=this.showCart.bind(this);
        this.logout= this.logout.bind(this);
    }

    componentDidMount() {
        this.reloadCropList();
    }
    
    reloadCropList() {
        ApiService.orderHistory(sessionStorage.getItem('userId'))
            .then((resp) => {
                this.setState({orders: resp.data})
                console.log(this.state.orders);
            });
        
    }

 showCart(){
     this.props.history.push('/buyer');
 }

    logout = (e) => {
        e.preventDefault();
       sessionStorage.clear();
                this.props.history.push('/');
           
    }
    render() {
        return (
            <div className="image" style={{height: '1000px'}}>
            <div className="App-header2">
                <h2 className="text-center">Crop Details</h2>
                <div style={{display:" inline-block"}} align="center" >
               
                <button className="btn btn-danger" style={{width:'100px',margin:'20px'}} onClick={() => this.showCart()}> Show Cart</button>
                <button className="btn btn-success" style={{width:'100px',margin:'20px'}} onClick={this.logout}>Logout</button>
           </div>
                </div>
              
              
                <table className="table">
                    <thead>
                        <tr>
                            <th className="hidden" style={{textAlign:" center"}}>Id</th>
                            <th style={{textAlign:" center"}}> Order Id</th>
                            <th style={{textAlign:" center"}}>Amount</th>
                            <th style={{textAlign:" center"}}>Order Date</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(
                       order =>
                                    <tr key={order.id}>
                                        <td style={{textAlign:" center"}}>{order.id}</td>
                                        <td style={{textAlign:" center"}}>{order.orderAmount}</td>
                                        <td style={{textAlign:" center"}}>{order.orderDate}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
</div>
            
        );
    }

}

export default ListOrdersComponent;