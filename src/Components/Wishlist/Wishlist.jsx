import React, { useContext, useEffect, useState } from 'react'
// import styles from './FeaturedProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../Helpers/Loading/Loading';
import { DynamicStar } from 'react-dynamic-star';
import {Helmet} from "react-helmet";

export default function Wishlist() {

    const [allProducts,setAllProducts]=useState();

    
    let {headers,addToCart,userCart,baseUrl,handleBaseUrl,addToWishlist,removeFromWishlist,removeItem} =useContext(cartContext);
  
 
    function checkProductInCart(id){
      let status = userCart?.filter((item)=> item === id);
       if (status?.length>0){
        return true
       }else{
        return false
       }
    }
  
  
    async function addProduct(productId){
      let response = await addToCart(productId);
      if(response?.data.status === 'success'){
        toast.success(response.data.message,{
          duration:3000,
          position:'top-right',
          style:
          {background:'black',
          color:'white'}
        });
      }else{
        toast.error('Error',{duration:3000} )
      }
    }
  
    async function RemoveProduct(productId){
      let response = await removeItem(productId);
          if(response?.data.status === 'success'){
            // decrement();
            toast.success('Product removed from cart',{
              duration:3000,
              position:'top-right',
              style:
              {background:'black',
              color:'white'}
            });
          }else{
            toast.error('Error',{duration:3000} )
          }
    }

      async function getWishlistProducts(){
        let {data} = await axios.get(`${baseUrl}/api/v1/wishlist`,{
            headers
        }).catch((err)=> 
        {
          console.log('getWishlistProducts error',err.message,err);
          if (err.code === "ERR_NETWORK") {
            handleBaseUrl();
          }
      }
        );
        // console.log(data.data,"All Wishlis products");
        // console.log(data.data.length,"All Wishlis products length");
        setAllProducts(data.data);
        

        }
    function checkProductInWishlist(id){
      // console.log('wishlist',wishlist);
        // console.log(wishlist?.filter((item)=> item.id === id));
      // wishlist?.find((item)=> item._id === id)
      let status = allProducts?.filter((item)=> item.id === id);
       if (status?.length>0){
        return true
       }else{
        return false
       }
    }
  
    async function addProductToWishlist(productId){
      let response = await addToWishlist(productId);
      if(response?.data.status === 'success'){
        // setHeartIcon('fa-solid text-danger')
  
        toast.success(response.data.message,{
          duration:3000,
          position:'top-right',
          style:
          {background:'black',
          color:'white'}
        });
      }else{
        toast.error('Error',{duration:3000} )
      }
      // console.log(response);
    }
  
    async function removeProductFromWishlist(productId){
      let response = await removeFromWishlist(productId);
      if(response?.data.status === 'success'){
        // setHeartIcon('fa-solid text-danger')
  
        toast.success(response.data.message,{
          duration:3000,
          position:'top-right',
          style:
          {background:'black',
          color:'white'}
        });
      }else{
        toast.error('Error',{duration:3000} )
      }
      // console.log(response);
    }
    // getCart();
    useEffect(()=>{
        getWishlistProducts()
    })

  return (
    <>
                              <Helmet>
                <meta charSet="utf-8" />
                <title>Wishlist</title>
            </Helmet>
    <div className="container">
        <div className="row">
            <h2>Wishlist</h2>
               <div className="container py-4">
      <div className="row mb-5 justify-content-around">
       
      {allProducts?<>
        {allProducts?.length > 0 ? allProducts?.map((product)=>
                <div key={product.id} className="col-md-4  ">
                  <div className="product px-2 py-3 rounded ">
                    <Link to={'/product-details/'+ product.id}>
                      <figure className='position-relative rounded'>
                      <img src={product.imageCover} className='w-100  rounded ' alt={product.category.name} />
                      {product.priceAfterDiscount && product.priceAfterDiscount !== product.price? <span className="sale badge text-bg-danger position-absolute top-0 end-0 rounded">Sale</span>:""}
                      </figure>
                    

                    <p className='text-main  my-0 '>{product.category.name}</p>
                    </Link>
                    <div className="d-flex justify-content-between">
        {product.brand != null?<p className='text-primary fs-7'>{product.brand.name}</p>:<p className='text-primary fs-7'></p>}

                    {/* <p className='text-primary fs-7'>{product.brand.name}</p> */}
                    {checkProductInWishlist(product.id)? <i className={`fa-solid text-danger fa-heart pe-3 cursor-pointer`} onClick={(e)=>{ removeProductFromWishlist(product.id)}}></i>: <i className={`fa-regular fa-heart pe-3 cursor-pointer`} onClick={(e)=>{ addProductToWishlist(product.id)}}></i>}
                    </div>
                    <Link to={'/product-details/'+ product.id}>
                    {/* <p className='text-primary fs-7'>{product.brand.name}</p> */}
                    {product.priceAfterDiscount && product.priceAfterDiscount !== product.price?
                    <>
                      <p className='d-flex align-items-center fw-bold mb-0 me-2'>
                        <sup className='pt-2'>EGP</sup> 
                        <span className='fs-5 mx-0 px-0'>{product.priceAfterDiscount.toLocaleString()}</span> 
                        <sup className='pt-2'>00</sup> 
                      </p>
                      <p className='text-decoration-line-through text-muted d-flex align-items-center mb-2 p-0 me-2'>
                        <sup className='pt-2'>EGP</sup> 
                        <span className='fs-6 mx-0 px-0'>{product.price.toLocaleString()}</span>
                        <sup className='pt-2'>00</sup>
                      </p>
                    </>:  <p className='d-flex align-items-center fw-bold p-0 me-2  pb-3'>
                            <sup className='pt-2'>EGP</sup> 
                            <span className='fs-5 mx-0 px-0'>{product.price.toLocaleString()}</span>
                            <sup className='pt-2'>00</sup>
                          </p>}

                    <h3 className='h6 text-truncate'>{product.title}</h3>
                    <div className="d-flex justify-content-between align-items-center">
                      {/* <p>{product.price} EGP</p> */}
                      <div className='d-flex'>
                      {/* {product.ratingsAverage} */}
                      <span className='ms-2 mt-1 pt-0'> <DynamicStar  outlined={true} height={'30'} width={'15'} rating={product.ratingsAverage} /></span>
                      
                      {/* <i className='fa fa-star rating-color'></i> */}
                      <span className='ms-2 mt-0 pt-0'>{product.ratingsQuantity}</span>
                      </div>
                    </div>
                    </Link>
                    {checkProductInCart(product.id)  ? <button onClick={()=>RemoveProduct(product.id)} className='btn bg-danger text-white w-100'>Remove from cart</button>:<button onClick={()=>addProduct(product.id)} className='btn bg-main text-white w-100'>+ Add to cart</button>}

                    {/* <button onClick={()=>addProduct(product.id)} className='btn bg-main text-white w-100'>+ Add to cart</button> */}
                    
                  </div>

                 
                 
                </div>
        ): <p>There is no products in your wishlist</p>  }</>:<Loading></Loading>}
{/* <p>There is no products in your wishlist</p> */}
{/* <Loading></Loading>  */}
        </div>
    </div></div></div>
    </>
  )
}
