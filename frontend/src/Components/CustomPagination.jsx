import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomPagination({ resPerPage, filterProductsCount }) {
  let [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const page = Number(searchParams.get('page')) || 1;
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  //http://localhost:3000/?page=3 page 3 will be assigned to the pageNumber
  function setPageNo(pageNumber) {
    setCurrentPage(pageNumber);
    if (searchParams.has('page')) {
      searchParams.set('page', pageNumber);
    } else {
      searchParams.append('page', pageNumber);
    }
    const path = window.location.pathname + '?' + searchParams.toString();
    navigate(path);
  }
  console.log(resPerPage, filterProductsCount);
  return (
    <div className="d-flex justify-content-center my-5">
      {filterProductsCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filterProductsCount}
          pageRangeDisplayed={4}
          onChange={setPageNo}
          nextPageText={'Next'}
          prevPageText={'Prev'}
          firstPageText={'First'}
          lastPageText={'Last'}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
}
