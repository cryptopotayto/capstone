import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles.jsx';
import Spinner from "../spinner/spinner.component";
import { selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import { useSelector } from "react-redux";


const CategoryPreview = ({ title, products }) => {
    const isLoading = useSelector(selectCategoriesIsLoading);

    
    return (
        <CategoryPreviewContainer>
            <h2>
                <Link to={title}>
                    <Title>{title.toUpperCase()}</Title>
                </Link>
            </h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <Preview>
                {
                    products
                        .filter((_, idx) => idx <  4)
                        .map((product) => 
                        <ProductCard key={product.id} product={product} />)
                }
                </Preview>
    )}
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;