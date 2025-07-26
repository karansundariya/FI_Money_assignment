# FiMONEY Frontend - Inventory Management UI

A modern, responsive React application for the FiMONEY inventory management system.

## 🚀 Features

- **Modern React 18** with Vite for fast development
- **Responsive Design** that works on all devices
- **Real-time Search** and filtering capabilities
- **Beautiful UI** with custom design system
- **JWT Authentication** integration
- **Pagination** for large datasets
- **Form Validation** with real-time feedback

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see backend README)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Backend URL

The frontend is configured to connect to the backend at `http://localhost:8080`. If your backend is running on a different URL, update the API calls in the components.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Design System

The application uses a custom CSS design system with:

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold weights with proper hierarchy
- **Body Text**: Optimized for readability

### Components
- **Cards**: Elevated containers with hover effects
- **Buttons**: Multiple variants (primary, secondary, danger)
- **Forms**: Consistent styling with validation states
- **Tables**: Clean, responsive table design
- **Badges**: Color-coded status indicators

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly interface

## 🔧 Development

### Project Structure
```
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ProductList.jsx
│   │   ├── AddProduct.jsx
│   │   └── Analytics.jsx
│   ├── assets/         # Static assets
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   ├── index.css       # Global styles
│   └── App.css         # App-specific styles
├── public/             # Public assets
├── index.html          # HTML template
└── package.json        # Dependencies and scripts
```

### Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Key Components

#### Login.jsx
- User authentication form
- Error handling and validation
- Link to signup page

#### Signup.jsx
- User registration form
- Password confirmation
- Form validation

#### ProductList.jsx
- Product display with search
- Pagination
- Status indicators
- Responsive table

#### AddProduct.jsx
- Product creation form
- Real-time validation
- File upload support
- Success/error feedback

#### Analytics.jsx
- Data visualization
- Charts and graphs
- Summary statistics

## 🔗 API Integration

The frontend communicates with the backend API:

### Authentication
- Login: `POST /auth/login`
- Signup: `POST /auth/signup`

### Products
- List: `GET /products`
- Create: `POST /products`
- Update: `PUT /products/:id/quantity`

### Analytics
- Most Added: `GET /analytics/most-added`

### Authentication Headers
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

## 🧪 Testing

### Manual Testing
1. Start both backend and frontend servers
2. Visit `http://localhost:5173`
3. Test all features:
   - User registration and login
   - Product management
   - Search and filtering
   - Analytics dashboard

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build
npm run preview
```

### Deployment Options
- **Netlify**: Deploy the `dist` folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Deploy from `dist` folder
- **AWS S3**: Upload `dist` contents

### Environment Variables
For production, you may need to configure:
- `VITE_API_URL`: Backend API URL
- `VITE_APP_NAME`: Application name

## 🎯 Performance

### Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Assets**: Compressed images and fonts
- **Caching**: Proper cache headers

### Bundle Analysis
```bash
npm run build
# Check the dist folder for optimized files
```

## 🔒 Security

### Best Practices
- **HTTPS**: Always use HTTPS in production
- **CORS**: Proper CORS configuration
- **Input Validation**: Client-side validation
- **XSS Protection**: Sanitized inputs

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your browser version and error logs

## 🔗 Links

- [Backend Repository](../backend)
- [Main README](../README.md)
- [API Documentation](http://localhost:8080/api-docs)
