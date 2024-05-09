import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

export default function ProductItem({ details }) {
  return (
    <li className="product-card">
      <img
        src={details.thumbnail}
        alt="Product Name"
        className="product-image"
      />
      <Link className="nav-item" to={`/products/${details.id}`}>
        <h3 className="product-name">{details.title}</h3>
      </Link>
      <p className="product-description">{details.description}</p>
      <div className="product-rating">
        <div className="price">${details.price}</div>
        <div className="ratings">
          <ReactStars
            count={5}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          ,
        </div>
      </div>
      <button className="cartBtn">Add to Cart</button>
    </li>
  );
}
