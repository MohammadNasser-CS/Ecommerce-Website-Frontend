import { Link } from "react-router-dom";
import style from "./Products.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";

export default function AddProduct() {

  const handleForm = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("Name", values.name);
    formData.append("Price", values.price);
    formData.append("Description", values.description);
    formData.append("CategoryId", values.category);
    formData.append("Stock", values.stock);
    formData.append("Image", values.image); // Ensure this is a valid file object
    
    try {
      const response = await axios.post(
        `https://ecommercent.runasp.net/api/Product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      // Make sure response is successful before proceeding
      if (response.status === 201) {
        toast.success("Product is created successfully", {
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
      console.log(response);
    } catch (error) {
      console.error("Error creating product:", error);
      if (error.response && error.response.data) {
        toast.error(`${error.response.data.error}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }else{
        toast.error("Error In Create Product")
      }
    }
  };
  
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"), // Corrected key
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Product price is required"), // Corrected key
    description: Yup.string().required("Product description is required"), // Corrected key
    category: Yup.number()
      .typeError("Category ID must be a number")
      .positive("Category ID must be greater than 0")
      .required("Category ID is required"), // Corrected key
    stock: Yup.number()
      .typeError("Stock must be a number")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .required("Stock is required"), // Corrected key
    image: Yup.mixed().required("Product image is required"), // Corrected key
  });

  let formik = useFormik({
    initialValues: {
      name: "", // Corrected key
      price: "", // Corrected key
      description: "", // Corrected key
      category: "", // Corrected key
      stock: "", // Corrected key
      image: null, // Corrected key
    },
    validationSchema,
    onSubmit: (values) => {
      handleForm(values);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Section */}
        <div className="col-md-3 sidebar-section bg-light p-4 rounded shadow-sm">
          <h5 className="mb-4 font-weight-bold text-primary">Products</h5>
          <ul className="list-group">
            <Link
              to="/admin/products"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              All Products
            </Link>
            <Link
              to="/admin/product/add"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Add Product
            </Link>
            <Link
              to="/admin/product/update"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Update Product
            </Link>
            <Link
              to="/admin/product/delete"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Delete Product
            </Link>
          </ul>
        </div>

        {/* Products Section */}
        <div className="col-md-9 products-section">
          <div className={`${style.main} bg-dark-subtle`}>
            <div className={`${style.wrapper} bg-secondary bg-gradient`}>
              <form onSubmit={formik.handleSubmit}>
                <h1>Create Product</h1>

                <div className={style["input-box"]}>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={formik.values.name} // Corrected key
                    onChange={formik.handleChange}
                    name="name" // Corrected key
                    id="name" // Optional but helpful for form identification
                  />
                  {formik.touched.name && formik.errors.name ? (
              <div className={style.error}>{formik.errors.name}</div>
            ) : null}
                </div>

                <div className={style["input-box"]}>
                  <input
                    type="text"
                    placeholder="Product Price"
                    value={formik.values.price} // Corrected key
                    onChange={formik.handleChange}
                    name="price" // Corrected key
                    id="price"
                  />
                  {formik.touched.price && formik.errors.emapriceil ? (
              <div className={style.error}>{formik.errors.price}</div>
            ) : null}
                </div>

                <div className={style["input-box"]}>
                  <input
                    type="text"
                    placeholder="Product Description"
                    value={formik.values.description} // Corrected key
                    onChange={formik.handleChange}
                    name="description" // Corrected key
                    id="description"
                  />
                  {formik.touched.description && formik.errors.description ? (
              <div className={style.error}>{formik.errors.description}</div>
            ) : null}
                </div>

                <div className={style["input-box"]}>
                  <label
                    htmlFor="image"
                    className={style["custom-file-upload"]}
                  >
                    Upload Product Image
                  </label>
                  <input
                    type="file"
                    name="image" // Corrected key
                    id="image"
                    accept="image/*"
                    className={style["file-input"]}
                    onChange={(event) =>
                      formik.setFieldValue("image", event.target.files[0])
                    }
                  />
                  {formik.touched.image && formik.errors.image ? (
              <div className={style.error}>{formik.errors.image}</div>
            ) : null}
                </div>

                <div className={style["input-box"]}>
                  <input
                    type="text"
                    placeholder="Category ID"
                    value={formik.values.category} // Corrected key
                    onChange={formik.handleChange}
                    name="category" // Corrected key
                    id="category"
                  />
                  {formik.touched.category && formik.errors.category ? (
              <div className={style.error}>{formik.errors.category}</div>
            ) : null}
                </div>

                <div className={style["input-box"]}>
                  <input
                    type="text"
                    placeholder="Stock"
                    value={formik.values.stock} // Corrected key
                    onChange={formik.handleChange}
                    name="stock" // Corrected key
                    id="stock"
                  />
                  {formik.touched.stock && formik.errors.stock ? (
              <div className={style.error}>{formik.errors.stock}</div>
            ) : null}
                </div>

                <button type="submit" className="mt-4">
                  Create Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
