import React from 'react';
import MainSlider from '../MainSlider/MainSlider';
import { Link } from 'react-router-dom';
import LcWaikiki from '../../../Assets/Images/1678286238428.svg';
import defacto from '../../../Assets/Images/defacto.svg';
import jackjones from '../../../Assets/Images/jj.svg';
import SalesProducts from '../..//Product/SalesProducts/SalesProducts';
import { DynamicStar } from 'react-dynamic-star';
import styles from './Home.module.css'
import storyPhoto from '../../../Assets/Images/StoryPhoto.svg'
import content from '../../../Assets/Images/Content.svg'
import sopa1 from '../../../Assets/Images/sopa1.svg'
import sopa2 from '../../../Assets/Images/sopa2.svg'
import sopa3 from '../../../Assets/Images/sopa3.svg'
import sopa4 from '../../../Assets/Images/sopa4.svg'


export default function Home() {
  return (
    <>
    <MainSlider></MainSlider>
    <div className="container mb-5">
      <div className="row bg-smoke rounded-2 py-3">
        <blockquote >
        <p> These are the most thoughtfully designed fashion on the market</p>
        </blockquote>
        <div className="d-flex  justify-content-between px-5 mx-auto align-items-center">
        <Link to={`/brandproducts/64089d9e24b25627a25315a5`}>
                            <div className="brand">
                            <img src={LcWaikiki} className='w-75 text-primary ' alt={"lc-waikiki"} />
                            </div>
                        </Link>
                        <Link to={`/brandproducts/64089bbe24b25627a253158b`}>
                            <div className="bg-smoke rounded-2">
                            <img src={defacto} className='w-75 bg-smoke rounded-2 ' alt={"Defacto"} />
                            </div>
                        </Link>
                        <Link to={`/brandproducts/64089dc924b25627a25315a8`}>
                            <div className="brand">
                            <img src={jackjones} className='w-75 ' alt={"Jack&jones"} />
                            </div>
                        </Link>
            </div>

      </div>
    </div>
    <SalesProducts></SalesProducts>
    <div className="container mb-5">
      <div className="row ">
        <div className="col-lg-6 bg-light  rounded me-5 h-75 mb-5 pt-5">
          <h3 className='text-center h1 fw-bold mb-5 pt-3 mt-5'>The Hype is real...</h3>
          <div className="row mb-0 pb-0  d-flex  align-items-center">
            <div className="col-md-6 pt-4 px-0">
              <img src={require('../../../Assets/Images/50023042_01.jpeg')} className='w-100 pt-5 h-100 rounded' alt="" />
            </div>
            <div className="col-md-6  pt-4 pb-0">
          <div className="d-flex align-items-center justify-content-around">
              <p>borkat u.</p>
              <span className='ms-2 mt-1 pt-0 '> <DynamicStar fullStarColor={'black'} outlined={true} height={'30'} width={'15'} rating={5} /></span>
          </div>
          <p className='fw-bold text-center w-75 mx-auto'>These stylishly simple and incredibly comfortable shoes have become such a staple in my daily wardrobe that I'm already buying a second pair.</p>
        </div>
          </div>
        </div>
       <div className=" col-lg-5 rounded bg-light h-50 pb-0 mb-5 px-0">
       <Link to={'/product-details/6428c6a9dc1175abc65ca01f'} >
          <img src={require('../../../Assets/Images/3214066-800-800.jpg')} className=' img-fluid   px-0 rounded mb-2' alt="" />
          <div className="d-flex justify-content-between align-items-center  px-2">
          <div className="left">
          <p className='fw-semibold'>Hoops 3.0 Low Classic Vintage Shoes</p>
          <p>Adidas</p>
          </div>
           <button className='btn  bg-main  rounded-pill '>Shop Now </button> 

          </div>

          </Link>

       </div>
      </div>
    </div>
    <div className="bg-prim">
      <div className="container ">
        <div className="  py-5">
         <p className='mx-auto w-auto d-flex justify-content-center' > <span className="badge text-bg-light w-auto mx-auto text-center rounded-pill px-3 p-2 mb-5">New</span></p> 
          <h2 className='text-center h1 fw-bolder w-100 mb-5'>Introducing Laptop & Accessories</h2>
          <div className="row mx-auto  ">
          <img className='img-fluid mb-5 px-0' src={require('../../../Assets/Images/Laptop-accessories2.jpg')} alt="best-laptop-accessories" />

          <h3 className='h2 py-5 fw-bold'> Laptops</h3>
          <div className="col-lg-3 px-0 me-4 rounded h-25 px-2">
            <div className="row d-flex justify-content-center align-items-center">

              <div className="col-md-12 mb-4 bg-white rounded px-0 overflow-hidden">
              <Link to={'/product-details/6408d6626406cd15828e8ef2'}  className='rounded'>
              <div className="card rounded  " style={{'maxHeight': '60.5rem'}}>
              
                <img src='https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678300769731-1.jpeg' className={`card-img-top mb-5  w-25 mx-auto h-25 py-5 px-0  ${styles.scale} `} alt="..."/>

                
                  <div className="card-body mt-2 ">
          <p className='fw-semibold text-truncate '>IdeaPad Gaming 3 15IHU6 Laptop With 15.6-inch Display / Intel Core i7-11370H Processor /16GB RAM / 512GB SSD / Nvidia GeForce RTX 3050 4GB Series / DOS / English/Arabic Shadow Black</p>
                  <div className="d-flex w-100 align-items-center rounded px-2">
          <div className="left w-50">
          <p className='text-muted pt-2'>Lenovo</p>
          </div>
          <div className="right w-50 text-end">
            <p className='text-muted h6'>EGP 29,699.00</p>
          </div>
          </div>
                  </div>
            </div>
          </Link>
              </div>
              <div className="col-md-12 mb-4 bg-white rounded px-0 overflow-hidden">
              <Link to={'/product-details/6408da1c6406cd15828e8f0a'} >
              <div className="card rounded " style={{'maxHeight': '60.5rem'}}>
                  <img src='https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301723375-1.jpeg' className={`card-img-top mb-5  w-25 mx-auto h-25 py-5 px-0 ${styles.scale} `} alt="..."/>
                  <div className="card-body mt-2">
          <p className='fw-semibold text-truncate '>Victus 16-D1016Ne Laptop With 16-Inch Display Core I7-12700H Processor 16Gb Ram 1Tb Nvidia Geforce Rtx3050 Ti Graphics English/Arabic Ceramic White</p>
                  <div className="d-flex w-100 align-items-center  px-2">
          <div className="left w-50">
          <p className='text-muted pt-2'>Dell</p>
          </div>
          <div className="right w-50 text-end">
            <p className='text-muted h6'>EGP 42,960.00</p>
          </div>
          </div>
                  </div>
            </div>
          </Link>
              </div>
            </div>

          </div>

          <div className="col-lg-8 mb-4 bg-white rounded flex-grow-1 ">
                          <Link to={'/product-details/6408d5046406cd15828e8eec'} >
                          <div className="card border-0 py-0 my-0" style={{'maxHeight': '41rem'}}>
                              <img src='https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678300420239-1.jpeg' className="card-img-top mb-5 w-50 mx-auto" alt="..."/>
                              <div className="card-body mt-4 pt-5">
                      <p className='fw-semibold text-truncate '>IdeaPad 5 Laptop with 15.6 inch Core i5-1135G7 8 GB ram 512 GB SSD 4 GB Intel Xe Graphics Windows 11 English/Arabic Abyss Blue</p>
                            
                              <div className="d-flex w-100 mx-auto align-items-center  overflow-hidden p-2">
                      <div className="left w-75">
                      <p className='text-muted '>Lenovo</p>
                      </div>
                      <div className="right w-25 text-end">
                        <p className='text-muted '>EGP 16,799.00</p>
                      </div>
                      </div>
                              </div>
                        </div>
                      </Link>
          </div>


          <h3 className='h2 py-5 fw-bold'>Accessories</h3>


          <div className="col-lg-8 mb-4 me-4 bg-white rounded flex-grow-1 ">
                          <Link to={'/product-details/6408de536406cd15828e8f10'} >
                          <div className="card border-0 py-0 my-0" style={{'maxHeight': '41rem'}}>
                              <img src='https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678302803185-10.jpeg' className="card-img-top w-50 mb-5 mx-auto" alt="..."/>
                              <div className="card-body mt-4 pt-5">
                      <p className='fw-semibold text-truncate '>WH-CH510 Wireless On-Ear Bluetooth Headphones Black</p>
                            
                              <div className="d-flex w-100 mx-auto align-items-center overflow-hidden p-2">
                      <div className="left w-75">
                      <p className='text-muted '>SONY</p>
                      </div>
                      <div className="right w-25 text-end">
                        <p className='text-muted '>EGP 1,949.00</p>
                      </div>
                      </div>
                              </div>
                        </div>
                      </Link>
          </div>

          <div className="col-lg-3 px-0  rounded h-25 px-2">
            <div className="row d-flex justify-content-center align-items-center">

              <div className="col-md-12 mb-4 bg-white rounded px-0 overflow-hidden">
              <Link to={'/product-details/6408e05d6406cd15828e8f16'}  className='rounded'>
              <div className="card rounded  " style={{'maxHeight': '60.5rem'}}>
              
                <img src='https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678303324664-1.jpeg' className={`card-img-top mb-5  w-25 mx-auto h-25 py-5 px-0  ${styles.scale} `} alt="..."/>

                
                  <div className="card-body mt-2 ">
          <p className='fw-semibold text-truncate '>Galaxy Buds 2 Graphite</p>
                  <div className="d-flex w-100 align-items-center rounded px-2">
          <div className="left w-50">
          <p className='text-muted pt-2'>SONY</p>
          </div>
          <div className="right w-50 text-end">
            <p className='text-muted h6'>EGP 3,999.00</p>
          </div>
          </div>
                  </div>
            </div>
          </Link>
              </div>
              <div className="col-md-12 mb-4 bg-white rounded px-0 overflow-hidden">
              <Link to={'/product-details/6408e1266406cd15828e8f1c'} >
              <div className="card rounded " style={{'maxHeight': '60.5rem'}}>
                  <img src='https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678303526286-1.jpeg' className={`card-img-top mb-5  w-25 mx-auto h-25 py-5 px-0 ${styles.scale} `} alt="..."/>
                  <div className="card-body mt-2">
          <p className='fw-semibold text-truncate '>PS5 DualSense Charging Station</p>
                  <div className="d-flex w-100 align-items-center  px-2">
          <div className="left w-50">
          <p className='text-muted pt-2'>Samsung</p>
          </div>
          <div className="right w-50 text-end">
            <p className='text-muted h6'>EGP 1,045.00</p>
          </div>
          </div>
                  </div>
            </div>
          </Link>
              </div>
            </div>

          </div>
          </div>
        </div>




      </div>
    </div>
    <div className="container mb-5 py-5">
      <div className="row py-5 mb-5">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 px-0 mx-0">
              <img src={storyPhoto} className='w-100' alt="storyPhoto" />
            </div>
            <div className="col-md-6 bg-prim d-flex flex-column align-items-center justify-conttent-center py-5 ">
                  <div className="w-50 my-auto d-flex flex-column align-items-center justify-conttent-center">
                  <span className="badge text-bg-light  mx-auto text-center rounded-pill px-4 p-3 my-5">Our Story</span>
                   <h2 className='h1 fw-bold '>SOPA</h2>

                  </div>

                  
            </div>
          </div>
        </div>
        <div className="col-md-4 border rounded-end d-flex flex-column align-items-center justify-conttent-center">
          <div className="  d-flex flex-column align-items-center my-auto ">
          <p className='h6 text-center fw-semibold mt-2 pt-3 w-75 pb-3'> <span className='d-block'> SOPA</span>
              was born out of a simple yet powerful concept - creating a shoe that you would choose to wear every single day, and they've brought this idea to life in the bustling city of 
              New York.</p>
              <button className='bg-prim rounded-pill mb-3'>Learn more</button>
          </div>

        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 px-0 mx-0">
              <img src={content} className='w-100' alt="storyPhoto" />
            </div>
            <div className="col-md-6 bg-prim d-flex flex-column align-items-center justify-conttent-center py-3 ">
                  <div className="w-75 my-auto d-flex flex-column align-items-center justify-conttent-center">
                  <span className="badge text-bg-light  mx-auto text-center rounded-pill px-4 p-3 my-5">Featured</span>
                   <h2 className='h1 fw-bold text-center'>Humans of New York</h2>

                  </div>

                  
            </div>
          </div>
        </div>
        <div className="col-md-4 border rounded-end d-flex flex-column align-items-center justify-conttent-center">
          <div className="  d-flex flex-column align-items-center my-auto ">
          <p className='h5 text-center fw-semibold mt-2 mb-3 pt-5 w-75 pb-3'> Read our co-founder Sidra’s story about struggle, chasing dreams, and making shoes.</p>
              <button className='bg-prim rounded-pill mb-2'>Learn more</button>
          </div>

        </div>
      </div>

      <div className="row py-5">
        <h2 className='mx-auto h1 fw-bold w-50 text-center mb-5 pt-5'>SOPA in Everyday</h2>
        <p className='mx-auto fw-bold w-75 text-center mb-5'>@sopa</p>
        <div className="row d-flex justify-content-around mx-auto">
          <div className="col-md-6 col-lg-3 mb-3  ">
          <img src={sopa1} className=' w-100' alt="" />

          </div>
          <div className="col-md-6 col-lg-3 mb-3 ">
          <img src={sopa2} className=' w-100' alt="" />

          </div>
          <div className="col-md-6 col-lg-3 mb-3 ">
          <img src={sopa3} className=' w-100' alt="" />

          </div>
          <div className="col-md-6 col-lg-3 mb-3 ">
          <img src={sopa4} className=' w-100' alt="" />

          </div>


        </div>
      </div>
    </div>
  
    </>
  )
}
