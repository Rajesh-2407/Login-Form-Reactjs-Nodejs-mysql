import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    // Handle input changes
    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation Check
        if (!values.email || !values.password) {
            toast.error('Please fill in all fields!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/login', values);
            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                toast.success('Login Successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "light",
                });
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (err) {
            toast.error('Login Failed! Check your credentials.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={values.email}
                            onChange={handleChanges}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={values.password}
                            onChange={handleChanges}
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="register-text">
                    Don't have an account? <Link to='/register' className="signup-link">Sign up</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
