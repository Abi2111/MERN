import { useGetUserOrdersQuery } from '../../redux/APIS/orderApi.js';
import Loader from './../Loader.js';
import { MDBDataTable } from 'mdbreact';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import ProductLayout from '../../Layouts/ProductLayout.js';
import { Link } from 'react-router-dom';
export default function Orders() {
  const { data, isLoading, error } = useGetUserOrdersQuery();
  console.log('orders', data);
  function setData() {
    const orders = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Amount paid',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Order status',
          field: 'orderStatus',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],

      rows: [],
    };
    data?.order?.forEach(order => {
      orders.rows.push({
        id: order?._id,
        amount: `${order?.totalAmount * 80}`,
        status: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <Link
              to={`/me/order/${order?._id}`}
              className="btn-order btn-primary"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/me/order/invoice/${order?._id}`}
              className="btn-order btn-success ms-2"
            >
              <i className="fa fa-print"></i>
            </Link>
          </>
        ),
      });
    });
    return orders;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ProductLayout>
      <div>
        <h1 className="my-5">{data?.order?.length} Total Orders</h1>
        <MDBDataTable
          data={setData()}
          className="px-3"
          bordered
          striped
          hover
        />
      </div>
    </ProductLayout>
  );
}
