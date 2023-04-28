import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import './ProductDetails.module.css'
import Loading from '../Loading/Loading';
import { DynamicStar } from 'react-dynamic-star';


export default function ProductDetails() {
  let {id} =useParams();
  const [productDetails,setProductDetails]=useState();


  async function getProductDetails(){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`).catch((err) => {
      console.log(err.response.data.message);
    } );
    // console.log(data.data);
    setProductDetails(data.data);
    }
  
  useEffect(() =>{
    getProductDetails();
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  return (
    <>
    {productDetails?    <div className="container py-5">
      <div aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item cursor-pointer">{productDetails?.category.name}</li>
          <li class="breadcrumb-item cursor-pointer ">{productDetails.subcategory[0].name}</li>
        </ol>
      </div>
      <div className="row align-items-center">
        <div className="col-md-4">
          <Slider {...settings}>
          {productDetails?.images?.map((img,index)=> <div key={index}><img className='w-100' src={img} alt=""/></div>)}
          </Slider>
          {/* <img className='w-100' src={productDetails.imageCover} alt="" /> */}
        </div>
        <div className="col-md-8">
          <h1>{productDetails.title}</h1>
          <p className='text-primary fs-7'>{productDetails.brand.name}</p>
          <p>{productDetails.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            {productDetails.priceAfterDiscount && productDetails.priceAfterDiscount !== productDetails.price?
              <div className='d-flex align-items-center justify-content-center flex-xl-column'>
                <p className='d-flex align-items-center fw-bold mb-0 me-2'>
                  <span className='text-danger me-2 fs-5'>-{ Math.ceil((productDetails.price -productDetails.priceAfterDiscount)/productDetails.price *100)}% </span>
                  <sup className='pt-2'>EGP</sup> 
                  <span className='fs-5 mx-0 px-0'>{productDetails.priceAfterDiscount.toLocaleString()}</span> 
                  <sup className='pt-2'>00</sup> 
                </p>
                <p className='text-muted d-flex align-items-center'>List Price :                <span className='text-decoration-line-through '>
                  EGP
                  <span className='fs-6 mx-0 px-0'>{productDetails.price.toLocaleString()}</span>
                  00
                </span></p>

              </div>: <p className='d-flex align-items-center fw-bold p-0 me-2  pb-3'>
                              <sup className='pt-2'>EGP</sup> 
                              <span className='fs-5 mx-0 px-0'>{productDetails.price.toLocaleString()}</span>
                              <sup className='pt-2'>00</sup>
                      </p>
            }

            <div className="d-flex justify-content-between align-items-center ">
              <div className='d-flex  mt-5'>
              <span className='ms-2 mt-1 pt-0'> <DynamicStar  outlined={true} width={'15'} rating={productDetails.ratingsAverage} /></span>
              <span className='ms-2 mt-0 pt-0'>{productDetails.ratingsQuantity}</span>
              </div>
            </div>
          </div>
          <button className='btn bg-main text-white w-100'>+ Add to cart</button>
        </div>
      </div>
    </div>:<Loading></Loading>}
    </>
  )
}
