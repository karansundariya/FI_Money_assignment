const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  // console.log('Auth middleware - JWT_SECRET:', process.env.JWT_SECRET_KEY ? 'Present' : 'Missing');
  // console.log('Auth middleware - Token:', token ? 'Present' : 'Missing');
  
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Auth middleware - Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth middleware - Token verification error:', err.message);
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
}; 