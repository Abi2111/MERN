import { useEffect, useState } from 'react';
import { useGetProductsQuery } from './../redux/APIS/productApi.js';
import { Link, useSearchParams } from 'react-router-dom';
import ProductItem from './ProductItems.js';
import Loader from './Loader.js';
import Button from './Button.js';
import InternalError from './ServerError.js';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  //  1.  get the all search params * search * page * min * max * category * ratings

  const search = searchParams.get('search');
  const page = searchParams.get('page');
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const category = searchParams.get('category');
  const ratings = searchParams.get('ratings');

  // 2. Set the params
  let params = {};
  if (search !== null && search !== undefined && search !== '') {
    params.search = search;
  }
  if (page !== null && page !== undefined && page !== '') {
    params.page = page;
  }
  if (min !== null && min !== undefined && min !== '') {
    params.min = min;
  }
  if (max !== null && max !== undefined && max !== '') {
    params.max = max;
  }
  if (category !== null && category !== undefined && category !== '') {
    params.category = category;
  }
  if (ratings !== null && ratings !== undefined && ratings !== '') {
    params.ratings = ratings;
  }

  // 3 send the params
  const { data, error, isLoading } = useGetProductsQuery(params);
  console.log(data, error?.error);
  useEffect(() => {
    setProducts(data?.products);
  }, [data]);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <InternalError />;
  }
  return (
    <>
      <div
        className="container-fluid bg-trasparent my-10 p-3"
        style={{ position: 'relative' }}
      >
        <ul className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
          {products?.map(product => (
            <ProductItem product={product} />
          ))}
        </ul>
        {products?.length > 5 ? (
          <Link to="/products">
            <Button>Load more</Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
