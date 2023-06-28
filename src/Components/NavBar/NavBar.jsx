import React, { useContext, useEffect  } from 'react'
import './NavBar.module.css'
import { Link } from 'react-router-dom';
import logo from '../../Assets/Images/Logo.svg'
// import { CounterContext } from '../../Context/CounterContext';
// import Badge from 'react-bootstrap/Badge';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cartContext } from '../../Context/CartContext';
export default function NavBar({userData,logOut}) {
  // let {counter} = useContext(CounterContext);
  let {getLoggedUserCart,counter,setCounter} = useContext(cartContext);
  // const [cartCount,setCartCount] =useState(0);
  
  
  async function getCart(){
    let response = await getLoggedUserCart();
    if(response?.data?.status === 'success'){
      // setCartDetails(response.data.data);
      // setCartCount(response.data.data.products.length);
      // console.log(response.data.data.products.length);
      setCounter(response.data.data.products.length);
    }
  }


  useEffect(()=>{
    getCart()
  
  })

  return (<>
  <div className="bg-prim container-fluid text-center ">
      <h6 className='py-2'>Free US shipping on order $80+</h6>
  </div>
  <nav className="navbar navbar-expand-lg " >
    <div className="container">
        <Link className="navbar-brand " to={"/"}><img src={logo} alt="" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
            {userData !== null?      
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li  className="nav-item mx-auto">
                <Link className="nav-link  " to={`/categoryproducts/6439d5b90049ad0b52b90048`}>Men
            </Link>
                </li>
                <li  className="nav-item mx-auto">
                <Link className="nav-link  " to={`/categoryproducts/6439d58a0049ad0b52b9003f`}>Women
            </Link>
                </li>
                <li className="nav-item mx-auto">
                  <Link className="nav-link  "  to={"/categoryproducts/6439d2d167d9aa4ca970649f"}>Electronics
                  </Link>
                </li>  
                <li className="nav-item mx-auto">
                  <Link className="nav-link  "  to={"brands"}>Brands
                  </Link>
                </li>
                <li className="nav-item mx-auto">
                  <Link className="nav-link " to={`products/all`}>All Products</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link " to={"cart"}>Cart</Link>
                </li> */}

              </ul>: null}
{/* 
            <form className="d-flex  w-25" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            </form> */}
             
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userData === null?
              <>        
                <li className="nav-item mx-auto">
                  <Link className="nav-link active "  to={"login"}>Login</Link>
                </li>
                <li className="nav-item mx-auto">
                  <Link className="nav-link " to={"register"}>Register</Link>
                </li></>:     <>

                <li className='nav-item mx-auto'>
                  <Link className='nav-link cursor-pointer' to={'wishlist'}>
                  <i className="fa-solid fa-heart fa-xl text-black"></i>
                  </Link>
                </li>

                <li className='nav-item mx-auto'>
                  <Link className='nav-link cursor-pointer' to={'userProfile'}>
                  <i className="fa-solid fa-user fa-xl text-black"></i>
                  </Link>
                </li>
                <li className="nav-item mx-auto">
                  <Link className="nav-link  cursor-pointer" to={"cart"} >
                      <span className="fa-layers fa-fw position-relative" >
    <i className="fa-solid text-black fa-cart-shopping fa-2xl"></i>
    <span id='cartBg' className="fa-layers-counter bg-main text-black rounded position-absolute bottom-0 end-0 h6 px-1" >{counter}</span>
    {/* <FontAwesomeIcon icon="fa-layers-counter" transform="shrink-6" inverse /> */}
  </span>
                    </Link>
                </li>
                <li className="nav-item mx-auto">
                  <span className="nav-link  cursor-pointer" onClick={logOut} >Logout</span>
                </li>
                </>   }
            </ul>
        </div>
    </div>
  </nav>
</>)
}
