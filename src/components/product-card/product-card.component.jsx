import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {
    ProductCardContainer,
    Footer,
    CardName,
    CardPrice
} from './product-card.styles.jsx';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);
    const addProductToCart = () => addItemToCart(product);
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <CardName>{name}</CardName>
                <CardPrice>{price}</CardPrice>
            </Footer>
            <Button onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add To Cart</Button>
        </ProductCardContainer>
    );
};

export default ProductCard;