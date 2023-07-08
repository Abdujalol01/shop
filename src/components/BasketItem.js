function BasketItem(props) {
  const { id, name, price, quantity, icrementQuantity, decrementQuantity } =
    props;
  return (
    <li className="collection-item">
      {name} x{quantity} ={price * quantity}
      <span className="secondary-content">
        <a
          href="!#"
          className="waves-effect waves-light btn ctr"
          onClick={() => icrementQuantity(id)}
        >
          <i className="material-icons left">exposure_plus_1</i>add
        </a>
        <a
          href="!#"
          className="waves-effect waves-light btn ctr"
          onClick={() => decrementQuantity(id)}
        >
          <i className="material-icons left">exposure_minus_1</i>remove
        </a>
        <i
          className="material-icons basket-delete"
          onClick={() => props.removeFromBasket(id)}
        >
          delete_forever
        </i>
      </span>
    </li>
  );
}

export default BasketItem;
