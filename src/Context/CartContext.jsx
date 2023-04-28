import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext();

export function CartContextProvider(props){
    let headers={
        token:localStorage.getItem('userToken')
    }

    function addToCart(productId){
       return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,{
            productId
        },
        {
            headers
        }).then((response)=> response)
        .catch((err)=>err)
    }
    function getLoggedUserCart(productId){
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
         {
             headers
         }).then((response)=> response)
         .catch((err)=>err)
     }
     function removeItem(productId){
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
         {
             headers
         }).then((response)=> response)
         .catch((err)=>err)
     }
     function updateProductCount(productId , count){
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{
            count
        },
         {
             headers
         }).then((response)=> response)
         .catch((err)=>err)
     }
    return <cartContext.Provider value={{addToCart,getLoggedUserCart,removeItem,updateProductCount}}>
        {props.children}
    </cartContext.Provider>
}