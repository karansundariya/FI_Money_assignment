const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User.js');
const hashPassword = require('../utils/hash.js');

dotenv.config();

async function createUser(username, password, role = 'user') {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const hashed = await hashPassword(password);
  const user = new User({ username, password: hashed, role });
  await user.save();
  console.log('User created:', username);
  mongoose.disconnect();
}

// Usage: node src/scripts/createUser.js <username> <password> [role]
if (require.main === module) {
  const [,, username, password, role] = process.argv;
  if (!username || !password) {
    console.log('Usage: node src/scripts/createUser.js <username> <password> [role]');
    process.exit(1);
  }
  createUser(username, password, role);
} 