import { createContext, useState } from "react";

export let CounterContext = createContext(0);
export default function CounterContextProvider(props){

    const [counter,setCounter]=useState(10);
    const [userName,setUserNAme]=useState("Mou");

    function increment(){
        // console.log('welcome');
        setCounter(counter+1);
    }

    
    function decrement(){
        // console.log('welcome');
        setCounter(counter-1);
    }

    return<CounterContext.Provider value={{counter,userName,increment,decrement}}>
        {props.children}
    </CounterContext.Provider>
}