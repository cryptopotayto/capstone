import { useContext, useEffect } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  CheckoutTotal
} from './checkout.styles.jsx';

const Checkout = () => {
  const { setIsCartOpen } = useContext(CartContext);
  
  useEffect(()=> {
    const closeCart = () => setIsCartOpen(false);
    closeCart();
  });

  const { cartItems, cartTotal } = useContext(CartContext);

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