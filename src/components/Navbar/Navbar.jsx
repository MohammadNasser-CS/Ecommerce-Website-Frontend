import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'
import { useContext } from "react";
import { UserContext } from "../../context/User";
export default function Navbar() {
  const { userData, setUserToken, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('userToken');
    setUserData(null);
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container">
          <NavLink className="navbar-brand text-white" to="/">{userData ? userData.userName : 'MyWebsite'}</NavLink>
          {/* Offcanvas toggle button */}
          <button className="navbar-toggler border-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Offcanvas Menu */}
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu:</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                {userData ?
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link text-white" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link text-white" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link text-white" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link text-white" onClick={logout}>Logout</button>
                    </li>
                  </> :
                  <>
                    <li className="nav-item ">
                      <NavLink className="nav-link text-white" to="/signin">Signin</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link text-white" to="/signup">Signup</NavLink>
                    </li>
                  </>}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
