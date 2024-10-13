import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Root from './Routes/Root';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import UserContextProvider from './context/User';
import Login from './pages/Login/Login';
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
        path: "/signin",
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