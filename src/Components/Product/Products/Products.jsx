import React, { useContext, useEffect, useState } from 'react'
// import styles from './FeaturedProducts.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { cartContext } from '../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../../Helpers/Loading/Loading';
import { DynamicStar } from 'react-dynamic-star';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ImageLoader from '../../Helpers/ImageLoader/ImageLoader';
import {Helmet} from "react-helmet";

export default function Products() {
  let {id} =useParams();
  
  // console.log("id",id);
  const [allProducts,setAllProducts]=useState();
  // const [subProducts,setSubProducts]=useState();
  const [numberOfPages,setNumberOfPages]=useState(1);
  const [page, setPage] = useState();
  const [cartDetails,setCartDetails] =useState(null);
  const [wishlist,setWishlist] =useState(null);

  let productsArray=[];
  let {addToCart,increment,baseUrl,handleBaseUrl,getLoggedUserWishlist,addToWishlist,removeFromWishlist,getLoggedUserCart,removeItem,decrement} =useContext(cartContext);

  async function getCart(){
    let response = await getLoggedUserCart();
    if(response?.data?.status === 'success'){
      setCartDetails(response.data.data.products);
    }
  }

  function checkProductInCart(id){
    // console.log('cartDetails',cartDetails);
      // console.log(cartDetails?.filter((item)=> item.product.id === id));
    cartDetails?.find((item)=> item._id === id)
    let status = cartDetails?.filter((item)=> item.product.id === id);
     if (status?.length>0){
      return true
     }else{
      return false
     }
  }


  async function addProduct(productId){
    let response = await addToCart(productId);
    if(response?.data.status === 'success'){
      increment();
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
  async function RemoveProduct(productId){
    let response = await removeItem(productId);
        if(response?.data.status === 'success'){
          decrement();
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
  async function getProducts(page){
    // setPage(page);
  let {data} = await axios.get(`${baseUrl}/api/v1/products?page=${page?page:1}`).catch((err)=> 
  {
    console.log('getProducts error',err.message);
    if (err.code === "ERR_NETWORK") {
      handleBaseUrl();
    }
}
  );
  console.log('numberOfPages',data);
  setNumberOfPages(data.metadata.numberOfPages);
  console.log(data.data);
  setAllProducts(data.data);
  let dat = await axios.get(`${baseUrl}/api/v1/products?page=2`).catch((err)=> 
  {
    console.log('getProducts error',err.message);
    if (err.code === "ERR_NETWORK") {
      handleBaseUrl();
    }
}
  );;
  console.log('data2',dat);
  productsArray=[...data?.data,...dat?.data.data];
    console.log('productsArray',productsArray);
  // if (id !== "all") {
   let temp = productsArray.filter((product)=>{
      return product?.subcategory[0]?._id === id;
    
   });
      console.log("temp",temp);
      setAllProducts(temp);
   Array.from(temp).length !==0 ? setAllProducts(temp):setAllProducts(data.data);
   if(Array.from(temp).length !==0){
    setAllProducts(temp);
    // eslint-disable-next-line no-lone-blocks
    {Array.from(temp).length < 40? setNumberOfPages(1):setNumberOfPages(2) }
   }
  //  temp=[];
  //  setSubProducts(temp);
  //  console.log("subProducts",subProducts);
  //  subProducts !== undefined ? setAllProducts(temp):setAllProducts(data.data);
  //  setSubProducts(undefined);
   //  temp=[];
  // }

  
  // temp.length >0 ?setAllProducts(temp):setAllProducts(data.data);
  // temp=[];
  }
  function handleChange(event, value){
    console.log('event',event);
    console.log('value',value);
    // setPage(value);
    getProducts(value);
    window.scrollTo(0,0);
  }
  async function getWishlist(){
    let response = await getLoggedUserWishlist();
    // console.log(response);
    if(response?.data?.status === 'success'){
      setWishlist(response.data.data);
    }
  }

  function checkProductInWishlist(id){
    // console.log('wishlist',wishlist);
      // console.log(wishlist?.filter((item)=> item.id === id));
    // wishlist?.find((item)=> item._id === id)
    let status = wishlist?.filter((item)=> item.id === id);
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

useEffect(() =>{
  getProducts();
  getCart();
  getWishlist();

},[])
useEffect(() =>{
  getProducts();
},[id])

  return (
    <> 
                                      <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
            </Helmet>
    {allProducts?    <div className="container py-4 mb-5">
      <div className="row">
        {allProducts.map((product)=>
                <div key={product.id} className="col-md-3 ">
                  <div className="product px-2 py-3 rounded">
                    <Link to={'/product-details/'+ product.id}>
                      <figure className='position-relative rounded'>
                      {product.imageCover?<img src={product.imageCover} className='w-100  rounded ' alt={product.category.name} />: <ImageLoader></ImageLoader>}
                      {/* <img src={product.imageCover} className='w-100  rounded ' alt={product.category.name} /> */}
                      {product.priceAfterDiscount && product.priceAfterDiscount !== product.price? <span className="sale badge text-bg-danger position-absolute top-0 end-0 rounded">Sale</span>:""}
                      </figure>


                    <p className='text-main  my-0 '>{product.category.name}</p>
                    </Link>
                    <div className="d-flex justify-content-between">
                    <p className='text-primary fs-7'>{product.brand.name}</p>
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
                      <span className='ms-2 mt-1 pt-0'> <DynamicStar  outlined={true} height={'30'}  width={'15'} rating={product.ratingsAverage} /></span>
                      
                      {/* <i className='fa fa-star rating-color'></i> */}
                      <span className='ms-2 mt-0 pt-0'>{product.ratingsQuantity}</span>
                      </div>
                    </div>
                    </Link>
                    {checkProductInCart(product.id)  ? <button onClick={()=>RemoveProduct(product.id)} className='btn bg-danger text-white w-100'>Remove from cart</button>:<button onClick={()=>addProduct(product.id)} className='btn bg-main text-white w-100'>+ Add to cart</button>}

                    {/* <button onClick={()=>addProduct(product.id)} className='btn bg-main text-white w-100'>+ Add to cart</button> */}
                  </div>

                 
                 
                </div>
        )}
            {numberOfPages>1 ?<>
            <div className="col-12 pt-4 d-flex justify-content-center">
            <Stack spacing={2}>
      <Pagination count={numberOfPages} page={page}  onChange={handleChange} showFirstButton showLastButton />
    </Stack>
            </div>

    </>:""}
      </div>
    </div>:<Loading></Loading> }


    </>
  )
}
