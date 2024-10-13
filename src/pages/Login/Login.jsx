import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import * as Yup from 'yup';

export default function SignIn() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateData = async () => {
        const requestSchema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(3).max(15).required(),
        });

        try {
            await requestSchema.validate(user, { abortEarly: false });
            return true;
        } catch (error) {
            setErrors(error.errors);
            setLoader(false);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        if (await validateData()) {
            try {
                const { data } = await axios.post('https://dummyjson.com/auth/login', user);
                console.log(data);
                if (data.message === 'success') {
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
                    navigate("/dashboard");
                }
            } catch (error) {
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
        }
    };

    return (
        <>
            {errors.length > 0 && errors.map((error, index) => <p key={index}>{error}</p>)}
            <section className="bg-image overflow-auto p-5 vh-100"
                style={{
                    backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="mask d-flex align-items-center gradient-custom-3 h-100">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center ">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6 register-card">
                                <div className="card" style={{ borderRadius: 15 }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5 header-text">Sign In</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="emailInput" id="emailHelperLabel">Email</label>
                                                <input type="email" value={user.email} onChange={handleChange} id="emailInput" name="email" className="form-control form-control-lg fs-6" placeholder="name@example.com" aria-describedby="emailHelperLabel" />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="passwordInput" id="passwordHelperLabel">Password</label>
                                                <input type="password" value={user.password} onChange={handleChange} name="password" id="passwordInput" className="form-control form-control-lg fs-6" aria-describedby="passwordHelperLabel" />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button type="submit" disabled={loader ? 'disabled' : null} className="btn btn-info btn-block btn-lg gradient-custom-4 text-body">
                                                    {loader ? "Logging in..." : "Sign In"}
                                                </button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">
                                                Don&#39;t have an account? <a href="#!" className="fw-bold text-body"><u>Register here</u></a>
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
