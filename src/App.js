
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Brands from './Components/Brands/Brands';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';


function App() {
  useEffect(()=>{
    if(localStorage.getItem("userToken") !== null){
      saveUserData();
    }
  },[])

  const [userData,setUserData]=useState(null);


  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    // console.log(userData);
  }



  const routes= createBrowserRouter([
    { path:"",
    element: <Layout setUserData={setUserData} userData={userData}/> ,
    children:[
      {index:true, element:<ProtectedRoute> <Home/></ProtectedRoute> },
      {path:"login", element:<Login saveUserData={saveUserData}/>},
      {path :"register", element:<Register/>, children:[
        {index:true, element:<Register/>},
        {path:"login", element:<Login saveUserData={saveUserData}/>}
      ]},
      {path:"cart", element:<ProtectedRoute><Cart/></ProtectedRoute>}, 
      {path:"brands", element:<ProtectedRoute><Brands/></ProtectedRoute>}, 
      {path:"brandproducts/:id", element:<ProtectedRoute><BrandProducts/></ProtectedRoute>}, 
      {path:"categoryproducts/:id", element:<ProtectedRoute><CategoryProducts/></ProtectedRoute>}, 

      {path:"products", element:<ProtectedRoute> <Products/></ProtectedRoute> },
      {path:"product-details/:id", element:<ProtectedRoute> <ProductDetails/></ProtectedRoute> },
      {path:"E-Commerce" , element:<ProtectedRoute> <Home/></ProtectedRoute> },
      {path:"*", element:<ProtectedRoute><NotFound/></ProtectedRoute>},
    ]}
  ])




  return (
    <CartContextProvider>
        <Toaster/>
        <RouterProvider router={routes}></RouterProvider>
      
    </CartContextProvider>

  );
}

export default App;
