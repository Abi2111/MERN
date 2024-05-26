import { Link } from 'react-router-dom';
import { categories } from '../Utils/Constants.js';
export default function Category() {
  return (
    <section class="category">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div>
              <aside class="side-area product-side side-shadow mt-5">
                <div class="side-title">
                  <h3>Product-title</h3>
                </div>
                <div class="side-content">
                  <form>
                    <ul class="list">
                      <p>Category</p>
                      {categories.map(category => (
                        <li key={categories}>
                          <input type="checkbox" id={category} />
                          <label htmlFor={category}>{category}</label>
                        </li>
                      ))}
                    </ul>
                    <ul class="list-sortby">
                      <p>Sort by</p>
                      <p>Price</p>
                      <li>
                        <input type="radio" name="price" id="min" />
                        <label htmlFor="min">Min price</label>
                      </li>
                      <li>
                        <input type="radio" name="price" id="max" />
                        <label htmlFor="max">Max price</label>
                      </li>
                    </ul>
                    <button className="btn-filter">Filter</button>
                  </form>
                </div>
              </aside>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-12">
                <div class="product-top d-flex justify-content-between align-items-center">
                  <div class="product-sec product-item">
                    <h2 class="my-5">Watches</h2>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <div class="product-cate">
                  <div>
                    <img src="Images/image1.jpg" alt="" />
                    <div class="product-icon">
                      <ul>
                        <li>
                          <Link href="">
                            <i class="fas fa-heart"></i>
                          </Link>{' '}
                        </li>
                        <li>
                          <Link href="">
                            <i class="fas fa-shopping-cart"></i>
                          </Link>{' '}
                        </li>
                      </ul>
                    </div>
                    <div class="product-des">
                      <h5> Watch Brand</h5>
                      <p>$1500.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <div class="product-cate">
                  <div>
                    <img src="Images/image2.jpg" alt="" />
                    <div class="product-icon">
                      <ul>
                        <li>
                          <Link href="">
                            <i class="fas fa-heart"></i>
                          </Link>{' '}
                        </li>
                        <li>
                          <Link href="">
                            <i class="fas fa-shopping-cart"></i>
                          </Link>{' '}
                        </li>
                      </ul>
                    </div>
                    <div class="product-des">
                      <h5> Watch Brand</h5>
                      <p>$1500.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <div class="product-cate">
                  <div>
                    <img src="Images/image3.jpg" alt="" />
                    <div class="product-icon">
                      <ul>
                        <li>
                          <Link href="">
                            <i class="fas fa-heart"></i>
                          </Link>{' '}
                        </li>
                        <li>
                          <Link href="">
                            <i class="fas fa-shopping-cart"></i>
                          </Link>{' '}
                        </li>
                      </ul>
                    </div>
                    <div class="product-des">
                      <h5> Watch Brand</h5>
                      <p>$1500.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <div class="product-cate">
                  <div>
                    <img src="Images/image4.jpg" alt="" />
                    <div class="product-icon">
                      <ul>
                        <li>
                          <Link href="">
                            <i class="fas fa-heart"></i>
                          </Link>{' '}
                        </li>
                        <li>
                          <Link href="">
                            <i class="fas fa-shopping-cart"></i>
                          </Link>{' '}
                        </li>
                      </ul>
                    </div>
                    <div class="product-des">
                      <h5> Watch Brand</h5>
                      <p>$1500.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <div class="product-cate">
                  <div>
                    <img src="Images/image5.jpg" alt="" />
                    <div class="product-icon">
                      <ul>
                        <li>
                          <Link href="">
                            <i class="fas fa-heart"></i>
                          </Link>{' '}
                        </li>
                        <li>
                          <Link href="">
                            <i class="fas fa-shopping-cart"></i>
                          </Link>{' '}
                        </li>
                      </ul>
                    </div>
                    <div class="product-des">
                      <h5> Watch Brand</h5>
                      <p>$1500.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <div class="product-cate">
                  <div>
                    <img src="Images/image6.jpg" alt="" />
                    <div class="product-icon">
                      <ul>
                        <li>
                          <Link href="">
                            <i class="fas fa-heart"></i>
                          </Link>{' '}
                        </li>
                        <li>
                          <Link href="">
                            <i class="fas fa-shopping-cart"></i>
                          </Link>{' '}
                        </li>
                      </ul>
                    </div>
                    <div class="product-des">
                      <h5> Watch Brand</h5>
                      <p>$1500.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <div class="product-cate">
                  <div>
                    <img src="Images/image7.jpg" alt="" />
                    <div class="product-icon">
                      <ul>
                        <li>
                          <Link href="">
                            <i class="fas fa-heart"></i>
                          </Link>{' '}
                        </li>
                        <li>
                          <Link href="">
                            <i class="fas fa-shopping-cart"></i>
                          </Link>{' '}
                        </li>
                      </ul>
                    </div>
                    <div class="product-des">
                      <h5> Watch Brand</h5>
                      <p>$1500.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6">
                <div class="product-cate">
                  <div>
                    <img src="Images/image8.jpg" alt="" />
                    <div class="product-icon">
                      <ul>
                        <li>
                          <Link href="">
                            <i class="fas fa-heart"></i>
                          </Link>{' '}
                        </li>
                        <li>
                          <Link href="">
                            <i class="fas fa-shopping-cart"></i>
                          </Link>{' '}
                        </li>
                      </ul>
                    </div>

                    <div class="product-des">
                      <h5> Watch Brand</h5>
                      <p>$1500.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-sm-6">
                <div class="product-cate">
                  <div>
                    <img src="Images/image9.jpg" alt="" />
                    <div class="product-icon">
                      <ul>
                        <li>
                          <Link href="">
                            <i class="fas fa-heart"></i>
                          </Link>{' '}
                        </li>
                        <li>
                          <Link href="">
                            <i class="fas fa-shopping-cart"></i>
                          </Link>{' '}
                        </li>
                      </ul>
                    </div>
                    <div class="product-des">
                      <h5> Watch Brand</h5>
                      <p>$1500.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-12 text-center">
                <Link href="" class="product-btn">
                  More Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
