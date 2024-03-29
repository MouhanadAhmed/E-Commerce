import React, { useContext, useEffect, useState } from 'react'
// import styles from './FeaturedProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { cartContext } from '../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../../Helpers/Loading/Loading';
import { DynamicStar } from 'react-dynamic-star';
import ProductGridLoading from '../../Helpers/ProductGridLoading/ProductGridLoading';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function SalesProducts(args) {

  let {addToCart,baseUrl,handleBaseUrl,userWishlist,addToWishlist,removeFromWishlist,userCart,removeItem,getLoggedUserCart,getLoggedUserWishlist} =useContext(cartContext);

  const [allProducts,setAllProducts]=useState([]);
  // const [cartDetails,setCartDetails] =useState(null);
  // const [wishlist,setWishlist] =useState(null);
  const [fetchingData,setFetchingData]=useState(true);



  async function getCart(){
    let response = await getLoggedUserCart();
    if(response?.data?.status === 'success'){

    }
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
      if (!localStorage.getItem('userToken'))  toast.error('Please login first',{duration:3000} )
      else toast.error('addProduct Error',{duration:3000} )
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

  async function getFeaturedProducts(){
  let {data} = await axios.get(`${baseUrl}/api/v1/products`).catch((err)=> 
  {
    // console.log('getFeaturedProducts error',err.message,err);
    if (err.code === "ERR_NETWORK") {
      handleBaseUrl();
    }
}
  );
  // console.log(data.data,"All products");
  setAllProducts(data.data);
  setFetchingData(false);
  // getSalesProducts();
  const newArr = data.data?.filter((product)=>{
    return product.priceAfterDiscount && product.priceAfterDiscount !== product.price
})
// console.log(newArr,"Sales Products");
// console.log(newArr,"newArrnewArrnewArr`");
setAllProducts(newArr);

// console.log(args,"args");
// console.log("args length",Object.keys(args).length);
 if(Object.keys(args).length !== 0){
  const newArr2 = data.data?.filter((product)=>{
    return product.brand._id=== args.name
});
// console.log(newArr2,"Brand Products");
setAllProducts(newArr2);
 }
  }

  async function getWishlist(){
    let response = await getLoggedUserWishlist();
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
      getFeaturedProducts();
      toast.success(response.data.message,{
        duration:3000,
        position:'top-right',
        style:
        {background:'black',
        color:'white'}
      });
    }else{
      if (!localStorage.getItem('userToken'))  toast.error('Please login first',{duration:3000} )
      else toast.error('addProduct Error',{duration:3000} )
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

useEffect(() =>{
  getFeaturedProducts();
  getCart();
  getWishlist();
},[]);
// useEffect(() =>{
//   getFeaturedProducts();
//   // getWishlist();
// },[removeProductFromWishlist,addProductToWishlist])
  return (
    <> 
    {allProducts?    <div className="container py-4">
    <div className="d-flex align-items-center justify-content-between">
        <h3 className='fw-bold'> Explore our flash sales  </h3>
        <Link to={'/FeaturedProducts'}>
        <span className='ms-auto text-decoration-underline cursor-pointer'>Shop now</span>

        </Link>
        </div>
      <div className="row mb-5 justify-content-around">
       
        
        {fetchingData?<> 
         <div className="col-md-4 "><ProductGridLoading></ProductGridLoading></div>
          <div className="col-md-4 "><ProductGridLoading></ProductGridLoading></div>
          <div className="col-md-4 "><ProductGridLoading></ProductGridLoading></div>
          <div className="col-md-4 "><ProductGridLoading></ProductGridLoading></div>
          <div className="col-md-4 "><ProductGridLoading></ProductGridLoading></div>
          <div className="col-md-4 "><ProductGridLoading></ProductGridLoading></div>
          </>: allProducts?.map((product)=>
                <div key={product.id} className="col-md-4  ">
                  <div className="product px-2 py-3 rounded ">
                    <Link to={'/product-details/'+ product.id}>
                      <figure className='position-relative rounded'>
                      <LazyLoadImage src={product.imageCover}   className='w-100  rounded ' alt={product.category.name} effect='blur'>
                        
                      </LazyLoadImage>
                      {/* <img src={product.imageCover} className='w-100  rounded ' alt={product.category.name} /> */}
                      {product.priceAfterDiscount && product.priceAfterDiscount !== product.price? <span className="sale badge text-bg-danger position-absolute top-0 end-0 rounded">Sale</span>:""}
                      </figure>
                    

                    <p className='text-main  my-0 '>{product.category.name}</p>
                    </Link>
                    <div className="d-flex justify-content-between">
                    {/* <p className='text-primary fs-7'>{product.brand.name != null?product.brand.name:""}</p> */}
                    {product.brand != null?<p className='text-primary fs-7'>{product.brand.name}</p>:<p className='text-primary fs-7'></p>}
                    {checkProductInWishlist(product.id)? <i className={`fa-solid text-danger fa-heart pe-3 cursor-pointer`} onClick={(e)=>{ removeProductFromWishlist(product.id)}}></i>: <i className={`fa-regular fa-heart pe-3 cursor-pointer`} onClick={(e)=>{ addProductToWishlist(product.id)}}></i>}
                    </div>
                     {/* <i className={`${heartIcon} fa-heart pe-3`} onClick={(e)=>{ addProductToWishlist(product.id)}}></i> */}
                    <Link to={'/product-details/'+ product.id}>
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
        ).slice(12,18) }
      </div>
      <Link to={'/FeaturedProducts'} className='d-flex mb-5 justify-content-center'> <button className='btn bg-main  rounded-pill mx-auto'>Shop Now </button>  </Link>
    </div>:<Loading></Loading> }

    </>
  )
}
