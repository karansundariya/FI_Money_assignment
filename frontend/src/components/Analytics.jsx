import React, { useEffect, useState } from 'react';

function Analytics({ token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, [token]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:8080/analytics/most-added', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      
      if (res.ok) {
        setData(result.products || []);
      } else {
        setError(result.message || 'Failed to load analytics');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTopProducts = () => data.slice(0, 5);
  const getTotalProducts = () => data.reduce((sum, item) => sum + item.count, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-secondary">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="card max-w-md text-center">
          <div className="text-error mb-4">{error}</div>
          <button onClick={fetchAnalytics} className="button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{color: 'var(--primary-color)', fontFamily: 'Quicksand, Inter, sans-serif'}}>
          Analytics Dashboard
        </h1>
        <p className="text-secondary" style={{fontFamily: 'Quicksand, Inter, sans-serif'}}>
          Insights into your product inventory
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card" style={{boxShadow: '0 4px 16px 0 rgba(255,145,77,0.08)', borderRadius: '1.5rem', background: 'var(--surface-color)'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm">Total Products</p>
              <p className="text-2xl font-bold text-primary">{data.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card" style={{boxShadow: '0 4px 16px 0 rgba(255,145,77,0.08)', borderRadius: '1.5rem', background: 'var(--surface-color)'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm">Total Entries</p>
              <p className="text-2xl font-bold text-success">{getTotalProducts()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card" style={{boxShadow: '0 4px 16px 0 rgba(255,145,77,0.08)', borderRadius: '1.5rem', background: 'var(--surface-color)'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm">Most Popular</p>
              <p className="text-lg font-bold text-warning">
                {data.length > 0 ? data[0]._id.name : 'N/A'}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Most Added Products Table */}
      <div className="card" style={{boxShadow: '0 4px 16px 0 rgba(255,145,77,0.08)', borderRadius: '1.5rem', background: 'var(--surface-color)'}}>
        <div className="mb-6">
          <h2 className="text-xl font-bold">Most Added Products</h2>
          <p className="text-secondary">Products with the highest number of entries</p>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-secondary mb-4">No analytics data available</div>
            <p className="text-sm text-secondary">Add some products to see analytics</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border-color">
                <tr>
                  <th className="text-left p-4 font-medium text-primary">Rank</th>
                  <th className="text-left p-4 font-medium text-primary">Product Name</th>
                  <th className="text-left p-4 font-medium text-primary">SKU</th>
                  <th className="text-left p-4 font-medium text-primary">Times Added</th>
                  <th className="text-left p-4 font-medium text-primary">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product, index) => {
                  const percentage = ((product.count / getTotalProducts()) * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b border-border-color hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{product._id.name}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {product._id.sku}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-lg">{product.count}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-secondary w-12">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Chart Visualization */}
      {data.length > 0 && (
        <div className="card" style={{boxShadow: '0 4px 16px 0 rgba(255,145,77,0.08)', borderRadius: '1.5rem', background: 'var(--surface-color)'}}>
          <div className="mb-6">
            <h2 className="text-xl font-bold">Visual Distribution</h2>
            <p className="text-secondary">Graphical representation of product entries</p>
          </div>
          
          <div className="space-y-4">
            {getTopProducts().map((product, index) => {
              const percentage = ((product.count / getTotalProducts()) * 100).toFixed(1);
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium truncate">
                    {product._id.name}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full transition-all duration-300 ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-500' :
                        index === 2 ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-right text-sm font-medium">
                    {product.count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics; 