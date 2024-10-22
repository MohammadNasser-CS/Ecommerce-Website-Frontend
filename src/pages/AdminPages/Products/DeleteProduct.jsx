import { useState } from 'react';
import { Link } from "react-router-dom";
import style from "./Products.module.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default function DeleteProduct() {
  const [productId, setProductId] = useState("");
  //const [showForm, setShowForm] = useState(false); // Control form visibility

  const fetchData = async () => {
    try {
      const response = await axios.delete(`https://ecommercent.runasp.net/api/Product/${productId}`);

      if (response.status === 204) {
        toast.success("Product has been successfully deleted.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Product not found:", error);
      toast.error("Product not found. Please enter a valid product ID.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <div className="container-fluid bg-dark-subtle" style={{ minHeight: "500px" }}>
      <div className="row">
        {/* Sidebar Section */}
        <div className="col-md-3 sidebar-section bg-light p-4 rounded shadow-sm" style={{ minHeight: "500px" }}>
          <h5 className="mb-4 font-weight-bold text-primary">Products</h5>
          <ul className="list-group">
            <Link to="/admin/products" className="list-group-item list-group-item-action text-decoration-none">All Products</Link>
            <Link to="/admin/product/add" className="list-group-item list-group-item-action text-decoration-none">Add Product</Link>
            <Link to="/admin/product/update" className="list-group-item list-group-item-action text-decoration-none">Update Product</Link>
            <Link to="/admin/product/delete" className="list-group-item list-group-item-action text-decoration-none">Delete Product</Link>
          </ul>
        </div>
        <div className="col-md-9 products-section">
          <div className={`${style.main} bg-dark-subtle`}>
            <div className={`${style.wrapper} bg-secondary bg-gradient`}>
              <h1>Find Product to Delete</h1>
              <div className={style["input-box"]}>
                <input
                  type="text"
                  placeholder="Enter Product ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  id="productId"
                />
              </div>
              <button onClick={fetchData} className="mt-4">Delete Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
