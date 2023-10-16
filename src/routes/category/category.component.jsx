import { useParams } from "react-router";
import { useContext, useState, useEffect, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, CategoryTitle} from './category.styles.jsx';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
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