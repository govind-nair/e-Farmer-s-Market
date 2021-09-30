import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Registration from "./component/user/Registration";
import LoginUser from "./component/user/Form";
import Logout from "./component/user/Logout";
import EditUser from "./component/user/EditUserComponent";

import NewCrop from "./component/producer/NewCrops"
import ListCropProducerComponent from "./component/producer/ListCropProducerComponent";
import EditCropComponent from "./component/producer/EditCropComponent"

import ListCropBuyerComponent from "./component/buyer/ListCropBuyerComponent";
import CheckOut from "./component/order/CheckOut";

import ListOrdersComponent from "./component/buyer/ListOrdersComponent"

function App() {
  return (
      <div className="app" >
          <div className="headerImage">  <img className="img-fluid" 
     src={`${process.env.PUBLIC_URL}/assets/images/header2.jpg`}  
     alt="logo"/></div>
    
          <Router>

              <div className="App-header">
        
          <h2>E-FARMER'S MARKET</h2>
        </div>
                 
                  <Switch>
                  
                      <Route exact path="/" component={LoginUser} />
                      <Route path="/register" component={Registration} />
                      <Route path="/logout" component={Logout} />
                      <Route path="/edit-user" component={EditUser} />
                      <Route path="/orders" component={ListOrdersComponent} />
                      <Route path="/producer" component={ListCropProducerComponent} />
                      <Route path="/buyer" component={ListCropBuyerComponent} />
                      <Route path="/add-crops" component={NewCrop} />        
                      <Route path="/edit-crop" component={EditCropComponent} />
                      <Route path="/checkout" component={CheckOut} />
                  </Switch>
             
          </Router>
      </div>
  );
}



export default App;
