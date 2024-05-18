import { useEffect } from 'react';
import ProductLayout from '../Layouts/ProductLayout.js';
import { useGetCartQuery } from '../redux/APIS/cartApi.js';
import CartItem from './cartItem.js';
import Loader from './Loader.js';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { data, isLoading, error } = useGetCartQuery();
  if (isLoading) {
    <Loader />;
  }
  console.log(error);

  if (error) {
    return (
      <ProductLayout>
        <div className="cart_container">
          <h1 className="cart_heading">Shopping Cart</h1>
          <hr></hr>
          <h4>No cart items please add products into cart</h4>
          <Link className="cart_no_items" to="/products">
            Products
          </Link>
        </div>
      </ProductLayout>
    );
  }
  return (
    <ProductLayout>
      <div className="cart_container">
        <h1 className="cart_heading">Shopping Cart</h1>
        <hr></hr>
        <h4>{data?.items.length} Product on your cart</h4>
        <div className="cart_items_container">
          <ul className="cart_items">
            {data?.items.map((item, i) => {
              return <CartItem item={item?.product} qty={item.qty} key={i} />;
            })}
          </ul>
        </div>
      </div>
    </ProductLayout>
  );
}
