import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
  categoriesMap: {},
});


export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    // useEffect(()=>{
    //   //first arg is name we want for the collection
    //   //second arg is data we want to add
    //   addCollectionAndDocuments('categories', SHOP_DATA);
    // },[])

    //when using async promises within useEffect, create async await entirely within callback function
    //then, once promise is complete, call the function to access data from api hook
    useEffect(()=>{
      const getCategoriesMap = async () => {

        const categoryMap = await getCategoriesAndDocuments();
        setCategoriesMap(categoryMap);
      }
      getCategoriesMap();

    },[]);

    const value = { categoriesMap };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}