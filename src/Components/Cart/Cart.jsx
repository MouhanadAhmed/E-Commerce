import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'

import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../Helpers/Loading/Loading';
import { Link } from 'react-router-dom';



export default function Cart() {

    let {getLoggedUserCart,removeItem,updateProductCount,setCounter,decrement} = useContext(cartContext);

    const [cartDetails,setCartDetails] =useState(null);

    async function getCart(){
      let response = await getLoggedUserCart();
      localStorage.setItem('cartId',response.data.data._id);
      if(response?.data?.status === 'success'){
        setCartDetails(response.data.data);
        setCounter(response.data.data.products.length)
        console.log(response.data.data.products);
      }
    }
  
    async function deletItem(productId){
      let response = await removeItem(productId);
      console.log(response);
      decrement();
      setCartDetails(response.data.data);
      toast.success("Product Successfuly removed",{
        duration:3000,
        position:'top-right',
        style:
        {background:'black',
        color:'white'}
      })
    }

    async function updateProductQty(productId, count){
      let response = await updateProductCount(productId,count);
      console.log(response);
      setCartDetails(response.data.data);
      toast.success("Product count updated Successfuly ",{
        duration:3000,
        position:'top-right',
        style:
        {background:'black',
        color:'white'}
      })
    }

     useEffect(()=>{
      getCart();
    },[getCart])


  return (
    <>
    {cartDetails !== null?     <div className="container  p-4 ">
      <h3>Cart </h3>
      
    {cartDetails.products.map((product)=> <> <div className='row  align-items-center border-bottom py-2'>
    
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
        <div className={`${styles.counter} rounded-pill py-0 border me-3`}>
        <button onClick={()=>updateProductQty(product.product._id,product.count-1)} className='btn rounded-0 fw-bold border-0 btn-sm'><i className="fa-solid fa-minus"></i></button>
          <span className='mx-2 fw-bold'>{product.count}</span>
          <button onClick={()=>updateProductQty(product.product._id,product.count+1)} className='btn rounded-0 fw-bold border-0  btn-sm'><i className="fa-solid fa-plus"></i></button>
        
        </div>


        <button onClick={()=>deletItem(product.product._id)} className={`${styles.removeBtn} btn  p-2 px-3 rounded-circle border`}><i className='fa-regular  fa-trash-can' ></i> </button>
       

        </div>
         </div>
         
        <div className='text-center col-2 pt-2'>
        <Link key={product.product._id} to={`/product-details/${product.product._id}`}>
        <h6 className='fw-bold'>EGP {product.price.toLocaleString()}</h6>

        </Link>
        </div>
      </div>
      
      </div>
      </> )}
    
      <div className="row w-100 d-flex justify-content-between align-items-center py-2">
        <div className="col-md-8 ">
        <h6 className='h3 ps-3 py-3 fw-bold'>Subtotal: {cartDetails.totalCartPrice.toLocaleString()} EGP</h6> 

        </div>
        <div className="col-md-3 ">
       <Link to={'/checkout'} ><button className=' bg-prim rounded-pill ms-5 '>Proceed to Checkout</button></Link> 

        </div>
     

      </div>

    </div>:<Loading></Loading>}
 

 
    </>
  )
}
 