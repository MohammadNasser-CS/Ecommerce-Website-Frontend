import axios from "axios";
import './Register.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import * as Yup from 'yup';
import { useFormik } from "formik";
export default function Register() {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        userName: Yup.string()
            .min(3, "Must be at least 3 characters")
            .max(20, "Must be 20 characters or less")
            .required("User Name is required"),
        firstName: Yup.string()
            .min(3, "Must be at least 3 characters")
            .max(20, "Must be 20 characters or less")
            .required("First Name is required"),
        lastName: Yup.string()
            .min(3, "Must be at least 3 characters")
            .max(20, "Must be 20 characters or less")
            .required("Last Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character"
            )
            .required("Password is required"),
    });

    const handleForm = async (values) => {
        setLoader(true);
        try {
            await axios.post(
                "https://ecommercent.runasp.net/api/User/register",
                {
                    userName: values.userName,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
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
            setLoader(false);
            navigate("/login");
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
    };

    let formik = useFormik({
        initialValues: {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            handleForm(values);
        },
        validateOnChange: false,
        validateOnBlur: false,
    });
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
                                        <form onSubmit={formik.handleSubmit}>
                                            {/* Username Field */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="userNameInput" id="userNameHelperLabel">Username</label>
                                                <input
                                                    type="text"
                                                    value={formik.values.userName}
                                                    onChange={formik.handleChange}
                                                    name="userName"
                                                    id="userNameInput"
                                                    className="form-control form-control-lg fs-6"
                                                    aria-describedby="userNameHelperLabel"
                                                />
                                                {formik.touched.userName && formik.errors.userName ? (
                                                    <div className="text-danger">{formik.errors.userName}</div>
                                                ) : null}
                                            </div>
                                            <div className="row form-outline mb-4">
                                                <div className="col">
                                                    <label className="form-label" htmlFor="userNameInput" id="userNameHelperLabel">First Name</label>
                                                    <input
                                                        type="text"
                                                        value={formik.values.firstName}
                                                        onChange={formik.handleChange}
                                                        placeholder="First Name"
                                                        name="firstName"
                                                        id="firstName"
                                                        className="form-control form-control-lg fs-6"
                                                    />
                                                    {formik.touched.firstName && formik.errors.firstName ? (
                                                        <div className="text-danger">{formik.errors.firstName}</div>
                                                    ) : null}
                                                </div>
                                                <div className="col">
                                                    <label className="form-label" htmlFor="userNameInput" id="userNameHelperLabel">Last Name</label>
                                                    <input
                                                        type="text"
                                                        value={formik.values.lastName}
                                                        onChange={formik.handleChange}
                                                        placeholder="Last Name"
                                                        name="lastName"
                                                        id="lastName"
                                                        className="form-control form-control-lg fs-6"
                                                    />
                                                    {formik.touched.lastName && formik.errors.lastName ? (
                                                        <div className="text-danger">{formik.errors.lastName}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            {/* Email Field */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="emailInput" id="emailHelperLabel">Email</label>
                                                <input
                                                    type="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    id="emailInput"
                                                    name="email"
                                                    className="form-control form-control-lg fs-6"
                                                    placeholder="name@example.com"
                                                    aria-describedby="emailHelperLabel"
                                                />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className="text-danger">{formik.errors.email}</div>
                                                ) : null}
                                            </div>
                                            {/* Password Field */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="passwordInput" id="passwordHelperLabel">Password</label>
                                                <input
                                                    type="password"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    name="password"
                                                    id="passwordInput"
                                                    className="form-control form-control-lg fs-6"
                                                    aria-describedby="passwordHelperLabel"
                                                />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="text-danger">{formik.errors.password}</div>
                                                ) : null}
                                            </div>
                                            {/* Terms and Conditions */}
                                            {/* <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" id="form2Example3cg" />
                                                <label className="form-check-label" htmlFor="form2Example3cg">
                                                    I agree to all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                                </label>
                                            </div> */}
                                            {/* Submit Button */}
                                            <div className="d-flex justify-content-center">
                                                <button type="submit" disabled={loader ? 'disabled' : null} className="btn btn-info btn-block btn-lg gradient-custom-4 text-body">
                                                    {loader ? "Wait" : "Register"}
                                                </button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">
                                                Already have an account? <Link to="/login" className="fw-bold text-body"><u>Login here</u></Link>
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
