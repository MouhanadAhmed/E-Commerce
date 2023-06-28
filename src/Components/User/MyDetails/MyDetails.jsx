import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './MyDetails.module.css'

export default function MyDetails() {
    
    const[userDetails,setUserDetails]=useState({
        createdAt: "",
        email :  "",
        name: "",
        _id: ""})
    
    async function getLoggedUserDetails(){
      let mail=  localStorage.getItem("userMail");
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/users?email=${mail}`).catch((err)=>{
            console.log("err",err);
        });
        // console.log("User",data.users[0]);
        setUserDetails(data.users[0]);
        localStorage.setItem('userId',data.users[0]._id)
    }


    useEffect(()=>{
        getLoggedUserDetails();
    })

  return (
    <>
    <div className="container">
        <div className="row py-5">
            <h2 className='ps-3 mb-5'>My Details</h2>
            <h5 className='mb-2'>Personal information</h5>
            <hr className='mb-5'/>

            <div className="form-group col-md-6">
                <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} disabled placeholder='name' id='MyDetailsName'name='name' value={userDetails?.name} />
                <label htmlFor="name" className='fw-semibold rounded'>Name</label>
            </div>

            <div className="form-group  col-md-6">
                <input type="email" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} disabled placeholder='Email Address' id='MyDetailsEmail'name='email' value={userDetails?.email} />
                <label htmlFor="email" className='fw-semibold rounded'>Email</label>
            </div>
        </div>
    </div>

    </>
  )
}
