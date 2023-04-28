import React from 'react'
import  './Footer.module.css'

export default function Footer() {
  return (
    <footer className='  bottom py-4 text-white text-start px-4'>
      <h2>Fresh Cart Footer</h2>
      <p>We will send you a link, open it on your phone to download the app </p>
      <div className="container d-flex justify-content-between mb-2">
        <input className='form-control w-75' type="text" placeholder='Email..' />
        <button className='btn btn-success btn-lg ms-3 w-25'>Share App Link</button>
      </div>
      <div className="container border-top border-bottom border-2 py-4 d-flex justify-content-between align-items-center">
        <div className="leftPart">
          <ul className='list-unstyled d-flex '>
            <li className='me-2'> 
              <h6>Payment Partners</h6>
            </li>
            <li className='me-2 text-primary'>
              <i className='fa-brands fa-cc-amazon-pay'></i>
            </li>
            <li className='me-2 text-primary'>
            <i className='fa-brands fa-cc-mastercard'></i>
            </li>
            <li className='me-2 text-primary'>
            <i className='fa-brands fa-paypal'></i>
            </li>
          </ul>
        </div>
        <div className="rightPart d-flex align-items-center">
          <h6>Get Deliveries with FreshCart</h6>
          <button className='btn btn-dark btn-lg mx-3'><i class="fa-brands fa-app-store me-2"></i>Available on App Store</button>
          <button className='btn btn-dark btn-lg'><i class="fa-brands fa-google-play me-2"></i>Get it from Google play</button>

        </div>
      </div>
    </footer>
  )
}
