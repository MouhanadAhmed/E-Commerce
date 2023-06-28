import React from 'react'
import styles from './NotFound.module.css'
import errorImg from '../../../Assets/Images/error.png'

export default function NotFound() {
  return (
    <>
    <div className="container">
      <div className="row ">
    <img className='w-50 m-auto py-5' src={errorImg} alt="404 Not Found" />

      </div>
    </div>
    </>
  )
}
