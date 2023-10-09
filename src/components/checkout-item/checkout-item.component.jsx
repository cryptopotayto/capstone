

const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;
  
    return (
      <tr className='checkout-item-container'>
        <td>
            <img src={imageUrl} alt={`${name}`} />
        </td>
        <td>
            <span className='name'>{name}</span>
        </td>
        <td>
            <span>&lt;</span>
            <span> {quantity} </span>
            <span>&gt;</span>
        </td>
        <td>
        <span className='price'>{price}</span>
        </td>
        <td>
            <span> X </span>
        </td>
      </tr>
    );
  };

export default CheckoutItem;