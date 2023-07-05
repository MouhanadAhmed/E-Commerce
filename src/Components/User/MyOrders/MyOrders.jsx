import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../../Context/CartContext'
import styles from './MyOrders.module.css'

export default function MyOrders() {
  const [orders,setOrders]=useState();
  const{baseUrl,handleBaseUrl,headers}=useContext(cartContext);
  let userId = localStorage.getItem('userId');

  async function getUserOrders(){
    let response = await axios.get(`${baseUrl}/api/v1/orders/user/${userId}`).catch((err)=> console.log(err));
    console.log(response);
    setOrders(response.data);
  }

  async function getLoggedUserDetails(){
    let mail=  localStorage.getItem("userMail");
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/users?email=${mail}`).catch((err)=>{
          console.log("err",err);
      });
      // console.log("User",data.users[0]);
      // setUserDetails(data.users[0]);
      localStorage.setItem('userId',data.users[0]._id)
  }

  useEffect(()=>{
    getLoggedUserDetails()
    getUserOrders()
  })
  return (
    <>
    <div className="container">
      <div className="row py-5  ps-3">
        <div className="h3 mb-5">My orders</div>
        <div  className="row text-center bg-prim text-white rounded pe-0 d-flex align-items-center" >
          <div className="col-1 px-0">
            <h6 className={styles.text}>index</h6>
          </div>
          <div className="col-1 px-0">
            <h6 className={styles.text}>id</h6>
          </div>
          <div className="col-4 px-0">
            <h6 className={styles.text}>Order Date</h6>
          </div>
          <div className="col-3 px-0">
            <h6  className={styles.text}>Payment Method</h6>
          </div>
          <div className="col-2 px-0">
            <h6 className={styles.text}>Sub total</h6>
          </div>
          <div className="col-1 px-0">
            <h6 className={styles.text}>items </h6>
          </div>
        </div>
        {orders?.map((order,index)=> <div key={index} className="row text-center border-bottom pe-0 d-flex align-items-center" >
          <div className="col-1 bg-main rounded text-white  px-0">
            <h6 className={styles.text}>{index+1}</h6>
          </div>
          <div className="col-1  px-0">
            <h6 className={styles.text}>{order.id}</h6>
          </div>
          <div className="col-4  px-0">
            <h6 className={`${styles.text} text-truncate`}>{order.createdAt}</h6>
          </div>
          <div className="col-3  px-0">
            <h6 className={styles.text}>{order.paymentMethodType}</h6>
          </div>
          <div className="col-2  px-0">
            <h6 className={styles.text}>{order.totalOrderPrice}</h6>
          </div>
          <div className="col-1  px-0">
            <h6 className={styles.text}>{order.cartItems.length+1}</h6>
          </div>
        </div> )}
      </div>
    </div>
    </>
  )
}
