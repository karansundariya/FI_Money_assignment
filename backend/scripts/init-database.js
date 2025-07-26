const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('../models/User.js');
const Product = require('../models/Product.js');

// Sample data
const sampleUsers = [
  {
    username: 'admin',
    password: 'admin123',
    email: 'admin@fimoney.com',
    role: 'admin'
  },
  {
    username: 'demo',
    password: 'demo123',
    email: 'demo@fimoney.com',
    role: 'user'
  }
];

const sampleProducts = [
  {
    name: 'Laptop Dell XPS 13',
    type: 'Electronics',
    sku: 'LAP-DELL-XPS13-001',
    image_url: 'https://example.com/laptop.jpg',
    description: 'High-performance laptop with Intel i7 processor',
    quantity: 15,
    price: 1299.99
  },
  {
    name: 'Wireless Mouse Logitech MX Master',
    type: 'Electronics',
    sku: 'MOU-LOG-MX-001',
    image_url: 'https://example.com/mouse.jpg',
    description: 'Premium wireless mouse with ergonomic design',
    quantity: 25,
    price: 79.99
  },
  {
    name: 'Office Chair Ergonomic',
    type: 'Home & Garden',
    sku: 'CHA-OFF-ERG-001',
    image_url: 'https://example.com/chair.jpg',
    description: 'Comfortable office chair with lumbar support',
    quantity: 8,
    price: 299.99
  },
  {
    name: 'Coffee Maker Bialetti',
    type: 'Home & Garden',
    sku: 'COF-BIA-001',
    image_url: 'https://example.com/coffee-maker.jpg',
    description: 'Italian stovetop coffee maker',
    quantity: 12,
    price: 45.99
  },
  {
    name: 'Running Shoes Nike Air Max',
    type: 'Sports',
    sku: 'SHO-NIK-AIR-001',
    image_url: 'https://example.com/shoes.jpg',
    description: 'Comfortable running shoes with air cushioning',
    quantity: 20,
    price: 129.99
  }
];

async function initializeDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB successfully!');
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared');
    
    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    
    for (const userData of sampleUsers) {
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      
      const user = new User({
        username: userData.username,
        password: hashedPassword,
        email: userData.email,
        role: userData.role
      });
      
      await user.save();
      createdUsers.push(user);
      console.log(`✅ Created user: ${userData.username}`);
    }
    
    // Create products
    console.log('📦 Creating products...');
    const createdProducts = [];
    
    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
      createdProducts.push(product);
      console.log(`✅ Created product: ${productData.name}`);
    }
    
    // Create indexes
    console.log('📊 Creating database indexes...');
    
    // User indexes
    await User.collection.createIndex({ username: 1 }, { unique: true });
    await User.collection.createIndex({ email: 1 });
    
    // Product indexes
    await Product.collection.createIndex({ sku: 1 }, { unique: true });
    await Product.collection.createIndex({ name: 1 });
    await Product.collection.createIndex({ type: 1 });
    await Product.collection.createIndex({ quantity: 1 });
    
    console.log('✅ Database indexes created');
    
    // Summary
    console.log('\n🎉 Database initialization completed successfully!');
    console.log(`📊 Created ${createdUsers.length} users`);
    console.log(`📦 Created ${createdProducts.length} products`);
    console.log('\n🔑 Default login credentials:');
    console.log('   Username: admin, Password: admin123');
    console.log('   Username: demo, Password: demo123');
    console.log('\n🚀 You can now start the application!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase; 