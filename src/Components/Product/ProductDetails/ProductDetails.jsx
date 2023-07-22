import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetails.module.css'
import Loading from '../../Helpers/Loading/Loading';
import { DynamicStar } from 'react-dynamic-star';
import { cartContext } from '../../../Context/CartContext';
import { toast  } from 'react-hot-toast';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactImageMagnify from "react-image-magnify";
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import {Helmet} from "react-helmet";

export default function ProductDetails() {
  let {id} =useParams();
  const [productDetails,setProductDetails]=useState();
  const {addToCart,removeItem,userCart,userWishlist,baseUrl,handleBaseUrl,addToWishlist,removeFromWishlist} =useContext(cartContext);
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const [showBtnText,setShowBtnText]=useState('Show More');


  const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
  const marks = [
    {
      value: 0,
      label: 'Poor',
    },
    {
      value: 100,
      label:'Perfect',
    },
  ];



  async function getProductDetails(){
    let {data} = await axios.get(`${baseUrl}/api/v1/products/${id}`).catch((err) => {
      console.log('getProductDetails error',err.message);
      if (err.code === "ERR_NETWORK") {
        handleBaseUrl();
      }
    } );
    setProductDetails(data.data);

    }

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

  function magnifyImages(props){
    // console.log(props);
    const rimProps={'isHintEnabled': true,
      'shouldHideHintAfterFirstActivation': false,
      'enlargedImagePosition': 'over'}
    return <ReactImageMagnify
    {...{
      smallImage: {
        isFluidWidth: true,
        src: props.original
      },
      largeImage: {
        src: props.original,
        width: 1426,
        height: 2000
      },

      lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
    }}
    {...rimProps}
  />
  }

  function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#B7BAC9' : '#B7BAC9',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 15,
      width: 15,
      backgroundColor: '#02021D',
     
      boxShadow: iOSBoxShadow,
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
      '&.Mui-disabled':{
        backgroundColor: '#02021D',
        color: '#02021D',
      }
    },
    '& .MuiSlider-valueLabel': {
       display:'none',
      fontSize: 12,
      fontWeight: 'normal',
      top: -6,
      backgroundColor: 'unset',
      color:'#02021D',
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
      color:'#02021D',
    },
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#B7BAC9',
      color:'#02021D',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#B7BAC9',
      height: 30,
      width: 2,
      color:'#02021D',
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
      '&.MuiSlider-markLabel': {
        fontWeight: 'bold',
        fontSize: 50,
      },
    },
  }));
  
  function toggleShowBtn(){
    if(showBtnText === 'Show More'){
      setShowBtnText('Show Less')
    }else if(showBtnText === 'Show Less'){
      setShowBtnText('Show More')

    }
  }
  
  function checkProductInWishlist(id){
    // console.log('wishlist',wishlist);
    //   console.log(wishlist?.filter((item)=> item.id === id));
    // wishlist?.find((item)=> item._id === id)
    let status = userWishlist?.filter((item)=> item === id);
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
      // getFeaturedProducts();
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
      // getFeaturedProducts();
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

  const images = productDetails?.images?.map((img)=>{
    return {
        
      original: img,
      originalClass :"h-100",
      thumbnail: img,
      thumbnailClass :"object-fit-fill m-0 bg-white",
    }
  })

  useEffect(() =>{
    getProductDetails();
  },[])


 


  return (
    <>
                                  <Helmet>
                <meta charSet="utf-8" />
                <title>Product details</title>
            </Helmet>
    {productDetails?   <> <div className="container py-5 px-5">
    
      <div className="row  flex-column flex-lg-row mb-5">
        <div className="col-lg-7 position-relative">
        {/* <ImageGallery items={images} renderItem={(e)=> magnifyImages(e)} thumbnailPosition={"left"} showPlayButton={false} showBullets={false} showNav={false} autoPlay={true} showFullscreenButton={false} slideOnThumbnailOver={true} /> */}
       {isMobile || productDetails.images.length>5 ? <ImageGallery items={images} renderItem={(e)=> magnifyImages(e)} thumbnailPosition={"left"} showPlayButton={true} showBullets={false} showNav={false} autoPlay={false} showFullscreenButton={false} slideOnThumbnailOver={true} />: <div className="row">
          {productDetails?.images?.map((img , index)=> <div key={index} className="col-md-6 py-0 mb-4">
            
            <img   className='w-100 py-0' src={img} alt=""/>
            
            </div>)}

          </div> }
        
        {/* <div id="myPortal" className=' bg-white w-100 d-flex justify-content-end '/> */}

          {/* <Slider {...settings}>
          {productDetails?.images?.map((img)=> <div key={productDetails.id}><img className='w-100' src={img} alt=""/></div>)}
          </Slider> */}
          {/* <img className='w-100' src={productDetails.imageCover} alt="" /> */}
        </div>


        <div className="col-lg-5 pt-5  ">
          <div className="d-flex justify-content-center align-items-top">
            <div className="w-75">
          <h4 className='pt-3'>{productDetails.title}</h4>
          <div className="d-flex justify-content-between align-items-center ">
              <div className='d-flex  '>
              <span className='ms-2 mt-1 pt-0'> <DynamicStar fullStarColor={'black'}  outlined={true} width={'15'} height={'15'} rating={productDetails.ratingsAverage} /></span>
              <span className='ms-2 mt-0 pt-0'>{productDetails.ratingsAverage} ({productDetails.ratingsQuantity})</span>
              </div>
            </div>
            </div>
            <div className="w-25 pt-3 ">
            {productDetails.priceAfterDiscount && productDetails.priceAfterDiscount !== productDetails.price?
              <div className='d-flex  justify-content-end flex-column '>
                <p className='d-flex align-items-center fw-bold mb-0 h6 ms-auto'>
                  <span className='badge text-bg-danger  '>- { Math.ceil((productDetails.price -productDetails.priceAfterDiscount)/productDetails.price *100)}% </span>
                  <sup className='pt-2'>EGP</sup> 
                  <span className='fs-5 mx-0 px-0'>{productDetails.priceAfterDiscount.toLocaleString()}</span> 
                  {/* <sup className='pt-2'>00</sup>  */}
                </p>
                <p className='text-muted d-flex justify-content-end align-items-center ms-auto'>                <span className='text-decoration-line-through '>
                  EGP
                  <span className='fs-6 mx-0 px-0'>{productDetails.price.toLocaleString()}</span>
                  00
                </span></p>

              </div>: <p className='d-flex align-items-center fw-bold p-0 me-2 justify-content-end  pb-3'>
                              <sup className='pt-2'>EGP</sup> 
                              <span className='fs-5 mx-0 px-0'>{productDetails.price.toLocaleString()}</span>
                              <sup className='pt-2'>00</sup>
                      </p>
            }
            </div>
          </div>
          {/* <p className='text-primary fs-7'>{productDetails.brand.name}</p> */}
          <div className="d-flex justify-content-between">
          <p className='text-primary fs-7'>{productDetails.brand.name}</p>
                    {checkProductInWishlist(productDetails.id)? <i className={`fa-solid text-danger fa-heart pe-3 cursor-pointer`} onClick={()=>{ removeProductFromWishlist(productDetails.id)}}></i>: <i className={`fa-regular fa-heart pe-3 cursor-pointer`} onClick={()=>{ addProductToWishlist(productDetails.id)}}></i>}
                    </div>
          <p>{productDetails.description}</p>
          <div className="d-flex justify-content-between align-items-center">


           
          </div>
          {/* <button  onClick={()=>{ addProduct(productDetails.id);}} 
          className={`btn ${backgroundColor} text-white mb-5 w-100 rounded-pill`}>{buttonText}</button> */}
          {checkProductInCart(productDetails.id)  ? <button onClick={()=>RemoveProduct(productDetails.id)} className='btn bg-danger rounded-pill mb-3 text-white w-100'>Remove from cart</button>:<button onClick={()=>addProduct(productDetails.id)} className='btn bg-main rounded-pill mb-3  text-white w-100'>+ Add to cart</button>}
          
          <p className='h6 mb-5'>Free shipping on orders over $30 & free returns in the US</p>

          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header border-top border-muted">
                <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Key features and benefits
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>Key features and benefits</code> . This is the first item's accordion body.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Comfort and fit
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>Comfort and fit</code> . This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Materials and card
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>Materials and card</code> . This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header border-bottom border-muted">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  Free shipping and returns
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Free shipping on orders over $30 & free returns in the US</div>
              </div>
            </div>
        </div>
          {/* <div className="alert alert-success text-center successMsg mt-1">
            Product Added Successfuly...
          </div> */}
          {}
          {/* <Alert id="suc"></Alert> */}
        </div>
      </div>

          <h2 className='text-center h1 mb-5 fw-bold '>Ratings ans Reviews</h2>
          <p className='text-center fw-semibold'>An overwhelming 94% of reviewers have endorsed this product, <br/>
            recommending it wholeheartedly to their friends and family.</p>
            <div className="row  ">
              <div className="col-md-4 d-flex justify-content-center flex-column align-items-start mb-5">
                <h2 className='h1 fw-bold mb-3 ps-5'>{productDetails.ratingsAverage}</h2>
              <div className=' mt-1 pt-0 ps-3'> <DynamicStar fullStarColor={'black'}  outlined={true} width={'20'} height={'20'} rating={productDetails.ratingsAverage} /> </div>  
              <p><span>Based on {productDetails.ratingsQuantity} reviews</span> </p>  
              </div>
              <div className="col-md-8 mb-5">
              <Box sx={{ width: '100%' }} >
                  <Typography className='text-black' gutterBottom>Fit</Typography>
                  <IOSSlider
                    aria-label="ios slider"
                    defaultValue={80}
                    marks={marks}
                    valueLabelDisplay="on"
                    disabled
                    className='text-black fw-bold'
                  />
                </Box>
              </div>
              <div className="d-flex justify-content-between align-items-center border-top px-0 py-5">
              <p className='h5 '>{productDetails.ratingsQuantity} reviews</p>
              <div className="w-50 d-flex align-items-center justify-content-end">
                <h6 className='pt-0 pe-2 h5 fw-semibold'>Sort</h6>
                <select className="form-select w-auto  border-0 h6" aria-label="Default select example">
                <option className='h6' value='0'>Highest Rating</option>
                <option value="1">Lowest Rating</option>
                <option value="2">Newest Rating</option>
                {/* <option value="3">Three</option> */}
              </select>
                </div>  
 
              </div>
              <hr />
              <div className="col-lg-3 border rounded bg-light p-3 mb-3">
                <p className='fw-bold mb-4 h5'>Alicia <span className='ms-5 h6 text-muted'> Verified purchase <i className="fa-solid fa-circle-check fa-xl"></i> </span> </p>
                <p className='fw-semibold'>Reviewing </p>
                <p className='mb-4'>{productDetails.title}</p>
                <p><i className="fa-regular fa-thumbs-up me-2 fa-xl"></i> I recommend this product </p>
              </div>
              <div className="col-lg-9 ps-3">
              <div className='mb-3 mt-1 pt-0 d-flex '> <DynamicStar fullStarColor={'black'}  outlined={true} width={'20'} height={'20'} rating={4.5} /> <span className='ms-auto text-muted'> 3 months ago</span> </div>
              <h5>Comfy Yet Sturdy</h5>
              <p className='mb-5'>These shoes are my go-to for comfort and durability as a busy teacher and devoted mom of two young children. I wear them to work nearly every day and they still hold up incredibly well, earning a glowing 5-star review despite a stubborn coffee stain.</p>
              <p className='text-muted mb-0 pt-3'>  was this helpful? <i className="fa-solid fa-thumbs-up me-1"></i>3 <i className="fa-regular fa-thumbs-down fa-flip-horizontal me-1"></i>2</p>
              </div>
              <hr className='mt-3' />

              
              <div className="col-lg-3 border rounded bg-light p-3 mb-3">
                <p className='fw-bold mb-4 h5'>Hardik <span className='ms-5 h6 text-muted'> Verified purchase <i className="fa-solid fa-circle-check fa-xl"></i> </span> </p>
                <p className='fw-semibold'>Reviewing </p>
                <p className='mb-4'>{productDetails.title}</p>
                <p><i className="fa-regular fa-thumbs-up me-2 fa-xl"></i> I recommend this product </p>
              </div>
              <div className="col-lg-9 ps-3">
              <div className='mb-3 mt-1 pt-0 d-flex '> <DynamicStar fullStarColor={'black'}  outlined={true} width={'20'} height={'20'} rating={4} /> <span className='ms-auto text-muted'> 4 months ago</span> </div>
              <h5>Love From India</h5>
              <p className='mb-5'>I opted for the Gray color and I am absolutely in love with it! This amazing brand and its supportive community have exceeded my expectations. It is no surprise that this review has been helpful to 3 people who voted 'yes' - I highly recommend giving this product a try!</p>
              <p className='text-muted mb-0 pt-3'>  was this helpful? <i className="fa-solid fa-thumbs-up me-1"></i>10 <i className="fa-regular fa-thumbs-down fa-flip-horizontal me-1"></i>2</p>
              </div>
              <hr className='mt-3' />
                            
              <div className="col-lg-3 border rounded bg-light p-3  mb-3">
                <p className='fw-bold mb-4 h5'>Hardik <span className='ms-5 h6 text-muted'> Verified purchase <i className="fa-solid fa-circle-check fa-xl"></i> </span> </p>
                <p className='fw-semibold'>Reviewing </p>
                <p className='mb-4'>{productDetails.title}</p>
                <p><i className="fa-regular fa-thumbs-up me-2 fa-xl"></i> I recommend this product </p>
              </div>
              <div className="col-lg-9 ps-3">
              <div className='mb-3 mt-1 pt-0 d-flex '> <DynamicStar fullStarColor={'black'}  outlined={true} width={'20'} height={'20'} rating={5} /> <span className='ms-auto text-muted'> 4 months ago</span> </div>
              <h5>Love From India</h5>
              <p className='mb-5'>I opted for the Gray color and I am absolutely in love with it! This amazing brand and its supportive community have exceeded my expectations. It is no surprise that this review has been helpful to 3 people who voted 'yes' - I highly recommend giving this product a try!</p>
              <p className='text-muted mb-0 pt-3'>  was this helpful? <i className="fa-solid fa-thumbs-up me-1"></i>10 <i className="fa-regular fa-thumbs-down fa-flip-horizontal me-1"></i>2</p>
              </div>
              <hr className='mt-3' />
                            
              <div className="col-lg-3 border rounded bg-light p-3  mb-3">
                <p className='fw-bold mb-4 h5'>Hardik <span className='ms-5 h6 text-muted'> Verified purchase <i className="fa-solid fa-circle-check fa-xl"></i> </span> </p>
                <p className='fw-semibold'>Reviewing </p>
                <p className='mb-4'>{productDetails.title}</p>
                <p><i className="fa-regular fa-thumbs-up me-2 fa-xl"></i> I recommend this product </p>
              </div>
              <div className="col-lg-9 ps-3">
              <div className='mb-3 mt-1 pt-0 d-flex '> <DynamicStar fullStarColor={'black'}  outlined={true} width={'20'} height={'20'} rating={5} /> <span className='ms-auto text-muted'> 4 months ago</span> </div>
              <h5>Love From India</h5>
              <p className='mb-5'>I opted for the Gray color and I am absolutely in love with it! This amazing brand and its supportive community have exceeded my expectations. It is no surprise that this review has been helpful to 3 people who voted 'yes' - I highly recommend giving this product a try!</p>
              <p className='text-muted mb-0 pt-3'>  was this helpful? <i className="fa-solid fa-thumbs-up me-1"></i>10 <i className="fa-regular fa-thumbs-down fa-flip-horizontal me-1"></i>2</p>
              </div>
              <hr className='mt-3' />



              <div className="accordion" id="accordionExample5">
              <div className="accordion-item border-0">

                <div id="collapseMore" className="accordion-collapse collapse  " data-bs-parent="#accordionExample5">
                  <div className="accordion-body row px-0">
                  <div className="col-lg-3 border rounded bg-light p-3  mb-3">
                <p className='fw-bold mb-4 h5'>Hardik <span className='ms-5 h6 text-muted'> Verified purchase <i className="fa-solid fa-circle-check fa-xl"></i> </span> </p>
                <p className='fw-semibold'>Reviewing </p>
                <p className='mb-4'>{productDetails.title}</p>
                <p><i className="fa-regular fa-thumbs-up me-2 fa-xl"></i> I recommend this product </p>
              </div>
              <div className="col-lg-9 ps-3 ">
              <div className='mb-3 mt-1 pt-0 d-flex '> <DynamicStar fullStarColor={'black'}  outlined={true} width={'20'} height={'20'} rating={5} /> <span className='ms-auto text-muted'> 4 months ago</span> </div>
              <h5>Love From India</h5>
              <p className='mb-5'>I opted for the Gray color and I am absolutely in love with it! This amazing brand and its supportive community have exceeded my expectations. It is no surprise that this review has been helpful to 3 people who voted 'yes' - I highly recommend giving this product a try!</p>
              <p className='text-muted mb-0 pt-3'>  was this helpful? <i className="fa-solid fa-thumbs-up me-1"></i>10 <i className="fa-regular fa-thumbs-down fa-flip-horizontal me-1"></i>2</p>
              </div>
              <hr className='mt-3' />
                  </div>
                </div>

                <h2 className="accordion-header">
                  <button id='showMoreBtn' className="accordion-button w-auto rounded-pill mx-auto bg-prim collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMore" aria-expanded="false" aria-controls="collapseMore" onClick={() =>{toggleShowBtn()}}>
                <span className=' me-2'>{showBtnText} </span>  
                  </button>
                </h2>
              </div></div>
              {/* <button className='w-25 rounded-pill mx-auto bg-prim'> Show more</button> */}
            </div>
    </div>


   
          

     </> :<Loading></Loading>}
    </>
  )
}
