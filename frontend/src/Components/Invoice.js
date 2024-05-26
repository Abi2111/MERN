import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from './../redux/APIS/orderApi.js';
import Loader from './Loader.js';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
export default function Invoice() {
  const params = useParams();
  const id = params.id;
  const { user } = useSelector(state => state.user);
  const { data, isLoading, error } = useGetOrderDetailsQuery(id);
  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  function onClickDownload() {
    const input = document.querySelector('#order_invoice');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${data?.order?.order?._id}.pdf`);
    });
  }
  return (
    <div className="order-invoice my-5">
      <div className="row d-flex justify-content-center mb-5">
        <button className="btn btn-success col-md-5" onClick={onClickDownload}>
          <i className="fa fa-print"></i> Download Invoice
        </button>
      </div>
      <div id="order_invoice" className="p-3 border border-secondary">
        <header className="clearfix">
          <div id="logo">
            <img src="./images/invoice-logo.png" alt="Company Logo" />
          </div>
          <h1>INVOICE # {data?.order?._id}</h1>
          <div id="company" className="clearfix">
            <div>ShopIT</div>
            <div>
              455 Foggy Heights,
              <br />
              AZ 85004, US
            </div>
            <div>(602) 519-0450</div>
            <div>
              <a href="mailto:info@shopit.com">info@shopit.com</a>
            </div>
          </div>
          <div id="project">
            <div>
              <span>Name</span> {user.name}
            </div>
            <div>
              <span>EMAIL</span> {user.email}
            </div>
            <div>
              <span>PHONE</span> {data?.order?.shippingInfo?.phoneNo}
            </div>
            <div>
              <span>ADDRESS</span> {data?.order?.shippingInfo?.address}
            </div>
            <div>
              <span>DATE</span> {data?.order?.createdAt}
            </div>
            <div>
              <span>Status</span> {data?.order?.orderStatus}
            </div>
          </div>
        </header>
        <main>
          <table className="mt-5">
            <thead>
              <tr>
                <th className="service">ID</th>
                <th className="desc">NAME</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map((product, i) => (
                <tr>
                  <td className="service">{i + 1}</td>
                  <td className="desc">{product?.title}</td>
                  <td className="unit">{product?.price * 83}</td>
                  <td className="total">{data?.order?.totalAmount}</td>
                </tr>
              ))}

              <tr>
                <td colspan="4">
                  <b>SUBTOTAL</b>
                </td>
                <td className="total">$2299.95</td>
              </tr>

              <tr>
                <td colspan="4">
                  <b>TAX 15%</b>
                </td>
                <td className="total">$344.99</td>
              </tr>

              <tr>
                <td colspan="4">
                  <b>SHIPPING</b>
                </td>
                <td className="total">$10.00</td>
              </tr>

              <tr>
                <td colspan="4" className="grand total">
                  <b>GRAND TOTAL</b>
                </td>
                <td className="grand total">$2654.94</td>
              </tr>
            </tbody>
          </table>
          <div id="notices">
            <div>NOTICE:</div>
            <div className="notice">
              A finance charge of 1.5% will be made on unpaid balances after 30
              days.
            </div>
          </div>
        </main>
        <footer>
          Invoice was created on a computer and is valid without the signature.
        </footer>
      </div>
    </div>
  );
}
