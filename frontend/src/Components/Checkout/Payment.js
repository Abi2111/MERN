import { useDispatch, useSelector } from 'react-redux';
import ProductLayout from '../../Layouts/ProductLayout.js';
import { setPaymentMethod } from '../../redux/slices/orderSlice.js';
import { orderApi, useNewOrderMutation } from '../../redux/APIS/orderApi.js';
import { useNavigate } from 'react-router-dom';
export default function Payment() {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);

  const [newOrder, { data }] = useNewOrderMutation();
  const navigate = useNavigate();
  console.log(data);
  function onSubmit(e) {
    e.preventDefault();
    console.log(e.target.payment_mode.value);
    newOrder(order);
    navigate('/me/orders');
  }
  return (
    <ProductLayout>
      <>
        <div className="payment_container">
          <form className="" onSubmit={onSubmit}>
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={e => {
                  dispatch(setPaymentMethod(e.target.value));
                }}
              />
              <label className="form-check-label" for="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="CARD"
                onChange={e => {
                  dispatch(setPaymentMethod(e.target.value));
                }}
              />
              <label className="form-check-label" for="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button id="shipping_btn" type="submit" className="checkout-btn">
              CONTINUE
            </button>
          </form>
        </div>
      </>
    </ProductLayout>
  );
}
