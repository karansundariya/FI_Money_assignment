import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="card w-full max-w-md" style={{boxShadow: '0 4px 16px 0 rgba(255,145,77,0.08)', borderRadius: '1.5rem', background: 'var(--surface-color)'}}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2" style={{fontFamily: 'Quicksand, Inter, sans-serif'}}>
            Welcome to FiMONEY
          </h1>
          <p className="text-secondary" style={{fontFamily: 'Quicksand, Inter, sans-serif'}}>
            Sign in to manage your inventory
          </p>
        </div>
        
        {error && (
          <div className="bg-error text-white p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-primary mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            className="w-full"
            style={{background: 'var(--primary-color)', borderRadius: '1rem', fontFamily: 'Quicksand, Inter, sans-serif', fontWeight: 600, letterSpacing: '0.02em'}} 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-secondary">
            Demo credentials: admin / admin
          </p>
          <div className="border-t border-border-color pt-4">
            <p className="text-sm text-secondary mb-2">
              Don't have an account?
            </p>
            <Link to="/signup" className="text-primary hover:text-primary-hover font-medium">
              Create a new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 