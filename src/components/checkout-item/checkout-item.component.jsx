import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, subtractItemFromCart, removeItemFromCart } from '../../store/cart/cart.action.js';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import { 
  CheckoutItemContainer,
  ImageContainer,
  DataSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton
} from './checkout-item.styles.jsx'

const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const lessHandler = (event) => {dispatch(subtractItemFromCart(cartItems, cartItem))};
    const moreHandler = (event) => {dispatch(addItemToCart(cartItems, cartItem))};
    const removeHandler = (event) => {dispatch(removeItemFromCart(cartItems, cartItem))};
    
    return (
      <CheckoutItemContainer>
        <ImageContainer>
            <img src={imageUrl} alt={`${name}`} />
        </ImageContainer>
        <DataSpan>{name}</DataSpan>
        <Quantity>
            <Arrow onClick={lessHandler}>&#10094;</Arrow>
            <Value>{quantity}</Value>
            <Arrow onClick={moreHandler}>&#10095;</Arrow>
        </Quantity>
        <DataSpan>{price}</DataSpan>
        <RemoveButton onClick={removeHandler}>&#10005;</RemoveButton>
      </CheckoutItemContainer>
    );
  };

export default CheckoutItem;