import { useEffect } from 'react';
import {
  useDeleteCartMutation,
  useUpdateQtyMutation,
} from '../redux/APIS/cartApi.js';
import { toast } from 'react-hot-toast';
export default function CartItem({ item, qty }) {
  const [updateQty, { data, isLoading, isSuccess }] = useUpdateQtyMutation();
  const [deleteCart, { data: deleteData, isSuccess: deleteIsSuccess }] =
    useDeleteCartMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success('Updated cart');
    }
    if (deleteIsSuccess) {
      toast.success('Successfully removed from cart');
    }
  }, [isSuccess, deleteIsSuccess]);
  function onHandleInc() {
    const body = {
      product_id: item._id,
      inc: true,
    };
    updateQty(body);
  }
  function onHandleDec() {
    const body = {
      product_id: item._id,
      inc: false,
    };
    updateQty(body);
  }
  function onClickDelete() {
    const body = {
      product_id: item?._id,
    };
    deleteCart(body);
  }
  return (
    <li className="cart_item">
      <div className="cart_item_poster">
        <img src={item.thumbnail} />
      </div>
      <div className="cart_product_details">
        <h3>{item.title}</h3>
        <p>{item.brand}</p>
        <p>{item.rating} (Rating)</p>
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
        <h2>{item.price * qty}$</h2>
      </div>
    </li>
  );
}
