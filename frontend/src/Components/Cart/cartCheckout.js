import { Link } from 'react-router-dom';
import { useGetCartQuery } from '../../redux/APIS/cartApi.js';
import Loader from './../Loader.js';
import { useDispatch } from 'react-redux';
import {
  SetShippingAmount,
  setItemsPrice,
  setOrderItems,
  setTotalAmount,
} from '../../redux/slices/orderSlice.js';
import { useEffect, useState } from 'react';
export default function CartCheckout() {
  const [discount, setDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [itemsPrice, setItemsprice] = useState(0);
  const [shippingRate, setShippingRate] = useState(0);
  const [totalAmount, setTotalamount] = useState(0);

  const { data, isLoading } = useGetCartQuery();
  const dispatch = useDispatch();
  console.log(data?.items);
  ////////////////////////////////////////////////////////

  function getDiscount(data) {
    return data?.cart?.totalPrice * 83 > 1000 ? 200 : 0;
  }

  function getDeliveryCharges(data) {
    return data?.cart?.totalPrice * 83 > 1000 ? 0 : 120;
  }

  function getItemsPrice(data) {
    return data?.cart?.totalPrice;
  }

  function getShippingRate(data) {
    return data?.cart?.totalPrice * 83 > 1000 ? 120 : 0;
  }

  function getTotalAmount() {
    return (
      getDiscount() +
      getDeliveryCharges() +
      getItemsPrice() +
      getShippingRate() +
      100
    );
  }

  useEffect(() => {
    dispatch(setOrderItems(data?.cart?.items));
    dispatch(setItemsPrice(data?.cart?.totalPrice));
    dispatch(SetShippingAmount(getShippingRate()));
    setDeliveryCharges(getDeliveryCharges(data));
    setDiscount(getDiscount(data));
    setItemsprice(getItemsPrice(data));
    setShippingRate(getShippingRate(data));
    setTotalamount(
      getDeliveryCharges(data) +
        getItemsPrice(data) +
        getShippingRate(data) -
        getDiscount(data)
    );
    dispatch(
      setTotalAmount(
        getDeliveryCharges(data) +
          getItemsPrice(data) +
          getShippingRate(data) -
          getDiscount(data)
      )
    );
  }, [data]);

  console.log(data);
  if (isLoading) {
    return <Loader />;
  }
  console.log(itemsPrice);

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="">Your cart</span>
        <span className="badge badge-secondary badge-pill">3</span>
      </h4>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex ">
          <div>
            <h6 className="my-0 checkout__product--price">
              Price ({data?.cart?.totalQty} items)
            </h6>
          </div>
          <span className="checkout__product--price">₹{itemsPrice}</span>
        </li>

        <li className="list-group-item d-flex ">
          <div>
            <h6 className="my-0 checkout__product--price">Discount</h6>
          </div>
          <span className="checkout__product--price">₹{discount}</span>
        </li>

        <li className="list-group-item d-flex ">
          <div>
            <h6 className="my-0 checkout__product--price">Delivery charges</h6>
          </div>
          <span className="checkout__product--price">₹{deliveryCharges}</span>
        </li>

        <li className="list-group-item d-flex ">
          <div>
            <h6 className="my-0 checkout__product--price">
              Secured Packaging Fee
            </h6>
          </div>
          <span className="checkout__product--price"> ₹{100}</span>
        </li>

        <li className="list-group-item  ">
          <div>
            <h6 className="my-0 checkout__product--price">Shipping rate</h6>
          </div>
          <span className="checkout__product--price">₹{shippingRate}</span>
        </li>

        <li className="list-group-item d-flex justify-content-between">
          <span className="checkout__total-price">Total Amount</span>
          <strong>₹{totalAmount}</strong>
        </li>

        <li className="list-group-item d-flex justify-content-between">
          <Link className="checkout" to="/shipping">
            Checkout
          </Link>
        </li>
      </ul>
    </div>
  );
}
