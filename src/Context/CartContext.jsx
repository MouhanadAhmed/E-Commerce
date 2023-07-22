import axios from "axios";
import { createContext ,useState} from "react";

export let cartContext = createContext();


export function CartContextProvider(props){
    const baseUrls =['https://ecommerce.routemisr.com','https://route-ecommerce.onrender.com','https://route-ecommerce-app.vercel.app'];

    const [counter,setCounter]=useState(0);
    const [baseUrl,setBaseUrl]=useState(baseUrls[0]);
    const [userWishlist,setUserWishlist]= useState([]);
    const [userCart,setUserCart]= useState([]);

    let headers={
        token:localStorage.getItem('userToken')
    }

    async function addToCart(productId){
       try {
            const response = await axios.post(`${baseUrl}/api/v1/cart`, {
                productId
            },
                {
                    headers
                });
                // console.log("add to cart",response.data.data.products);
                let temp =[];
                response?.data?.data?.products?.map((product)=> temp.push(product.product));
                setUserCart(temp)
            //    console.log("addToCart",userCart);
                setCounter(response.data.data.products.length+1);
            return response;
        } catch (err) {
            console.log('addToCart Error', err.code);
            if (err.code === "ERR_NETWORK") {
                handleBaseUrl(baseUrl);
            }
        }
    }
    async function getLoggedUserCart(){
        try {
            const response = await axios.get(`${baseUrl}/api/v1/cart`,
                {
                    headers
                });
                
                // setUserCart(response.data.data.products);
                // console.log(response?.data?.data?.products);
                let temp =[];
                response?.data?.data?.products?.map((product)=> temp.push(product.product.id));
                setUserCart(temp)
            //    console.log("removeItem",userCart);
                // console.log("getLoggedUserCart",userCart);
                setCounter(response.data.data.products.length+1);
                // console.log("counter",counter);
            return response;
        } catch (err) {
            console.log('getLoggedUserCart Error', err.code);
            if (err.code === "ERR_NETWORK") {
                handleBaseUrl(baseUrl);
            }
        }
        
     }
     async function removeItem(productId){
        try {
             const response = await axios.delete(`${baseUrl}/api/v1/cart/${productId}`,
                 {
                     headers
                 });
                //  console.log("removeItem cart",response.data.data.products);
                //  setUserCart(response.data.data.products);
                let temp =[];
                  response?.data?.data?.products?.map((product)=> temp.push(product.product.id));
                  setUserCart(temp)
                //  console.log("removeItem",userCart);
                 setCounter(response.data.data.products.length+1);
             return response;
         } catch (err) {
             console.log('removeItem Error', err.code);
             if (err.code === "ERR_NETWORK") {
                 handleBaseUrl(baseUrl);
             }
         }
     }
     async function updateProductCount(productId , count){
        try {
             const response = await axios.put(`${baseUrl}/api/v1/cart/${productId}`, {
                 count
             },
                 {
                     headers
                 });
             return response;
         } catch (err) {
             console.log('updateProductCount Error', err.code);
             if (err.code === "ERR_NETWORK") {
                 handleBaseUrl(baseUrl);
             }
         }
     }

     async function addToWishlist(productId){
        try {
             const response = await axios.post(`${baseUrl}/api/v1/wishlist`, {
                 productId
             },
                 {
                     headers
                 });
            //    console.log("addToWishlist",response.data.data);
               setUserWishlist(response.data.data);
             return response;
         } catch (err) {
             console.log('addToWishlist Error', err.code);
             if (err.code === "ERR_NETWORK") {
                 handleBaseUrl(baseUrl);
             }
         }
     }

     async function removeFromWishlist(productId){
        try {
             const response = await axios.delete(`${baseUrl}/api/v1/wishlist/${productId}`,
                 {
                     headers
                 });
                //    console.log("removeFromWishlist",response.data.data);
                   setUserWishlist(response.data.data);
             return response;
         } catch (err) {
             console.log('removeFromWishlist Error', err.code);
             if (err.code === "ERR_NETWORK") {
                 handleBaseUrl(baseUrl);
             }
         }
     }
     async function getLoggedUserWishlist(productId){
        try {
             const response = await axios.get(`${baseUrl}/api/v1/wishlist`,
                 {
                     headers
                 });
                //  console.log("wishlist",response.data.data);
                //  const list = []
                 response.data.data.map((product)=> userWishlist.push(product.id))
                //  setUserWishlist(response.data.data);
             return response;
         } catch (err) {
             console.log('getLoggedUserWishlist Error', err.code);
             if (err.code === "ERR_NETWORK") {
                 handleBaseUrl(baseUrl);
             }
         }
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
    return <cartContext.Provider value={{addToCart,getLoggedUserCart,removeItem,updateProductCount,increment,decrement,counter,setCounter,baseUrl,setBaseUrl,baseUrls,handleBaseUrl,getLoggedUserWishlist,addToWishlist,removeFromWishlist,headers,userWishlist,userCart}}>
        {props.children}
    </cartContext.Provider>
}