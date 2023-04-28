import React from 'react'
import Slider from "react-slick";
export default function MainSlider() {



  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  
  return (
    <div className="container py-1  ">
    <Slider {...settings}>
    <div>
        <img style={{'height':'300px'}} src={require('../../Assets/Images/slider-image-1.jpeg')} className='w-100' alt="slider-1" />
      </div>
      <div>
      <img style={{'height':'300px'}} src={require('../../Assets/Images/slider-image-2.jpeg')} className='w-100' alt="slider-2" />
      </div>
      <div>
      <img style={{'height':'300px'}} src={require('../../Assets/Images/slider-image-3.jpeg')} className='w-100' alt="slider-3" />

      </div>
      <div>
      <img style={{'height':'300px'}} src={require('../../Assets/Images/grocery-banner.png')} className='w-100' alt="grocery-banner" />

      </div>
      <div>
      <img style={{'height':'300px'}} src={require('../../Assets/Images/grocery-banner-2.jpeg')} className='w-100' alt="grocery-banner-2" />
      </div>
      <div>
      <img style={{'height':'300px'}} src={require('../../Assets/Images/slider-2.jpeg')} className='w-100' alt="slider-2" />

      </div>
    </Slider>
    </div>
  )
}
