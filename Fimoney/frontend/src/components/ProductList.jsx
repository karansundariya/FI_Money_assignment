import React, { useEffect, useState } from 'react';

function ProductList({ token }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [page, token, limit]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/products?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-secondary text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--primary-color)', fontFamily: 'Quicksand, Inter, sans-serif'}}>
            Product Inventory
          </h1>
          <p className="text-secondary text-lg" style={{fontFamily: 'Quicksand, Inter, sans-serif'}}>
            Manage your product catalog efficiently
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary" style={{fontFamily: 'Quicksand, Inter, sans-serif'}}>{total}</div>
          <div className="text-sm text-secondary" style={{fontFamily: 'Quicksand, Inter, sans-serif'}}>Total Products</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card" style={{boxShadow: '0 4px 16px 0 rgba(255,145,77,0.08)', borderRadius: '1.5rem', background: 'var(--surface-color)'}}>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <label htmlFor="search" className="form-label">Search Products</label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, SKU, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="button secondary"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="table-container" style={{boxShadow: '0 2px 8px 0 rgba(106,177,135,0.08)', borderRadius: '1.5rem', background: 'var(--surface-color)'}}>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Type</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <div className="text-secondary mb-2">
                      {searchTerm ? 'No products found matching your search.' : 'No products available.'}
                    </div>
                    <p className="text-sm text-secondary">
                      {searchTerm ? 'Try adjusting your search terms.' : 'Add your first product to get started.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td>
                      <div>
                        <div className="font-semibold text-lg">{product.name}</div>
                        {product.description && (
                          <div className="text-sm text-secondary mt-1">{product.description}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary">
                        {product.type}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg">
                        {product.sku}
                      </span>
                    </td>
                    <td>
                      <span className={`font-bold text-lg ${
                        product.quantity === 0 ? 'text-error' : 
                        product.quantity < 10 ? 'text-warning' : 'text-success'
                      }`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td>
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    </td>
                    <td>
                      <span className={`badge ${
                        product.quantity === 0 ? 'badge-error' :
                        product.quantity < 10 ? 'badge-warning' :
                        'badge-success'
                      }`}>
                        {product.quantity === 0 ? 'Out of Stock' :
                         product.quantity < 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-surface rounded-xl p-6 shadow-sm" style={{boxShadow: '0 2px 8px 0 rgba(255,145,77,0.06)', fontFamily: 'Quicksand, Inter, sans-serif'}}>
          <div className="text-secondary">
            Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} products
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="button secondary"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    pageNum === page
                      ? 'bg-primary text-white'
                      : 'text-secondary hover:text-primary hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              className="button secondary"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList; 