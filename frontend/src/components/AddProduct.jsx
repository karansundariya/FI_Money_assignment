import React, { useState } from 'react';

function AddProduct({ token }) {
  const [form, setForm] = useState({ 
    name: '', 
    type: '', 
    sku: '', 
    image_url: '', 
    description: '', 
    quantity: '', 
    price: '' 
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const productTypes = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Toys',
    'Food & Beverages',
    'Automotive',
    'Other'
  ];

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
    
    if (!form.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (form.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }
    
    if (!form.type) {
      newErrors.type = 'Product type is required';
    }
    
    if (!form.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }
    
    if (!form.quantity || form.quantity < 0) {
      newErrors.quantity = 'Valid quantity is required';
    }
    
    if (!form.price || form.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          ...form, 
          quantity: Number(form.quantity), 
          price: Number(form.price) 
        })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage('Product added successfully!');
        setForm({ 
          name: '', 
          type: '', 
          sku: '', 
          image_url: '', 
          description: '', 
          quantity: '', 
          price: '' 
        });
        setErrors({});
      } else {
        setMessage(data.message || 'Error adding product');
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--primary-color)', fontFamily: 'Quicksand, Inter, sans-serif'}}>
          Add New Product
        </h1>
        <p className="text-secondary text-lg" style={{fontFamily: 'Quicksand, Inter, sans-serif'}}>
          Create a new product entry in your inventory
        </p>
      </div>

      <div className="card" style={{boxShadow: '0 4px 16px 0 rgba(255,145,77,0.08)', borderRadius: '1.5rem', background: 'var(--surface-color)'}}>
        {message && (
          <div className={`p-6 rounded-xl mb-8 text-sm ${
            message.includes('successfully') 
              ? 'bg-success text-white' 
              : 'bg-error text-white'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Name */}
            <div className="lg:col-span-2">
              <label htmlFor="name" className="form-label">
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'border-error' : ''}`}
                disabled={isLoading}
              />
              {errors.name && <p className="text-error text-sm mt-2">{errors.name}</p>}
            </div>

            {/* Product Type */}
            <div>
              <label htmlFor="type" className="form-label">
                Product Type *
              </label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`form-input ${errors.type ? 'border-error' : ''}`}
                disabled={isLoading}
              >
                <option value="">Select a type</option>
                {productTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <p className="text-error text-sm mt-2">{errors.type}</p>}
            </div>

            {/* SKU */}
            <div>
              <label htmlFor="sku" className="form-label">
                SKU *
              </label>
              <input
                id="sku"
                name="sku"
                type="text"
                placeholder="Enter SKU"
                value={form.sku}
                onChange={handleChange}
                className={`form-input ${errors.sku ? 'border-error' : ''}`}
                disabled={isLoading}
              />
              {errors.sku && <p className="text-error text-sm mt-2">{errors.sku}</p>}
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="form-label">
                Quantity *
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                placeholder="Enter quantity"
                value={form.quantity}
                onChange={handleChange}
                className={`form-input ${errors.quantity ? 'border-error' : ''}`}
                disabled={isLoading}
              />
              {errors.quantity && <p className="text-error text-sm mt-2">{errors.quantity}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="form-label">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary font-medium">$</span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  className={`form-input pl-10 ${errors.price ? 'border-error' : ''}`}
                  disabled={isLoading}
                />
              </div>
              {errors.price && <p className="text-error text-sm mt-2">{errors.price}</p>}
            </div>

            {/* Image URL */}
            <div className="lg:col-span-2">
              <label htmlFor="image_url" className="form-label">
                Image URL
              </label>
              <input
                id="image_url"
                name="image_url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.image_url}
                onChange={handleChange}
                className="form-input"
                disabled={isLoading}
              />
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Enter product description"
                value={form.description}
                onChange={handleChange}
                className="form-input"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-8 border-t border-border-color" style={{borderTop: '2px dashed var(--secondary-color)'}}>
            <button
              type="submit"
              className="flex-1"
              style={{background: 'var(--primary-color)', borderRadius: '1rem', fontFamily: 'Quicksand, Inter, sans-serif', fontWeight: 600, letterSpacing: '0.02em'}} 
              disabled={isLoading}
            >
              {isLoading ? 'Adding Product...' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => {
                setForm({ 
                  name: '', 
                  type: '', 
                  sku: '', 
                  image_url: '', 
                  description: '', 
                  quantity: '', 
                  price: '' 
                });
                setErrors({});
                setMessage('');
              }}
              className="button secondary"
              style={{borderRadius: '1rem', fontFamily: 'Quicksand, Inter, sans-serif', fontWeight: 600, letterSpacing: '0.02em'}}
              disabled={isLoading}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct; 