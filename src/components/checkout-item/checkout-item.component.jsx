import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import './checkout-item.styles.scss'


const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;
    const { addItemToCart, subtractItemFromCart, removeItemFromCart } = useContext(CartContext);

    const lessHandler = (event) => {subtractItemFromCart(cartItem)};
    const moreHandler = (event) => {addItemToCart(cartItem)};
    const removeHandler = (event) => {removeItemFromCart(cartItem);}
    return (
      <div className="checkout-item-container">
        <div className="image-container">
            <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div onClick={lessHandler} className="arrow">&#10094;</div>
            <span className="value">{quantity}</span>
            <div onClick={moreHandler} className="arrow">&#10095;</div>
        </span>
        <span className="price">{price}</span>
        <span onClick={removeHandler} className="remove-button">&#10005;</span>
      </div>
    );
  };

export default CheckoutItem;