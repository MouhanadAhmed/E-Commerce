import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../../Context/CartContext'

export default function MyOrders() {
  const [orders,setOrders]=useState();
  const{baseUrl,handleBaseUrl,headers}=useContext(cartContext);
  let userId = localStorage.getItem('userId');

  async function getUserOrders(){
    let response = await axios.get(`${baseUrl}/api/v1/orders/user/${userId}`).catch((err)=> console.log(err));
    console.log(response);
    setOrders(response.data);
  }

  useEffect(()=>{
    getUserOrders()
  })
  return (
    <>
    <div className="container">
      <div className="row py-5 px-2 ps-3">
        <div className="h3 mb-5">My orders</div>
        <div  className="row text-center bg-prim text-white rounded" >
          <div className="col-1">
            <h6>index</h6>
          </div>
          <div className="col-1">
            <h6>id</h6>
          </div>
          <div className="col-4">
            <h6>Order Date</h6>
          </div>
          <div className="col-3">
            <h6>Payment Method</h6>
          </div>
          <div className="col-2">
            <h6>Sub total</h6>
          </div>
          <div className="col-1">
            <h6>items </h6>
          </div>
        </div>
        {orders?.map((order,index)=> <div key={index} className="row text-center border-bottom" >
          <div className="col-1 bg-main rounded text-white">
            <h6>{index+1}</h6>
          </div>
          <div className="col-1">
            <h6>{order.id}</h6>
          </div>
          <div className="col-4">
            <h6>{order.createdAt}</h6>
          </div>
          <div className="col-3">
            <h6>{order.paymentMethodType}</h6>
          </div>
          <div className="col-2">
            <h6>{order.totalOrderPrice}</h6>
          </div>
          <div className="col-1">
            <h6>{order.cartItems.length+1}</h6>
          </div>
        </div> )}
      </div>
    </div>
    </>
  )
}
