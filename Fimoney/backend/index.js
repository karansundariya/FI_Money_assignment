const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const authRoutes = require('./routes/auth.js');
const productRoutes = require('./routes/products.js');
const analyticsRoutes = require('./routes/analytics.js');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
// console.log("hamara",process.env.MONGODB_URI);
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Inventory Management API');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 