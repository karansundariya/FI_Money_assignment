import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Analytics from './components/Analytics';

function Navigation({ token, onLogout }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-surface shadow-md border-b border-border-color sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-12">
            <span style={{fontSize: '2rem', marginRight: '0.5rem'}} role="img" aria-label="avatar">🧑‍💻</span>
            <Link to="/products" className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors">
              FiMONEY
            </Link>
            {token && (
              <div className="flex items-center gap-8">
                <Link 
                  to="/products" 
                  className={`nav-link ${isActive('/products') ? 'active' : ''}`}
                >
                  Products
                </Link>
                <Link 
                  to="/add" 
                  className={`nav-link ${isActive('/add') ? 'active' : ''}`}
                >
                  Add Product
                </Link>
                <Link 
                  to="/analytics" 
                  className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
                >
                  Analytics
                </Link>
              </div>
            )}
          </div>
          <div>
            {token ? (
              <button 
                onClick={onLogout} 
                className="button secondary"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-6">
                <Link to="/login" className="button secondary">
                  Login
                </Link>
                <Link to="/signup" className="button">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (jwt) => {
    setToken(jwt);
    localStorage.setItem('token', jwt);
  };

  const handleSignup = (jwt) => {
    setToken(jwt);
    localStorage.setItem('token', jwt);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="min-h-screen bg-background-color">
        <Navigation token={token} onLogout={handleLogout} />
        <main className="container py-12">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="/products" element={token ? <ProductList token={token} /> : <Navigate to="/login" />} />
            <Route path="/add" element={token ? <AddProduct token={token} /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={token ? <Analytics token={token} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/products" />} />
          </Routes>
        </main>
        <footer>
          Made with <span role="img" aria-label="love">❤️</span> by Karan Sundariya
        </footer>
      </div>
    </Router>
  );
}

export default App;
