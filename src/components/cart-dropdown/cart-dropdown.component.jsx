import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router';
import {CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles.jsx';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }
    return (
        <CartDropdownContainer>
            <CartItems>
            {cartItems.length ? (
                cartItems.map((cartItem) => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))
            ) : (
                <EmptyMessage>Your cart is empty</EmptyMessage>
            )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown; 