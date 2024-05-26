import { useEffect } from 'react';
import {
  useDeleteCartMutation,
  useUpdateQtyMutation,
} from '../../redux/APIS/cartApi.js';
import { toast } from 'react-hot-toast';
import ProductLayout from '../../Layouts/ProductLayout.js';
import { Link, useNavigate } from 'react-router-dom';

// Removed unused import 'Navigate'

export default function CartItem({ item, qty }) {
  const navigate = useNavigate();
  const [updateQty, { isLoading, isSuccess }] = useUpdateQtyMutation();
  const [
    deleteCart,
    { isSuccess: deleteIsSuccess, error: deleteError, isError },
  ] = useDeleteCartMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Updated cart');
    }
    if (deleteIsSuccess) {
      toast.success('Successfully removed from cart');
    }
    if (deleteError) {
      toast.error('Error removing from cart');
    }
    if (isError) {
      navigate('/login');
    }
  }, [isSuccess, deleteIsSuccess, deleteError, isError]);

  const onHandleInc = () => {
    const body = { product_id: item._id, inc: true };
    updateQty(body);
  };

  const onHandleDec = () => {
    const body = { product_id: item._id, inc: false };
    updateQty(body);
  };

  const onClickDelete = () => {
    const body = { product_id: item._id };
    deleteCart(body);
  };

  return (
    <li className="cart_item">
      <div className="cart_item_poster">
        <img src={item?.thumbnail} alt={item?.title} />
      </div>
      <div className="cart_product_details">
        <h3>{item?.title}</h3>
        <p>{item?.brand}</p>
        <p>{item?.rating} (Rating)</p>
      </div>
      <div className="cart_cta_btns">
        <button onClick={onClickDelete}>Remove</button>
        <button>Move to Wishlist</button>
        <div className="cart_qty">
          <button onClick={onHandleDec}>
            <ion-icon name="remove-outline"></ion-icon>
          </button>
          <p>{qty}</p>
          <button onClick={onHandleInc} disabled={isLoading}>
            <ion-icon name="add-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div className="cart_price">
        <h2>₹{item?.price * qty * 83}</h2>
      </div>
    </li>
  );
}
