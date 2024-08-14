import React from 'react';
import axios from 'axios';

const NavBar = () => {
    const apiurl=import.meta.env.VITE_BACKEND_API;
  
    if (!apiurl) {
        console.error("API URL is not defined! Please check your .env file.");
    }

    const handleLogout = async () => {
        try {
            await axios.post(apiurl + 'logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            localStorage.removeItem('token_type');
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img 
                        src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" 
                        width="30" 
                        height="30" 
                        className="d-inline-block align-top" 
                        alt="" 
                    />
                    Calculator
                </a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        <a className="nav-link" href="/calculate">Calculate</a>
                        <a className="nav-link" href="/records">Records</a>            
                    </div>
                    <hr className="bg-white border-2 border-top border-white" />
                    <div className="navbar-nav ms-auto">
                        {
                            localStorage.getItem('token') ? 
                            (
                                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                            ) : 
                            (
                                <a className="nav-link" href="/login">Login</a>        
                            )        
                        }       
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
