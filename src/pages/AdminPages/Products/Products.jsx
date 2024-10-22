import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from 'src/components/Loader/Loader.jsx';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [ascendingOrder, setAscendingOrder] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const fetchData = async (pageNumber, priceFilter, categoryFilter, sortOptionFilter, orderFilter) => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(`https://ecommercent.runasp.net/api/Product`, {
        params: {
          Name: name,
          PageNumber: pageNumber,
          PageSize: 6,
          Price: priceFilter || null,
          Category: categoryFilter || null,
          SortBy: sortOptionFilter || null,
          IsDesc: orderFilter || null,
        },
      });
      console.log(response);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages || 3);
    } catch (error) {
      setProducts([]);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData(currentPage, price, category, sortOption, ascendingOrder);
  }, [currentPage, name]);

  const handleApplyFilters = () => {
    fetchData(1, price, category, sortOption, ascendingOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Section */}
        <div className="col-md-3 sidebar-section bg-light p-4 rounded shadow-sm">
          <h5 className="mb-4 font-weight-bold text-primary">Products</h5>
          <ul className="list-group">
            <Link to="/admin/products" className="list-group-item list-group-item-action text-decoration-none">
              All Products
            </Link>
            <Link to="/admin/product/add" className="list-group-item list-group-item-action text-decoration-none">
              Add Product
            </Link>
            <Link to="/admin/product/update" className="list-group-item list-group-item-action text-decoration-none">
              Update Product
            </Link>
            <Link to="/admin/product/delete" className="list-group-item list-group-item-action text-decoration-none">
              Delete Product
            </Link>
          </ul>

          <h5 className="mb-4 mt-5 font-weight-bold text-primary">Filter</h5>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-control mb-3"
              placeholder="Enter a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Price Filter */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="text"
              id="price"
              className="form-control mb-3"
              placeholder="Enter a price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <small className="text-muted">
              Enter a price to display products that are equal to or less than this value.
            </small>
          </div>

          {/* Category Filter */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              id="category"
              className="form-control mb-3"
              placeholder="Enter a category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Sort Options */}
          <div className="mb-3">
            <label htmlFor="sortOptions" className="form-label">Sorted By</label>
            <select
              id="sortOptions"
              className="form-select mb-3"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">--</option>
              <option value="Name">Name</option>
              <option value="Price">Price</option>
              <option value="Rating">Rating</option>
            </select>
          </div>

          {/* Ascending Order */}
          <div className="mb-3">
            <label htmlFor="order" className="form-label">Descending order</label>
            <select
              id="order"
              className="form-select mb-3"
              value={ascendingOrder}
              onChange={(e) => setAscendingOrder(e.target.value)}
            >
              <option value="">--</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <button className="btn btn-primary" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="col-md-9 products-section">
          {isLoading ? ( // Display Loader when data is loading
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', minHeight: '400px' }}>
              <Loader />
            </div>
          ) : (
            <>
              <div className="row">
                {Array.isArray(products) &&
                  products.map((P) => (
                    <div className="col-md-4 mt-3" key={P.productId}>
                      <div className="card h-100 position-relative shadow-sm">
                        <Link to={`/products/${P.productId}`} className="text-decoration-none">
                          <img
                            src={P.imageUrl}
                            alt={P.name}
                            className="card-img-top"
                            style={{ height: '300px', objectFit: 'cover' }}
                          />
                          <div className="card-body">
                            <h5>{P.name}</h5>
                          </div>
                        </Link>
                        <div className="card-body">
                          <p>{P.description}</p>
                          <p className="fw-bold">${P.price}</p>
                          <p className="fw-bold">Rating: {P.rating}</p>
                        </div>
                        <span className="badge bg-primary position-absolute bottom-0 start-0 m-2">
                          {P.categoryName}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Pagination */}
              {products.length > 0 && (
                <nav aria-label="Page navigation example">
                  <ul className="pagination mt-4 justify-content-center">
                    {/* Previous Button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                      </button>
                    </li>

                    {[...Array(totalPages)].map((_, page) => (
                      <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                          {page + 1}
                        </button>
                      </li>
                    ))}

                    {/* Next Button */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
