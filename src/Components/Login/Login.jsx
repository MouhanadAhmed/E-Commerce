import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Login({saveUserData}) {

  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const navigate = useNavigate("");

  let mySchema = Yup.object({
    email:Yup.string().email("Invalid Email").required("Email is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("Password is required"),
  })

  let formik = useFormik({
     initialValues:{ 
      email:"",
      password:"",
     },validationSchema:mySchema,
     onSubmit:(values)=>login(values)
  })

  async function login(values){
    setLoading(true);
    setError(null);
    let {data} =await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((err)=> {
      // setError(err.response.data.errors.param +": "+ err.response.data.errors.msg);
      setLoading(false);
      setError(err.response.data.message);
    })
    console.log(data);
    if(data.message === 'success'){
    localStorage.setItem("userToken",data.token)
    saveUserData( );
    // console.log(data.message);
      navigate('/');
    setLoading(false);

    }
  }
  return (<>
    <div className="containe my-5 border w-25 m-auto rounded p-3">
      <h3 className='fw-bold mb-3'>Sign in</h3>

      {error?<div className='alert alert-danger'>{error}</div>:""}

      <form onSubmit={formik.handleSubmit}>


      <label htmlFor="email" className='fw-semibold'>Email</label>
      <input type="email" className='form-control mb-3' id='email'name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }

      <label htmlFor="password" className='fw-semibold'>Password</label>
      <input type="password" className='form-control mb-3' id='password'name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:"" }


        <button className='btn w-100 mb-3' type='submit'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Sign in"}</button>
      </form>
      <h4 className='fs-6 border-bottom pb-3 mb-3'>By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</h4>
      <h4 className='fs-6 pb-3'>New to Amazon?<Link to="http://localhost:3000/register" className='text-primary' >Create your Amazon Account</Link> </h4>
     
    </div>
    </> )
}
