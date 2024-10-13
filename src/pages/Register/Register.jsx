import axios from "axios";
import './Register.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import * as Yub from 'yup';
export default function Register() {
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const validateData = async () => {
        const requsetSchema = Yub.object({
            userName: Yub.string().min(5).max(20).required(),
            email: Yub.string().email().required(),
            password: Yub.string().min(3).max(15).required(),
            image: Yub.string().required(),
            confirmPassword: Yub.string()
                .oneOf([Yub.ref('password'), null], 'Passwords must match') // Ensure password confirmation
                .required('Confirm password is required'),
        });
        try {
            await requsetSchema.validate(user, { abortEarly: false, });
            setErrors({});  // Clear any existing errors
            return true;
        } catch (error) {
            const validationErrors = {};
            error.inner.forEach(err => {
                validationErrors[err.path] = err.message;
            });
            setErrors(validationErrors);
            setLoader(false);
            return false;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (await validateData()) {
            const formData = new FormData();
            formData.append('userName', user.userName);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('image', user.image);
            try {
                const { data } = axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
                if (data.message === 'success') {
                    toast.success('Account Created Successfully', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Slide,
                    });
                    navigate("/login");
                }
            } catch (error) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            } finally {
                setLoader(false);
            }
        }
    }
    return (
        <>
            <section className="vh-100 bg-image overflow-auto p-5"
                style={{
                    backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="mask d-flex align-items-center gradient-custom-3">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6 register-card">
                                <div className="card" style={{ borderRadius: 15 }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5 header-text">Create an account</h2>
                                        <form onSubmit={handleSubmit}>
                                            {/* Username Field */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="userNameInput" id="userNameHelperLabel">Username</label>
                                                <input
                                                    type="text"
                                                    value={user.userName}
                                                    onChange={handleChange}
                                                    name="userName"
                                                    id="userNameInput"
                                                    className="form-control form-control-lg fs-6"
                                                    aria-describedby="userNameHelperLabel"
                                                />
                                                {errors.userName && <p className="text-danger">{errors.userName}</p>}
                                            </div>
                                            {/* Email Field */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="emailInput" id="emailHelperLabel">Email</label>
                                                <input
                                                    type="email"
                                                    value={user.email}
                                                    onChange={handleChange}
                                                    id="emailInput"
                                                    name="email"
                                                    className="form-control form-control-lg fs-6"
                                                    placeholder="name@example.com"
                                                    aria-describedby="emailHelperLabel"
                                                />
                                                {errors.email && <p className="text-danger">{errors.email}</p>}
                                            </div>
                                            {/* Password Field */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="passwordInput" id="passwordHelperLabel">Password</label>
                                                <input
                                                    type="password"
                                                    value={user.password}
                                                    onChange={handleChange}
                                                    name="password"
                                                    id="passwordInput"
                                                    className="form-control form-control-lg fs-6"
                                                    aria-describedby="passwordHelperLabel"
                                                />
                                                {errors.password && <p className="text-danger">{errors.password}</p>}
                                            </div>
                                            {/* Confirm Password Field */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="confirmPasswordInput" id="confirmPasswordHelperLabel">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    value={user.confirmPassword}
                                                    onChange={handleChange}
                                                    name="confirmPassword"
                                                    id="confirmPasswordInput"
                                                    className="form-control form-control-lg fs-6"
                                                    aria-describedby="confirmPasswordHelperLabel"
                                                />
                                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                                            </div>
                                            {/* Terms and Conditions */}
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" id="form2Example3cg" />
                                                <label className="form-check-label" htmlFor="form2Example3cg">
                                                    I agree to all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                                </label>
                                            </div>
                                            {/* Submit Button */}
                                            <div className="d-flex justify-content-center">
                                                <button type="submit" disabled={loader ? 'disabled' : null} className="btn btn-info btn-block btn-lg gradient-custom-4 text-body">
                                                    {loader ? "Wait" : "Register"}
                                                </button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">
                                                Already have an account? <a href="#!" className="fw-bold text-body"><u>Login here</u></a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
