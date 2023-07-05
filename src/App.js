
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/MainPage/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Authentication/Login/Login';
import Register from './Components/Authentication/Register/Register';
import Cart from './Components/Cart/Cart';
import Products from './Components/Product/Products/Products';
import NotFound from './Components/Helpers/NotFound/NotFound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/Product/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Brands from './Components/Brand/Brands/Brands';
import BrandProducts from './Components/Brand/BrandProducts/BrandProducts';
import CategoryProducts from './Components/Category/CategoryProducts/CategoryProducts';
import  history  from './Components/Helpers/History/History';
import FeaturedProducts from './Components/Product/FeaturedProducts/FeaturedProducts.jsx';
import ForgotPassword from './Components/Authentication/ForgotPassword/ForgotPassword';
import VerifyResetCode from './Components/Authentication/VerifyResetCode/VerifyResetCode';
import ResetPassword from './Components/Authentication/ResetPassword/ResetPassword';
import UserProfile from './Components/User/UserProfile/UserProfile';
import MyDetails from './Components/User/MyDetails/MyDetails';
import MyAddressBook from './Components/User/MyAddressBook/MyAddressBook';
import MyOrders from './Components/User/MyOrders/MyOrders';
import AccountSettings from './Components/User/AccountSettings/AccountSettings';
import Wishlist from './Components/Wishlist/Wishlist';
import Checkout from './Components/Orders/Checkout/Checkout';
import Shipping from './Components/Orders/Shipping/Shipping';
import Payment from './Components/Orders/Payment/Payment';


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
        {path:"login", element:<Login saveUserData={saveUserData}/>},
      ]},
      {path:"forgotPassword", element: <ForgotPassword></ForgotPassword>, children:[
        {path:"verifyResetCode", element: <VerifyResetCode/> , children:[
          {path:"resetPassword", element: <ResetPassword/>},
        ]},
      ]},
      {path:"resetPassword", element: <ResetPassword/>},
      {path:"verifyResetCode", element: <VerifyResetCode/>},
      {path:"userProfile", element: <ProtectedRoute><UserProfile/></ProtectedRoute> ,children:[
        {path:"myDetails", element: <MyDetails/>},
        {path:"myAddressBook", element: <MyAddressBook/>},
        {path:"myOrders", element: <MyOrders/>},
        {path:"accountSettings", element: <AccountSettings/>},
      ]},
      {path:"allorders", element:<ProtectedRoute><MyOrders/></ProtectedRoute>}, 
      {path:"payment", element:<ProtectedRoute><Payment/></ProtectedRoute>}, 
      {path:"shipping", element:<ProtectedRoute><Shipping/></ProtectedRoute>}, 
      {path:"checkout", element:<ProtectedRoute><Checkout/></ProtectedRoute>}, 
      {path:"wishlist", element:<ProtectedRoute><Wishlist/></ProtectedRoute>}, 
      {path:"cart", element:<ProtectedRoute><Cart/></ProtectedRoute>}, 
      {path:"brands", element:<ProtectedRoute><Brands/></ProtectedRoute>}, 
      {path:"brandproducts/:id", element:<ProtectedRoute><BrandProducts/></ProtectedRoute>}, 
      {path:"categoryproducts/:id", element:<ProtectedRoute><CategoryProducts/></ProtectedRoute>}, 
      {path:"featuredProducts", element:<ProtectedRoute> <FeaturedProducts/></ProtectedRoute> },

      {path:"products/:id", element:<ProtectedRoute> <Products/></ProtectedRoute> },
      {path:"product-details/:id", element:<ProtectedRoute> <ProductDetails/></ProtectedRoute> },
      {path:"E-Commerce" , element:<ProtectedRoute> <Home/></ProtectedRoute> },
      {path:"*", element:<ProtectedRoute><NotFound/></ProtectedRoute>},
    ]}
  ])




  return (
    <CartContextProvider>
        <Toaster/>
        <RouterProvider history={history} router={routes}></RouterProvider>
      
    </CartContextProvider>

  );
}


export default App;
