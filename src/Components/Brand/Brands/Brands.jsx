import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Helpers/Loading/Loading';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


export default function Brands () {
    const [allBrands,setAllBrands]= useState();
    async function getAllBrands(){
        const{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
        setAllBrands(data.data);
        console.log("Brands",data.data);
       
    }
    useEffect(()=>{
        getAllBrands();
    },[])

  return (
        <>
                      <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
        {allBrands?    
        allBrands.length > 0? 
        <div className='container py-3'>
            <div className="row align-items-center">
                <div className="col-md-3 pt-4">
                    <h2 className='fw-bold'>Shop by Brand</h2>
                    <p>You can see our brands each brand includes the products in it.</p>
                </div>


                {allBrands?.map((brand)=>  <div key={brand._id} className="col-md-3 text-center">
                        <Link to={`/brandproducts/${brand._id?brand._id:"id"}`}>
                            <div className="brand">
                            <img src={brand.image} className='w-100' alt={brand.slug} />
                            {/* <h5 className='fw-bolder  text-black text-warning rounded w-50'>{brand.name}</h5> */}
                            </div>
                        </Link>
                </div>)}

            </div>
        </div>
        :<div className='container p-5'>
        <div className="row align-items-center p-5">
            <h2>Brands is under maintainance, will be available soon</h2>
            </div>
            </div>
        :<Loading></Loading>}
        </>
  )
}

