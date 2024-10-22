import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Root from './Routes/Root';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Shared/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import UserContextProvider from './context/User';
import Login from './pages/Shared/Login/Login';
import Products from './pages/AdminPages/Products/Products';
import Orders from './pages/AdminPages/Orders';
import AddProduct from './pages/AdminPages/Products/AddProduct';
import UpdateProduct from './pages/AdminPages/Products/UpdateProduct';
import DeleteProduct from './pages/AdminPages/Products/DeleteProduct';
import Categories from './pages/Categories/Categories';
import AddCategory from './pages/Categories/AddCategory';
import UpdateCategory from './pages/Categories/UpdateCategory';
import DeleteCategory from './pages/Categories/DeleteCategory';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element:
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>,
      },
      {
        path: "/profile",
        element:
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>,
      },
      {
        path: "/login",
        element:
          <Login />
      },
      {
        path: "/signup",
        element:
          <Register />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },
  {
    element: <Root />,
    children: [
      {
        path: '/admin/products',
        element: <Products />,
      },
      {
        path: '/admin/orders',
        element: <Orders />,
      },
      {
        path: '/admin/profile',
        element: <Profile />,
      },
      {
        path: '/admin/product/add',
        element: <AddProduct />
      },
      {
        path: '/admin/product/update',
        element: <UpdateProduct />
      },
      {
        path: '/admin/product/delete',
        element: <DeleteProduct />
      },
      {
        path: '/admin/categorys',
        element: <Categories />,
      },
      {
        path: '/admin/category/add',
        element: <AddCategory />
      },
      {
        path: '/admin/category/update',
        element: <UpdateCategory />
      },
      {
        path: '/admin/category/delete',
        element: <DeleteCategory />
      },

    ],
  },
]);
export default function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />
    </>
  )
}