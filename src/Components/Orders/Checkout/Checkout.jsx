import React , { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../../Helpers/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css'
import axios from 'axios';
import { useFormik, Formik, Field, Form } from 'formik';
import ContentLoading from '../../Helpers/ContentLoading/ContentLoading';
import {Helmet} from "react-helmet";

export default function Checkout() {
    const navigate = useNavigate();
    let {getLoggedUserCart,setCounter,headers,handleBaseUrl,baseUrl} = useContext(cartContext);
    const [cartDetails,setCartDetails] =useState(null);
    const [userAddress,setUserAddress]=useState();
    const [error,setError]= useState(null);
    const [loading,setLoading]=useState(false);


    let formik = useFormik({

        initialValues:{ 
          "name": "",
          "details": "",
          "phone": "",
          "city": ""
        },
        onSubmit:(values)=>{
          addUserAddress(values);
          setLoading(true);
          
       }
      })
      
      
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

       async function addUserAddress(values){
        let {message} = await axios.post(`${baseUrl}/api/v1/addresses`,
        {
          "name": values.name,
          "details": values.details,
          "phone": values.phone,
          "city": values.city
           },
        {
          headers:headers
        },
      ).catch((err)=>{
              console.log('addUserAddress Error',err);
              if (err.code === "ERR_NETWORK") {
                  handleBaseUrl(baseUrl);
              }
      
              if(err?.response?.status === 400){
                setError(err?.response?.data?.errors?.msg);
                toast.error(err.response.data.errors.msg,{
                  duration:3000,
                  position:'top-right',
                  style:
                  {background:'black',
                  color:'white'}
                });
              }else if (err?.response?.status === 401)
               {setError(err?.response?.data.message);
                toast.error(err?.response?.data.message,{
                  duration:3000,
                  position:'top-right',
                  style:
                  {background:'black',
                  color:'white'}
                });
              }
          });
          console.log("message",message);
          toast.success(message,{
            duration:3000,
            position:'top-right',
            style:
            {background:'black',
            color:'white'}
          });
          // console.log("data length",data.data.length  );
          getLoggedUserAddress();
          setLoading(false);
      
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
                          <Helmet>
                <meta charSet="utf-8" />
                <title>Checkout</title>
            </Helmet>
    <div className="container">
        <div className="row py-3 d-flex">
            <div className="col-md-7 order-2 order-sm-1 col-12">
                <h3 className='fw-bold pt-2 mb-3'>Sopas</h3>
                <h6 className='mb-3'>information <i className="fa-solid fa-angle-right"></i> Shipping <i className="fa-solid fa-angle-right"></i> Payment</h6>
                <h6 className='mb-3'>Contact information</h6>
                <div className="form-group mb-3">
                <input type="email" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`}  placeholder='Email Address' id='email'name='email' defaultValue={localStorage.getItem('userMail')} />
                <label htmlFor="email" className='fw-semibold'>Email</label>
                </div>
                <hr />
                {/* <h6 className='mb-3'>Shipping address</h6> */}

                <Formik
                    initialValues={{
                        picked: '',
                    }}
                    onSubmit={(values)=>{  localStorage.setItem("addressId", values.picked);navigate('/shipping')}}
                    >
                    {({ values }) => (
                        <Form>
                        <div id="my-radio-group"><h6 className='mb-3'>Shipping address</h6></div>
                        <div role="group" aria-labelledby="my-radio-group">
                            {/* <label className='radioLabel'>
                            <Field type="radio" name="picked" value="One" />
                            One
                            </label>
                            <label className='radioLabel'>
                            <Field type="radio" name="picked" value="Two" />
                            Two
                            </label> */}
                            
                       


              
                {userAddress?.length>=1?userAddress.map((item,index)=> 
                    <label key={index} className='radioLabel'>
                    <Field type="radio" name="picked" value={item._id} />
                     <p   className='h5 d-inline ps-2'>{item.name} </p>
                    <div key={index} className='row mx-auto mb-5'>
                    <div className="d-flex justify-content-between  mb-3">
                    {/* <p   className='h5 '>{item.name} </p> */}
                    </div>
                    
                    {/* <div className="form-group col-md-6">
                            <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} readOnly placeholder='Address Name' id={`addressName${index}`} name='addressName' value={item.name} />
                            <label htmlFor={`addressName${index}`} className='fw-semibold rounded'>Address Name</label>
                        </div> */}

                        <div className="form-group  col-md-12">
                            <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`} readOnly placeholder='details' id={`details${index}`} name='details' value={item.details} />
                            <label htmlFor={`details${index}`} className='fw-semibold rounded'>Details</label>
                        </div>

                        <div className="form-group  col-md-6">
                            <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`} readOnly placeholder='city' id={`city${index}`} name='city' value={item.city} />
                            <label htmlFor={`city${index}`} className='fw-semibold rounded'>City</label>
                        </div>

                        <div className="form-group  col-md-6">
                            <input type="tel" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`} readOnly placeholder='phone' id={`phone${index}`} name='phone' value={item.phone} />
                            <label htmlFor={`phone${index}`} className='fw-semibold rounded'>Phone</label>
                        </div>
                    </div>
                    </label> ) : <p   className='h5 mb-3'>user has no registered addresses</p> }
                {/* <label  className='radioLabel'>
                <Field type="radio" name="picked" value="new" />
                <p className='mb-3 h5  d-inline-block ps-2'>Ship to another address?</p>
                <form onSubmit={formik.handleSubmit}>
                    <div  className='row mx-auto'>
                    {error?<div className='alert alert-danger'>{error}</div>:""}
                    <div className="form-group  col-md-6">
                        <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`} id='name' placeholder='Address Name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        <label htmlFor="name" className='fw-semibold'>Address Name</label>
                        {formik.errors.name && formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div>:"" }
                        </div>

                            <div className="form-group  col-md-6">
                                <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`}  placeholder='details' id='details'name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                <label htmlFor="details" className='fw-semibold rounded'>Details</label>
                            </div>
                            {formik.errors.details && formik.touched.details?<div className='alert alert-danger'>{formik.errors.details}</div>:"" }

                            <div className="form-group  col-md-6">
                                <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`}  placeholder='city' id='city' name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                <label htmlFor="city" className='fw-semibold rounded'>City</label>
                            </div>

                            <div className="form-group  col-md-6">
                                <input type="tel" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`} id='phone' placeholder='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                <label htmlFor="phone" className='fw-semibold rounded '>Phone</label>
                            </div>
                            <div className="d-flex justify-content-center">
                            <button className='rounded-pill bg-prim   w-auto' type='submit'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Add address"}</button>

                            </div>
                            </div>
                </form>
                </label> */}
                {/* <div>Ship to : {values.picked}</div> */}
                </div>
                <div className="d-flex justify-content-center">
                <button className='rounded-pill bg-prim p-2  w-auto' type="submit">Continue to shipping</button>
                </div>
                        </Form>
                    )}
                    </Formik>
            </div>





            <div className={`col-md-5 ${styles.yellowGreen} rounded order-sm-2 order-1 col-12 mb-5`}>
            <h3 className='fw-bold pt-2 mb-3'>Checkout cart</h3>
            {cartDetails? cartDetails?.products?.map((product)=> <Link key={product.product._id} to={`/product-details/${product.product._id}`} className='row  align-items-center border-bottom py-2'>
     
     <div className="col-2">
       <img src={product.product.imageCover} className='w-100 h-100 rounded-2' alt={product.product.title} />
     </div>
     <div className="col-10  row ">
       <div className='col-9  pt-2'>
       <h6 className='  fw-bold'>{product.product.title}</h6>
       {/* <h6 className='mb-3  text-muted'>{product.product.brand.name}</h6> */}
       {product.product.brand != null?<h6 className='mb-3  text-muted'>{product.product.brand.name}</h6>:<h6 className='mb-3  text-muted'></h6>}
       
  
        </div>
       <div className='text-end col-3 pt-2'>
       <h6 className='fw-bold'>EGP {product.price.toLocaleString()}</h6>


       </div>
     </div>
     
   </Link>):<><ContentLoading></ContentLoading><ContentLoading></ContentLoading><ContentLoading></ContentLoading> </> }
   <div className="d-flex justify-content-between pt-3 mb-3">
   <h6 className='  '>Subtotal </h6> 
   <h6 className='   '> {cartDetails?.totalCartPrice?.toLocaleString()} EGP</h6> 
   </div>

   <div className="d-flex justify-content-between border-bottom mb-3">
   <h6 className='   '>Shipping ?</h6> 
   <h6 className='   '>calculated at next step</h6> 
   </div>

   <div className="d-flex justify-content-between pt-3 mb-3">
   <h6 className='  fw-bold '>Total </h6> 
   <h6 className='  fw-bold '> {cartDetails?.totalCartPrice?.toLocaleString()} EGP</h6> 
   </div>
            </div>
        </div>
    </div>
    </>
  )
}
