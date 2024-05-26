import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
  return (
    <li>
      <div className="col hp">
        <div className="card h-100 shadow-sm">
          <Link to={`/products/${product?._id}`}>
            <img
              src={product.thumbnail}
              className="card-img-top"
              alt="product.title"
            />
          </Link>

          <div className="label-top shadow-sm">
            <Link className="text-white" to={`/products/${product?._id}`}>
              {product.brand}
            </Link>
          </div>
          <div className="card-body">
            <div className="clearfix mb-3">
              <span className="float-start badge rounded-pill bg-success text-white ">
                ₹{product.price * 83}
              </span>

              <span className="float-end">
                <Link
                  href="#"
                  className="small text-muted text-uppercase aff-link"
                >
                  reviews
                </Link>
              </span>
            </div>
            <h5 className="card-title ">
              <Link target="_blank" href="#" className="product-description">
                {product.description}
              </Link>
            </h5>

            <div className="d-grid gap-2 my-4">
              <Link
                to={`/products/${product?._id}`}
                className="btn-card btn-warning bold-btn text-center btn-cart"
              >
                View
              </Link>
            </div>
            <div className="clearfix mb-1">
              <span className="float-start">
                <a href="#">
                  <i className="fas fa-question-circle"></i>
                </a>
              </span>

              <span className="float-end">
                <i className="far fa-heart" style={{ cursor: 'pointer' }}></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
