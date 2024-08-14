import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const apiurl=import.meta.env.VITE_BACKEND_API;
  
  if (!apiurl) {
    console.error("API URL is not defined! Please check your .env file.");
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post( apiurl + 'login', {
        username,
        password,
      });

      const token = response.data.access_token;
      const token_type = response.data.token_type;

     
      
      localStorage.setItem('token', token);
      localStorage.setItem('token_type', token_type);
 
      window.location.href = '/';
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='container'>
      <div className='row' style={{ height: '100vh' }}>
        <div className='col d-flex justify-content-center align-items-center flex-column'>
          {localStorage.getItem('token') ? (
            <h4>You are signed in! Enjoy the Calculator</h4>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  className="form-control"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;