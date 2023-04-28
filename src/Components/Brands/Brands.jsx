import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';


export default function Brands () {
    const [allBrands,setAllBrands]= useState();
    async function getAllBrands(){
        const{data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`);
        setAllBrands(data.data);
    }
    useEffect(()=>{
        getAllBrands();
    },[])

  return (
        <>
        {allBrands?    
        
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
        </div>:<Loading></Loading>}
        </>
  )
}

