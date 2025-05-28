import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/login.css';
const API_BASE = '/api/Users'; // Proxy handles the domain

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

const validateForm = () => {
        const newErrors = {};

        if (!form.password.trim()) newErrors.password = "Password is required.";     
        if (!form.username.trim()) {
            newErrors.email = "Username is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.username)) {
            newErrors.email = "Username is your email so invalid email format.";
        }       
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

  const handleLogin = async () => {
     if (!validateForm()) return;
    try {
      const res = await axios.get(`${API_BASE}/GetUserByEmail`, {
        params: { email: form.username }
      });

      const result = res.data;

      if (!result.success) {
        setErrors({ ...errors, email: result.message });
        return;
      }

      if (result.data.password === form.password) {
        navigate('/dashboard');
      } else {
        setErrors({ ...errors, password: 'Password is Incorrect' });
      }

    } catch (err) {
      console.error(err);
      alert('Login failed due to server error');
    }
  };


  return (

    <div className="main_login">
      <div className="form_login">
        <div className="formheading_login">Login</div>
        <div className="item_login">
          <label htmlFor="username">UserName : </label>
          <input type="email" name="username" id="username" onChange={e => setForm({ ...form, username: e.target.value })} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="item_login">
          <label htmlFor="Password">Password : </label>
          <input type="password" name="Password" id="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <p>If you are not a existing user then <Link to="/register">click here</Link></p>
        <button onClick={handleLogin}>Login</button>

      </div>

    </div>
  );
}

export default LoginPage;
