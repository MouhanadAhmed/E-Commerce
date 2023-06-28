import React, { useContext, useEffect, useState } from 'react'
// import styles from './FeaturedProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { cartContext } from '../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../../Helpers/Loading/Loading';
import { DynamicStar } from 'react-dynamic-star';

export default function FeaturedProducts(args) {

  const [allProducts,setAllProducts]=useState();

  let {addToCart,increment,baseUrl,handleBaseUrl} =useContext(cartContext);


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

  async function getFeaturedProducts(){
  let {data} = await axios.get(`${baseUrl}/api/v1/products`).catch((err)=> 
  {
    console.log('getFeaturedProducts error',err.message,err);
    if (err.code === "ERR_NETWORK") {
      handleBaseUrl();
    }
}
  );
  console.log(data.data,"All products");
  setAllProducts(data.data);
  // getSalesProducts();
  const newArr = data.data?.filter((product)=>{
    return product.priceAfterDiscount && product.priceAfterDiscount !== product.price
})
console.log(newArr,"Sales Products");
setAllProducts(newArr);
console.log(args,"args");
console.log("args length",Object.keys(args).length);
 if(Object.keys(args).length !== 0){
  const newArr2 = data.data?.filter((product)=>{
    return product.brand._id=== args.name
});
console.log(newArr2,"Brand Products");
setAllProducts(newArr2);
 }
  }



useEffect(() =>{
  getFeaturedProducts();
},[])
  return (
    <> 
    {allProducts?    <div className="container py-4">
  
      <div className="row  justify-content-around">
       
        
        {allProducts?.map((product)=>
                <div key={product.id} className="col-4  ">
                  <div className="product px-2 py-3 rounded ">
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
                      <span className='ms-2 mt-1 pt-0'> <DynamicStar  outlined={true} height={'30'} width={'15'} rating={product.ratingsAverage} /></span>
                      
                      {/* <i className='fa fa-star rating-color'></i> */}
                      <span className='ms-2 mt-0 pt-0'>{product.ratingsQuantity}</span>
                      </div>
                    </div>
                    </Link>

                    <button onClick={()=>addProduct(product.id)} className='btn bg-main text-white w-100'>+ Add to cart</button>
                    
                  </div>

                 
                 
                </div>
        )}
      </div>
    </div>:<Loading></Loading> }

    </>
  )
}
