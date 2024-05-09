import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/Slices/ProductSlice';
import ProductItem from './ProductItem';

export default function Products() {
  const { products, isLoading, isError } = useSelector(state => state);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ul className="product-container">
          {products &&
            products.map(product => (
              <ProductItem key={product.id} details={product} />
            ))}
        </ul>
      )}
    </div>
  );
}
