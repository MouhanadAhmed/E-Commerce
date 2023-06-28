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
        <img style={{'height':'600px'}} src={require('../../../Assets/Images/fashionable-model-stylish-hat-red-coat-boots-posing-white-wall-studio.jpg')} className='w-100 rounded-2' alt="slider-1" />
      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/high-fashion-portrait-young-elegant-blonde-woman-black-wool-hat-wearing-oversize-white-fringe-poncho-with-long-grey-dress.jpg')} className='w-100 rounded-2' alt="slider-2" />
      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/woman-model-business-suit-wearing-hat.jpg')} className='w-100 rounded-2' alt="slider-3" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/beautiful-men-fashion-wooden-background.jpg')} className='w-100 rounded-2' alt="grocery-banner" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/portrait-handsome-smiling-young-man-model-wearing-casual-summer-pink-clothes-fashion-stylish-man-posing-round-sunglasses.jpg')} className='w-100 rounded-2' alt="grocery-banner-2" />
      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/set-with-fashionable-women-s-clothing-jeans-sweater.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/portrait-handsome-fashion-stylish-hipster-businessman-model-dressed-elegant-brown-suit-sitting-near-dark.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/stylish-attractive-young-woman-casual-white-costume-blue-jacket-holding-luxury-purse.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/elegant-woman-black-hat-evening-dress-leather-jacket-posing-white.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/gorgeous-white-girl-with-long-wavy-hair-chilling-autumn-day-outdoor-portrait-interested-ginger-female-model-with-cup-coffee.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/full-length-view-wonderful-woman-dancing-turquoise-wall.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
      <div>
      <img style={{'height':'600px'}} src={require('../../../Assets/Images/pretty-red-head-woman-yellow-dress-posing-yellow-summer-mood.jpg')} className='w-100 rounded-2' alt="slider-2" />

      </div>
    </Slider>
    </div>
  )
}
