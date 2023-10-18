import { useParams } from "react-router";
import { useState, useEffect, Fragment } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, CategoryTitle} from './category.styles.jsx';
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    //since component is waiting for async call of categories map when mount
    //can set inital state value to the category at map since data is available

    const [products, setProducts] = useState(categoriesMap[category]);
    
    useEffect(()=>{
        setProducts(categoriesMap[category])
    },[category, categoriesMap]);

    return(
        <Fragment>
        
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryContainer>
        {
            //only rendering products map if promise is fulfilled
            //need to add loading symbol
            products && products.map((product) => 
            <ProductCard key={product.id} product={product} />)}
        </CategoryContainer>
        </Fragment>
        );
};

export default Category;