import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../../Context/CartContext'
import styles from './MyOrders.module.css'
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
import ContentLoading from '../../Helpers/ContentLoading/ContentLoading';

export default function MyOrders() {
  const [orders,setOrders]=useState();
  const{baseUrl}=useContext(cartContext);
  // const [cartDetails,setCartDetails] =useState();
  let userId = localStorage.getItem('userId');

  async function getUserOrders(){
    let response = await axios.get(`${baseUrl}/api/v1/orders/user/${userId}`).catch((err)=> console.log(err));
    // console.log(response);
    setOrders(response.data);
  }

  async function getLoggedUserDetails(){
    let mail=  localStorage.getItem("userMail");
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/users?email=${mail}`).catch((err)=>{
          console.log("err",err);
      });
      // console.log("User",data.users[0]);
      // setUserDetails(data.users[0]);
      // setCartDetails(data);
      // console.log(data);
      localStorage.setItem('userId',data.users[0]._id);
      // console.log(cartDetails?cartDetails:"not loaded");
  }

  useEffect(()=>{
    getLoggedUserDetails()
    getUserOrders()
  },[])
  return (
    <>
                                  <Helmet>
                <meta charSet="utf-8" />
                <title>Orders</title>
            </Helmet>
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
          {/* <div className="col-4 px-0">
            <h6 className={styles.text}>Order Date</h6>
          </div> */}
          <div className="col-3 px-0">
            <h6  className={styles.text}>Payment Method</h6>
          </div>
          <div className="col-2 px-0">
            <h6 className={styles.text}>Sub total</h6>
          </div>
          <div className="col-1 px-0">
            <h6 className={styles.text}>items </h6>
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
          {/* <div className="col-4  px-0">
            <h6 className={`${styles.text} text-truncate`}>{order.createdAt}</h6>
          </div> */}
          <div className="col-3  px-0">
            <h6 className={styles.text}>{order.paymentMethodType}</h6>
          </div>
          <div className="col-2  px-0">
            <h6 className={styles.text}>{order.totalOrderPrice}</h6>
          </div>
          <div className="col-1  px-0">
            <h6 className={styles.text}>{order.cartItems.length}</h6>
          </div>
          <div className="col-1 px-0">
          <i className="fa-solid fa-eye cursor-pointer" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}></i>
          </div>
          {/* <!-- Modal --> */}
            <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Order No: {order.id}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body container">
                  {orders? orders[index]?.cartItems?.map((product,index)=> <div key={index} className='row  align-items-center border-bottom py-2'>
    
    <div className="col-2">
    <Link key={product.product._id} to={`/product-details/${product.product._id}`}>
      <img src={product.product.imageCover} className='w-100  rounded-2' alt={product.product.title} />
      </Link></div>
    <div className="col-10  row px-2">
      <div className='col-10  pt-2'>
      <Link key={product.product._id} to={`/product-details/${product.product._id}`}>
      <h6 className='h6  fw-bold'>{product.product.title}</h6>
      <h6 className='mb-3  text-muted'>{product.product.brand.name}</h6> </Link>
      <div className="d-flex justify-content-start align-items-center mb-3">

      </div>
       </div>
       
      <div className='text-center col-2 pt-2'>
      <Link key={product.product._id} to={`/product-details/${product.product._id}`}>
      <h6 className='fw-bold'>EGP {product.price.toLocaleString()}</h6>

      </Link>
      </div>
    </div>
    
    </div>
     ) : <ContentLoading></ContentLoading>}
    <h6 className='h3 ps-3 py-3 fw-bold'>Subtotal: {orders[index].totalOrderPrice.toLocaleString()} EGP</h6>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn bg-prim" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        </div> )}
      </div>
    </div>
    </>
  )
}
