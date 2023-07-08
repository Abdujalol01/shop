import { useState, useEffect } from "react";
import "../index.css";
import { API_KEY, API_URL } from "../config";
import Loader from "./Loader";
import ShopLists from "./ShopLists";
import Cart from "./Cart";
import BasketList from "./BasketList";
import { toast } from "react-toastify";

export default function Shop() {
  const [goods, setGoods] = useState([]);
  const [loader, setLoader] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShop, setBasketShop] = useState(false);
  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoader(false);
      });
  }, []);
  const handleBasketShow = () => {
    setBasketShop(!isBasketShop);
  };
  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return item;
        }
      });
      setOrder(newOrder);
    }
    toast.success("Goods added to basket successfully");
  };
  const removeFromBasket = (itemId) => {
    const newOrder = order.filter((item) => item.id !== itemId);
    setOrder(newOrder);
    toast.error("Goods deleted from  basket successfully");
  };

  const icrementQuantity = (itemId) => {
    const newOrder = order.map((index) => {
      if (index.id === itemId) {
        const newQuantity = index.quantity + 1;
        return {
          ...index,
          quantity: newQuantity,
        };
      } else {
        return index;
      }
    });
    setOrder(newOrder);
    toast.success("Goods added to basket successfully");
  };
  const decrementQuantity = (itemId) => {
    const newOrder = order.map((index) => {
      if (index.id === itemId) {
        const newQuantity = index.quantity - 1;
        return {
          ...index,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      } else {
        return index;
      }
    });
    setOrder(newOrder);
    toast.error("Goods deleted from  basket successfully");
  };
  return (
    <div className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loader ? (
        <Loader />
      ) : (
        <ShopLists goods={goods} addToBasket={addToBasket} />
      )}
      {isBasketShop && (
        <BasketList
          removeFromBasket={removeFromBasket}
          order={order}
          handleBasketShow={handleBasketShow}
          icrementQuantity={icrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      )}
    </div>
  );
}
