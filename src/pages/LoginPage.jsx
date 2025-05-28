import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/login.css';
const API_BASE = '/api/Users'; // Proxy handles the domain

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    try {
      const res = await axios.get(`${API_BASE}/GetUserByUsernameAndPassword`, {
        params: {
          username: form.username,
          password: form.password
        }
      });

      if (res.data) {
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    
    <div class="main_login">
    <div class="form_login">
        <div class="formheading_login">Login</div>
        <div class="item_login">
            <label for="username">UserName : </label>
            <input type="email" name="username" id="username"  onChange={e => setForm({ ...form, username: e.target.value })}/>
        </div>
        <div class="item_login">
            <label for="Password">Password : </label>
            <input type="password" name="Password" id="Password" onChange={e => setForm({ ...form, password: e.target.value })}/>
        </div>
        <p>If you are not a existing user then <Link to="/register">click here</Link></p>
        <button onClick={handleLogin}>Login</button>

    </div>

</div>
  );
}

export default LoginPage;
