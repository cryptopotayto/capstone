import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
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
    const { addItemToCart, subtractItemFromCart, removeItemFromCart } = useContext(CartContext);

    const lessHandler = (event) => {subtractItemFromCart(cartItem)};
    const moreHandler = (event) => {addItemToCart(cartItem)};
    const removeHandler = (event) => {removeItemFromCart(cartItem);}
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