import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = () => {
    const [values, setValues] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    // Handle input changes
    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation Check
        if (!values.username || !values.email || !values.password) {
            toast.error('Please fill in all fields!', { position: "top-center", autoClose: 2000, hideProgressBar: true });
            return;
        }

        if (values.password.length < 5) {
            toast.error('Password must be at least 5 characters long!', { position: "top-center", autoClose: 2000, hideProgressBar: true });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                username: values.username,
                email: values.email,
                password: values.password,
            });

            if (response.status >= 200 && response.status < 300) {
                toast.success('Registration Successful!...', { position: "top-center", autoClose: 2000, hideProgressBar: true });
                
                // Redirect to login after success
                setTimeout(() => navigate('/login'), 2500);
            } else {
                throw new Error('Unexpected response from server');
            }
        } catch (err) {
            console.error('Registration Error:', err);
            toast.error(err.response?.data?.message || 'Registration Failed! Try again.', { position: "top-center", autoClose: 2000, hideProgressBar: true });
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" placeholder="Enter Username" name="username" value={values.username} onChange={handleChanges} />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter Email" name="email" value={values.email} onChange={handleChanges} />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" name="password" value={values.password} onChange={handleChanges} />
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                </form>
                <p className="login-text">
                    Already have an account? <Link to='/login' className="login-link">Login</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
