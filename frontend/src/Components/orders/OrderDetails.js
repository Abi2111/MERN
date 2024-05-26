import { Link, useParams } from 'react-router-dom';
import ProductLayout from '../../Layouts/ProductLayout.js';
import { useGetOrderDetailsQuery } from '../../redux/APIS/orderApi.js';
import Loader from '../Loader.js';

export default function OrderDetails() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, error } = useGetOrderDetailsQuery(id);
  console.log(data);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ProductLayout>
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-9 mt-5 order-details">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-5 mb-4">Your Order Details</h3>
            <Link
              className="btn btn-success"
              to={`/invoice/order/${data?.order?._id}`}
            >
              <i className="fa fa-print"></i> Invoice
            </Link>
          </div>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{data?.order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Status</th>
                <td className="greenColor">
                  <b>{data?.order?.orderStatus}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Date</th>
                <td>{new Date(data?.order?.createdAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Shipping Info</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>John Doe</td>
              </tr>
              <tr>
                <th scope="row">Phone No</th>
                <td>{data?.order?.shippingInfo.phoneNo}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{data?.order?.shippingInfo.address}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Payment Info</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Status</th>
                <td className="greenColor">
                  <b>PAID</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Method</th>
                <td>{data?.order?.paymentMethod}</td>
              </tr>
              <tr>
                <th scope="row">Stripe ID</th>
                <td>stripe-id</td>
              </tr>
              <tr>
                <th scope="row">Amount Paid</th>
                <td>&#8377;{data?.order?.totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Order Items:</h3>

          <hr />
          {data?.products.map(product => (
            <div className="cart-item my-1">
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={product?.thumbnail}
                    alt="Product Name"
                    height="45"
                    width="65"
                  />
                </div>

                <div className="col-5 col-lg-5">
                  <Link to={`/products/${product?._id}`}>{product?.title}</Link>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>&#8377; {product?.price * 83}</p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{data?.order?.orderItems.length}</p>
                </div>
              </div>
            </div>
          ))}
          <hr />
        </div>
      </div>
    </ProductLayout>
  );
}
