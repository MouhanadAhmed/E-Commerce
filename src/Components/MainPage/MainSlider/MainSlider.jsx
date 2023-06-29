import React from 'react'
import Slider from "react-slick";
export default function MainSlider() {



  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  
  return (
    <div className="container px-0 mx-auto py-1 mb-5 ">
    <Slider {...settings} className='w-100'>
    <div>
        <img style={{'height':'600px'}} src={require('../../../Assets/Images/fashionable-model.jpg')} className='w-100 rounded-2' alt="slider-1" />
      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/high-fashion.jpg')} className='w-100 rounded-2' alt="slider-2" />
      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/woman-model.jpg')} className='w-100 rounded-2' alt="slider-3" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/beautiful-men.jpg')} className='w-100 rounded-2' alt="grocery-banner" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/portrait-handsome.jpg')} className='w-100 rounded-2' alt="grocery-banner-2" />
      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/portrait-handsome-sm.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/wonderful-womanl.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/stylish-attractive.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/elegant-woman.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/fashionable-model.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/high-fashion.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/pretty-red.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
    </Slider>
    </div>
  )
}
