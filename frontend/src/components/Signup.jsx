import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup({ onSignup }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (form.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      
      if (res.ok && data.token) {
        onSignup(data.token);
      } else {
        setError(data.message || 'Signup failed');
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
            Create Account
          </h1>
          <p className="text-secondary" style={{fontFamily: 'Quicksand, Inter, sans-serif'}}>
            Join FiMONEY to manage your inventory
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
              Username *
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              className={errors.username ? 'border-error' : ''}
              disabled={isLoading}
            />
            {errors.username && <p className="text-error text-sm mt-1">{errors.username}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
              Email (Optional)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'border-error' : ''}
              disabled={isLoading}
            />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'border-error' : ''}
              disabled={isLoading}
            />
            {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-2">
              Confirm Password *
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'border-error' : ''}
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full"
            style={{background: 'var(--primary-color)', borderRadius: '1rem', fontFamily: 'Quicksand, Inter, sans-serif', fontWeight: 600, letterSpacing: '0.02em'}} 
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-secondary">
            By creating an account, you agree to our terms of service
          </p>
          <div className="border-t border-border-color pt-4">
            <p className="text-sm text-secondary mb-2">
              Already have an account?
            </p>
            <Link to="/login" className="text-primary hover:text-primary-hover font-medium">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup; 