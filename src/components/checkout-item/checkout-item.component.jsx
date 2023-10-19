import { useDispatch } from 'react-redux';
import { addItemToCart, subtractItemFromCart, removeItemFromCart } from '../../store/cart/cart.reducer.js';
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
    const lessHandler = (event) => {dispatch(subtractItemFromCart(cartItem))};
    const moreHandler = (event) => {dispatch(addItemToCart(cartItem))};
    const removeHandler = (event) => {dispatch(removeItemFromCart(cartItem))};
    
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