import React, { useState } from 'react'
import styles from  './Register.module.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios'
import {Helmet} from "react-helmet";


export default function Register() {
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState();
  const navigate = useNavigate();
  const [showPassword,setShowPassword]=useState(false);
  const [eyeBtn,setEyeBtn] = useState("fa-eye")


  let validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3,"min 3 charcters").max(15,"maximum 15 charcters"),
    email:Yup.string().email("Invalid Email").required("Email is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("Password is required"),
    rePassword:Yup.string().required("Password is required").oneOf([Yup.ref('password')],"RePassword must match password"),
    phone:Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/,"Invalid Phone"),
  })


  let formik = useFormik({
     initialValues:{ 
      name: "", 
      email:"",
      password:"",
      rePassword:"",
      phone:""
     },validationSchema,
     onSubmit:(values)=>sendRegisterData(values)
  })

  async function sendRegisterData(values){
    setLoading(true);
    // setError(null);
    let {data} =await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((err)=> {
      // setError(err.response.data.errors.param +": "+ err.response.data.errors.msg);
      setLoading(false);
      console.log(err);
      setError(err.response.data.message);
    })
    if(data.message === 'success'){
    // console.log(data.message);
      navigate('/login')
    setLoading(false);

    }
  }

  function toggleShowPassword(){
    if(showPassword === true){
      setShowPassword(false);
      setEyeBtn("fa-eye")
    }else {
      setShowPassword(true);
      setEyeBtn("fa-eye-slash")
    };
  }


  return (
    <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
    <div className={`container my-5  m-auto rounded p-3 ${styles.width}`}>
      <h3 className='fw-bolder h2  mx-auto mb-4 text-primary'>Create an Account.</h3>

      {error?<div className='alert alert-danger'>{error}</div>:""}

      <form onSubmit={formik.handleSubmit}>

        <div className="form-group">
        <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} placeholder='Your Name' id='name'name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <label htmlFor="name" className='fw-semibold'>Your name</label>
       
        </div>
        {formik.errors.name && formik.touched.name?<div className='alert alert-danger '>{formik.errors.name}</div>:"" }

      <div className="form-group">
      <input type="email" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} placeholder='Email Address' id='email'name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="email" className='fw-semibold'>Email Address</label>
      </div>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }

      <div className="form-group position-relative">
      <input type={showPassword?"text":"password"} className={`form-control mb-3 py-2 ${styles.redInput} rounded-pill`} placeholder='Password' id='password'name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="password" className='fw-semibold'>Password</label>
      <i className={`far ${eyeBtn} cursor-pointer position-absolute`} id="togglePassword" onClick={()=>toggleShowPassword()}></i>
      </div>
     {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:"" }

      <div className="form-group">
      <input type={showPassword?"text":"password"} className={`form-control mb-3 py-2 ${styles.redInput} rounded-pill`} placeholder='rePassword' id='rePassword'name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="rePassword" className='fw-semibold '>Re-enter password</label>
      </div>
      {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword}</div>:"" }

      <div className="form-group">
      <input type="tel" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} placeholder='Mobile number' id='phone'name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="phone" className='fw-semibold'>Mobile number</label>
      </div>
      {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>:"" }

      {loading?<button className={`${styles.button} btn w-100 mb-3 rounded-pill`} type='submit'><i className='fa fa-spinner fa-spin'></i></button>:<button disabled={!formik.isValid && formik.dirty} className='btn w-100 mb-3 bg-prim rounded-pill' type='submit'>Create Account</button>}
      </form>
      <h4 className='fs-6 border-bottom pb-3 mb-3'>By creating an account, you agree to SOPA's Conditions of Use and Privacy Notice.</h4>
      <h4 className='fs-6 pb-3'>Already have an account? <Link to="http://localhost:3000/Login" className='text-primary text-decoration-underline ms-3' >Sign in</Link> </h4>
     
    </div>
    </>
  )
}
