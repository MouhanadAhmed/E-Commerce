import React , { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../../Helpers/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Shipping.module.css'
import axios from 'axios';
import { useFormik, Formik, Field, Form } from 'formik';

export default function Shipping() {
    const navigate = useNavigate();
    let {getLoggedUserCart,setCounter,headers,handleBaseUrl,baseUrl} = useContext(cartContext);
    const [cartDetails,setCartDetails] =useState(null);
    const [userAddress,setUserAddress]=useState();
    const [error,setError]= useState(null);
    const [loading,setLoading]=useState(false);


 
      
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
          // console.log("data",data);
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
            <div className="col-sm-7 order-2 order-sm-1 col-12">
                <h3 className='fw-bold mb-3'>Sopas</h3>
                <h6 className='mb-5'><span className='text-main'>information <i className="fa-solid fa-angle-right"></i></span>  Shipping <i className="fa-solid fa-angle-right"></i> Payment</h6>
              
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

               <Formik
                    initialValues={{
                        picked: '',
                    }}
                    onSubmit={(values)=>{  localStorage.setItem("shipping", values.picked);navigate('/payment')}}
                    >
                    {({ values }) => (
                        <Form>
                        <div id="my-radio-group"><h6 className='mb-5'>Shipping method</h6></div>
                        <div role="group" aria-labelledby="my-radio-group">
                

                <div className="rounded border mb-5">
                <label  className='radioLabel w-100'>
                   
               <div className="d-flex justify-content-between px-3 pt-3 align-items-center">
             <div className=" d-flex align-items-center">
             <Field type="radio" name="picked" value='75' />
               <h6 className='ps-2 '>Aramex </h6>
             </div>

                <h6 className='pe-2'>EGP 75</h6>
               </div>
               <p className='ps-5 text-muted'>2 to 4 business days</p>
                </label>
               <hr className='my-0'/>
               <label  className='radioLabel w-100'>
               <div className="d-flex justify-content-between px-3 pt-3 align-items-center">
               <div className=" d-flex align-items-center">
             <Field type="radio" name="picked" value='150' />
               <h6 className='ps-2 '>Aramex espress</h6>
             </div>
                <h6>EGP 150</h6>
               </div>
               <p className='ps-5 text-muted'>1 to 2 business days</p>
               </label>
               </div>
               </div>
                <div className="d-flex justify-content-between">
                <Link to={'/checkout'} className='text-main'><i className="fa-solid fa-angle-left"></i>Return to information</Link>
                <button className='rounded-pill bg-prim p-2  w-auto' type="submit">Continue to Payment</button>
                </div>
                        </Form>
 )}
 </Formik>
</div>
           





            <div className={`col-sm-5 ${styles.yellowGreen} rounded order-sm-2 order-1 col-12 mb-5`}>
            <h3 className='fw-bold pt-2 mb-3'>Checkout cart</h3>
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
   
   <h6 className='h3   '>EGP {Formik?.values?.picked}</h6> 
   </div>

   <div className="d-flex justify-content-between pt-3 mb-3">
   <h6 className='h3  fw-bold '>Total </h6> 
   <h6 className='h3  fw-bold '> {cartDetails?.totalCartPrice?.toLocaleString()} EGP</h6> 
   </div>
            </div>
        </div>
    </div>
    </>
  )
}
