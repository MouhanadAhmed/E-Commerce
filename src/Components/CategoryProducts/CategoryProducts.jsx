import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { DynamicStar } from 'react-dynamic-star';

export default function CategoryProducts() {
    let {id} =useParams();
    const [allCategoryProducts,setAllCategoryProducts]=useState();

    let {addToCart} =useContext(cartContext);

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
        console.log(response);
      }

    async function getCategoryProducts(id){
     let {data} =    await axios.get(`https://route-ecommerce.onrender.com/api/v1/products?category[in][]=${id}`);
     setAllCategoryProducts(data.data);
     console.log(data);
    }
    useEffect(()=>{
        getCategoryProducts(id);
    },[id])
  return (
    <>
 {allCategoryProducts?    <div className="container py-4">
      <div className="row">
        {allCategoryProducts.length !== 0?<> {allCategoryProducts.map((product)=>
                <div key={product._id} className="col-md-3 ">
                  <div className="product px-2 py-3 rounded">
                    <Link to={'/product-details/'+ product.id}>
                      <figure className='position-relative rounded'>
                      <img src={product.imageCover} className='w-100  rounded ' alt={product.category.name} />
                      {product.priceAfterDiscount && product.priceAfterDiscount !== product.price? <span className="sale badge text-bg-danger position-absolute top-0 end-0 rounded">Sale</span>:""}
                      </figure>


                    <p className='text-main  my-0 '>{product.category.name}</p>
                    <p className='text-primary fs-7'>{product.brand.name}</p>
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
                      <span className='ms-2 mt-1 pt-0'> <DynamicStar  outlined={true} width={'15'} rating={product.ratingsAverage} /></span>
                      
                      {/* <i className='fa fa-star rating-color'></i> */}
                      <span className='ms-2 mt-0 pt-0'>{product.ratingsQuantity}</span>
                      </div>
                    </div>
                    </Link>

                    <button onClick={()=>addProduct(product.id)} className='btn bg-main text-white w-100'>+ Add to cart</button>
                  </div>

                 
                 
                </div>
        )}</>:<h2>No products </h2>}
        
      </div>
    </div>:<Loading></Loading> }
    </>
  )
}
