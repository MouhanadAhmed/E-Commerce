import axios from "axios";
import { createContext ,useState} from "react";

export let cartContext = createContext();


export function CartContextProvider(props){
    const baseUrls =['https://ecommerce.routemisr.com','https://route-ecommerce.onrender.com','https://route-ecommerce-app.vercel.app'];

    const [counter,setCounter]=useState(0);
    const [baseUrl,setBaseUrl]=useState(baseUrls[0]);

    let headers={
        token:localStorage.getItem('userToken')
    }

    function addToCart(productId){
       return axios.post(`${baseUrl}/api/v1/cart`,{
            productId
        },
        {
            headers
        }).then((response)=> response)
        .catch((err)=>{
            console.log('addToCart Error',err.code);
            if (err.code === "ERR_NETWORK") {
                handleBaseUrl(baseUrl);
            }
        })
    }
    function getLoggedUserCart(){
        return axios.get(`${baseUrl}/api/v1/cart`,
         {
             headers
         }).then((response)=> response)
         .catch((err)=>{
            console.log('getLoggedUserCart Error',err.code);
            if (err.code === "ERR_NETWORK") {
                handleBaseUrl(baseUrl);
            }
        })
     }
     function removeItem(productId){
        return axios.delete(`${baseUrl}/api/v1/cart/${productId}`,
         {
             headers
         }).then((response)=> response)
         .catch((err)=>{
            console.log('removeItem Error',err.code);
            if (err.code === "ERR_NETWORK") {
                handleBaseUrl(baseUrl);
            }
        })
     }
     function updateProductCount(productId , count){
        return axios.put(`${baseUrl}/api/v1/cart/${productId}`,{
            count
        },
         {
             headers
         }).then((response)=> response)
         .catch((err)=>{
            console.log('updateProductCount Error',err.code);
            if (err.code === "ERR_NETWORK") {
                handleBaseUrl(baseUrl);
            }
        })
     }

     function addToWishlist(productId){
        return axios.post(`${baseUrl}/api/v1/wishlist`,{
             productId
         },
         {
             headers
         }).then((response)=> response)
         .catch((err)=>{
             console.log('addToWishlist Error',err.code);
             if (err.code === "ERR_NETWORK") {
                 handleBaseUrl(baseUrl);
             }
         })
     }

     function removeFromWishlist(productId){
        return axios.delete(`${baseUrl}/api/v1/wishlist/${productId}`,
         {
             headers
         }).then((response)=> response)
         .catch((err)=>{
            console.log('removeFromWishlist Error',err.code);
            if (err.code === "ERR_NETWORK") {
                handleBaseUrl(baseUrl);
            }
        })
     }
     function getLoggedUserWishlist(productId){
        return axios.get(`${baseUrl}/api/v1/wishlist`,
         {
             headers
         }).then((response)=> response)
         .catch((err)=>{
            console.log('getLoggedUserWishlist Error',err.code);
            if (err.code === "ERR_NETWORK") {
                handleBaseUrl(baseUrl);
            }
        })
     }

     function increment(){
        // console.log('welcome');
        setCounter(counter+1);
    }

    
    function decrement(){
        // console.log('welcome');
        setCounter(counter-1);
    }
    function handleBaseUrl(){
            switch (baseUrl) {
                case baseUrls[0]:
                    setBaseUrl(baseUrls[1]);
                    break;
                    case baseUrls[1]:
                        setBaseUrl(baseUrls[2]);
                        break;
                        case baseUrls[2]:
                            setBaseUrl(baseUrls[0]);
                            break;
                default:
                    break;
            }
        
    }
    return <cartContext.Provider value={{addToCart,getLoggedUserCart,removeItem,updateProductCount,increment,decrement,counter,setCounter,baseUrl,setBaseUrl,baseUrls,handleBaseUrl,getLoggedUserWishlist,addToWishlist,removeFromWishlist,headers}}>
        {props.children}
    </cartContext.Provider>
}