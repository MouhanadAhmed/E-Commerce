import React , { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../../Helpers/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Payment.module.css'
import axios from 'axios';
import { useFormik, Formik, Field, Form } from 'formik';

export default function Payment() {
    const navigate = useNavigate();
    let {getLoggedUserCart,setCounter,headers,handleBaseUrl,baseUrl} = useContext(cartContext);
    const [cartDetails,setCartDetails] =useState(null);
    const [userAddress,setUserAddress]=useState();
    const [error,setError]= useState(null);
    const [loading,setLoading]=useState(false);
    let cartId = localStorage.getItem('cartId')
    let address =userAddress?.find((item)=> item._id === localStorage.getItem('addressId'));

    async function createCashOrder(){
        let response = await axios.post(`${baseUrl}/api/v1/orders/${cartId}`,
        {
            "shippingAddress":{
                "details": address?.details,
                "phone": address?.phone,
                "city": address?.city
                }
        },{
          headers
        }).catch((err)=> console.log('Cash order err',err));
        console.log(response);
        navigate('/userProfile')
    }
      
    async function createCreditOrder(){
      let response = await axios.post(`${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
          "shippingAddress":{
              "details": address?.details,
              "phone": address?.phone,
              "city": address?.city
              }
      },{
        headers
      }).catch((err)=> console.log('Cash order err',err));
      console.log(response.data.session.url);
      window.open(response.data.session.urls)
      // navigate('/userProfile')
  }

        async function getLoggedUserAddress(){
          let {data} = await axios.get(`${baseUrl}/api/v1/addresses`,
           {
            headers
           }).catch((err)=>{
              console.log('getLoggedUserAddress Error',err.code);
              if (err.code === "ERR_NETWORK") {
                  handleBaseUrl(baseUrl);
              }
          });
          console.log("data",data);
          // console.log("data length",data.data.length  );
      
          setUserAddress(data.data);
          // console.log(userAddress[0].name);
          // if (data.data.length< 1) {
          //   console.log("user has no address");
          //   setUserAddress("user has no registered addresses");
          // }
          
       }

       function getShippingAddress(){
        let address =userAddress?.find((item)=> item._id === localStorage.getItem('addressId'));
        console.log("address",address?.details);
        return address?.details
       }

    async function getCart(){
        let response = await getLoggedUserCart();
        if(response?.data?.status === 'success'){
          setCartDetails(response.data.data);
          setCounter(response.data.data.products.length)
        //   console.log(response.data.data.products);
        }
      }

      useEffect(()=>{
        getCart();
        getLoggedUserAddress();
      },[])
  return (
    <>
    <div className="container">
        <div className="row py-3">
            <div className="col-7">
                <h3 className='fw-bold mb-3'>Sopas</h3>
                <h6 className='mb-5'><span className='text-main'>information <i className="fa-solid fa-angle-right"></i>  Shipping <i className="fa-solid fa-angle-right"></i> </span>Payment</h6>
              
               <div className="rounded border mb-5">
               <div className="d-flex justify-content-between p-3">
               <h6 className=' text-muted'>Contact </h6>
                <h6>{localStorage.getItem('userMail')}</h6>
               </div>
               <hr className='my-0'/>
               <div className="d-flex justify-content-between p-3">
               <h6 className=' text-muted'>Ship to  </h6>
                <h6>{getShippingAddress()}</h6>
                {/* {userAddress?.find((item)=> item._id === localStorage.getItem('addressId'))} */}
                
               </div>
               </div>
{/* 
            <div className="d-flex justify-content-between">
                <Link to={'/shipping'} className='text-main'><i className="fa-solid fa-angle-left"></i>Return to shipping</Link>
                <button className='rounded-pill bg-prim   w-auto' type="submit">Continue to shipping</button>
                </div> */}

                <h6 className='mb-5'> Payment method</h6>
                <div className="rounded border mb-5">
               <div className="d-flex justify-content-between align-items-center p-3">
               <h6 className=' text-muted'>Cash on delivery </h6>
               <button className='rounded-pill bg-prim   w-auto' type="submit" onClick={()=>createCashOrder()}>Confirm</button>
               </div>
               {/* <hr className='my-0'/> */}
               <div className="d-flex justify-content-between align-items-center p-3">
               <h6 className=' text-muted'>Credit Card  </h6>
               <button className='rounded-pill bg-prim   w-auto' type="submit" onClick={()=>{createCreditOrder()}}>Proceed to payment</button>
                {/* {userAddress?.find((item)=> item._id === localStorage.getItem('addressId'))} */}
                
               </div>
               </div>

                <Link to={'/shipping'} className='text-main'><i className="fa-solid fa-angle-left"></i>Return to shipping</Link>
</div>
           





            <div className={`col-5 ${styles.yellowGreen} rounded`}>
            {cartDetails?.products?.map((product)=> <Link key={product.product._id} to={`/product-details/${product.product._id}`} className='row  align-items-center border-bottom py-2'>
     
     <div className="col-2">
       <img src={product.product.imageCover} className='w-100  rounded-2' alt={product.product.title} />
     </div>
     <div className="col-10  row ">
       <div className='col-9  pt-2'>
       <h6 className='h6  fw-bold'>{product.product.title}</h6>
       <h6 className='mb-3  text-muted'>{product.product.brand.name}</h6>
  
        </div>
       <div className='text-end col-3 pt-2'>
       <h6 className='fw-bold'>EGP {product.price.toLocaleString()}</h6>


       </div>
     </div>
     
   </Link>)}
   <div className="d-flex justify-content-between pt-3 mb-3">
   <h6 className='h3   '>Subtotal </h6> 
   <h6 className='h3   '> {cartDetails?.totalCartPrice?.toLocaleString()} EGP</h6> 
   </div>

   <div className="d-flex justify-content-between border-bottom mb-3">
   <h6 className='h3   '>Shipping </h6> 
   
   <h6 className='h3   '>{localStorage.getItem("shipping")} EGP </h6> 
   </div>

   <div className="d-flex justify-content-between pt-3 mb-3">
   <h6 className='h3  fw-bold '>Total </h6> 
   <h6 className='h3  fw-bold '> {Number(cartDetails?.totalCartPrice) + Number(localStorage.getItem("shipping"))} EGP</h6> 
   </div>
            </div>
        </div>
    </div>
    </>
  )
}
