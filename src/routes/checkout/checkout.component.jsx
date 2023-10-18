import { useEffect } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, selectIsCartOpen } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  CheckoutTotal
} from './checkout.styles.jsx';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const toggleIsCartOpen = () =>
     dispatch(setIsCartOpen(!isCartOpen));
     toggleIsCartOpen();
  },[]);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <CheckoutTotal>TOTAL: ${cartTotal}</CheckoutTotal>
    </CheckoutContainer>
  );
};

export default Checkout;