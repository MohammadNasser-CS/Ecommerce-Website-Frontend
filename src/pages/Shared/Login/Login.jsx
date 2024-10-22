import axios from 'axios';
import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import * as Yup from 'yup';
import style from "./Login.module.css"
import { UserContext } from '../../../context/User';
export default function SignIn() {
    const { setUserToken,setUserRole } = useContext(UserContext);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    const handleForm = async (values) => {
        setLoader(true);
        try {
            const response = await axios.post(
                "https://ecommercent.runasp.net/api/User/login",
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setLoader(false);
            console.log(response.data);
            toast.success('Logged in Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });
            const token = response.data.token;
            console.log("token is : " + token);
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken.role);

            localStorage.setItem("userToken", token)
            localStorage.setItem('userRole', decodedToken.role)
            // localStorage.setItem('role',decodedToken.role)
            setUserToken(token);
            setUserRole(decodedToken.role);
            if (decodedToken.role === "User")
                navigate('/')
            else if (decodedToken.role === "Admin")
                navigate('/admin/products')

        } catch (error) {
            setLoader(false);
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });
        } finally {
            setLoader(false);
        }
    };

    let formik = useFormik({
        initialValues: {
            password: "",
            email: "",
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
            <section className="bg-image overflow-auto p-5 vh-100"
                style={{
                    backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="mask d-flex align-items-center gradient-custom-3 h-100">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className={style["login-card"] + " col-12 col-md-9 col-lg-7 col-xl-6"}>
                                <div className="card" style={{ borderRadius: 15 }}>
                                    <div className={"card-body p-5"}>
                                        <h2 className={style["header-text"] + " text-uppercase text-center mb-5"}>Sign In</h2>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="emailInput" id="emailHelperLabel">Email</label>
                                                <input type="email" value={formik.values.email} onChange={formik.handleChange} id="emailInput" name="email" className="form-control form-control-lg fs-6" placeholder="name@example.com" aria-describedby="emailHelperLabel" />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="passwordInput" id="passwordHelperLabel">Password</label>
                                                <input type="password" value={formik.values.password} onChange={formik.handleChange} name="password" id="passwordInput" className="form-control form-control-lg fs-6" aria-describedby="passwordHelperLabel" />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button type="submit" disabled={loader ? 'disabled' : null} className={style["btn-fs"] + " btn btn-info btn-block btn-lg gradient-custom-4 text-body"}>
                                                    {loader ? "Logging in..." : "Sign In"}
                                                </button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">
                                                Don&#39;t have an account? <Link to="/signup" className="fw-bold text-body"><u>Register here</u></Link>
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
    );
}
