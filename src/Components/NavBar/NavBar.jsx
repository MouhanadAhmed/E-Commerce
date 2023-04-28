import React, { useContext } from 'react'
import './NavBar.module.css'
import { Link } from 'react-router-dom';
import logo from '../../Assets/Images/logo.PNG'
import { CounterContext } from '../../Context/CounterContext';

export default function NavBar({userData,logOut}) {
  let {counter} = useContext(CounterContext);
  return (<>
  <nav className="navbar navbar-expand-lg " >
    <div className="container-fluid">
        <Link className="navbar-brand text-white" to={"/"}><img src={logo} alt="" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null?      
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active text-white"  to={"/"}>Home
                  </Link>
                </li>  
                <li className="nav-item">
                  <Link className="nav-link active text-white"  to={"brands"}>Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to={"products"}>Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to={"cart"}>Cart</Link>
                </li>

              </ul>: null}

            <form className="d-flex  w-25" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            </form>
             
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userData === null?
              <>        
                <li className="nav-item">
                  <Link className="nav-link active text-white"  to={"login"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to={"register"}>Register</Link>
                </li></>:     <>

                <li className='nav-item'>
                <h2 className='nav-link active text-white'>{counter}</h2>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-white cursor-pointer" onClick={logOut} >Logout</span>
                </li>
                </>   }
            </ul>
        </div>
    </div>
  </nav>
</>)
}
