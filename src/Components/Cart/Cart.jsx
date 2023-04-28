import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'

import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../Loading/Loading';



export default function Cart() {

    let {getLoggedUserCart,removeItem,updateProductCount} = useContext(cartContext);

    const [cartDetails,setCartDetails] =useState(null);

    async function getCart(){
      let response = await getLoggedUserCart();
      if(response?.data?.status === 'success'){
        setCartDetails(response.data.data);

        console.log(response.data.data.products);
      }
    }
  
    async function deletItem(productId){
      let response = await removeItem(productId);
      console.log(response);
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
    },[])


  return (
    <>
    {cartDetails !== null?     <div className="bg-main-light p-4 ">
      <h3>Shop Cart: </h3>
      
    {cartDetails.products.map((product)=> <div key={product.product._id} className='row  align-items-center border-bottom py-2'>
      <div className="col-md-1">
        <img src={product.product.imageCover} className='w-100 rounded-2' alt={product.product.title} />
      </div>
      <div className="col-md-11 row px-2">
        <div className='col-md-10'>
        <h6 className='h6'>{product.product.title}</h6>
        <h6 className='text-main'>Price : {product.price}</h6>
        <button onClick={()=>deletItem(product.product._id)} className='btn m-0 p-0'><i className='fa-regular text-danger fa-trash-can' ></i> Remove</button>
        </div>
        <div className='text-center col-md-2'>
          <button onClick={()=>updateProductQty(product.product._id,product.count+1)} className='btn border-primary  btn-sm'>+</button>
          <span className='mx-2'>{product.count}</span>
          <button onClick={()=>updateProductQty(product.product._id,product.count-1)} className='btn border-warning  btn-sm'>-</button>

        </div>
      </div>
    </div>)}
    <h6 className='text-main py-3'>Total Cart Price: {cartDetails.totalCartPrice} EGP</h6>
    </div>:<Loading></Loading>}
 

 
    </>
  )
}
 