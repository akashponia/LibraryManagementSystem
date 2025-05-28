import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/register.css'
import Swal from 'sweetalert2';


const API_BASE = '/api';

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', fund: '', type: '', status: true });
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        const newErrors = {};

        if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!form.password) {
            newErrors.password = "Password is required.";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        if (!form.fund || isNaN(form.fund) || form.fund < 0) {
            newErrors.fund = "Fund must be a non-negative number.";
        }
        if (!form.type.trim()) newErrors.type = "Type is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };



    const handleRegister = async () => {
        if (!validateForm()) return;
        try {          
            const res = await axios.post(`${API_BASE}/Users`, form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status === 200 || res.status === 201) {
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'You will now be redirected to the login page.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/'); // Replace '/login' with your actual login route
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Registration Failed',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    return (
        <div className="main">
            <div className="form">
                <div className="formheading">Register</div>
                <div className="row">
                    <div className="item">
                        <label htmlFor="firstname">First Name:</label>
                        <input type="text" name="firstname" id="firstname" onChange={e => setForm({ ...form, firstName: e.target.value })} />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="item">
                        <label htmlFor="lastname">Last Name:</label>
                        <input type="text" name="lastname" id="lastname" onChange={e => setForm({ ...form, lastName: e.target.value })} />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="item">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" onChange={e => setForm({ ...form, email: e.target.value })} />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setForm({ ...form, password: e.target.value })} />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="item">
                        <label htmlFor="fund">Fund:</label>
                        <input type="number" name="fund" id="fund" onChange={e => setForm({ ...form, fund: parseFloat(e.target.value) })} />
                        {errors.fund && <span className="error">{errors.fund}</span>}
                    </div>
                    <div className="item">
                        <label htmlFor="type">Type:</label>
                        <input type="text" name="type" id="type" onChange={e => setForm({ ...form, type: e.target.value })} />
                        {errors.type && <span className="error">{errors.type}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="item">
                        <label htmlFor="status">Status:</label>
                        <select value={form.status.toString()} onChange={e => setForm({ ...form, status: e.target.value === 'true' })}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>


                    </div>
                </div>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
}

export default RegisterPage;
