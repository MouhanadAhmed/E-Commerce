import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Categories() {
  
  const [categories,setCategories]=useState([]);
  async function getCategories(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories').catch((err) => {
      console.log(err.response.data.message);
    } );
    console.log("Categories",data.data);
    setCategories(data.data)
    }
  
  useEffect(() =>{
    getCategories();
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
                          <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
            </Helmet>
    <div className="container py-3 rounded">
    <Slider {...settings}>
        {categories.map((category)=> <div key={category._id}>
            <Link to={`/categoryproducts/${category._id}`}>
            <img height={200} width={'100%'} className='' src={category.image} alt="" />
          <h3 className='h6 text-center fw-bold pt-2 text-dark'>{category.name}</h3>
            </Link>
          </div>)}
    </Slider>
    </div>

    </>
  )
}
