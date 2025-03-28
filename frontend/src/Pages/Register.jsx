import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/register', values);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
            <div className="bg-white shadow-2xl rounded-xl px-8 py-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            name="username"
                            onChange={handleChanges}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            name="email"
                            onChange={handleChanges}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            name="password"
                            onChange={handleChanges}
                        />
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold text-lg transition duration-200">
                        Register
                    </button>
                </form>
                <div className="text-center mt-5 text-gray-700">
                    <span>Already have an account? </span>
                    <Link to='/login' className="text-purple-500 hover:text-purple-700 font-semibold transition duration-200">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
