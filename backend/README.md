# CampusSync Backend

This is the backend service for CampusSync, built with Express.js and MongoDB.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud instance)

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

Start the production server:
```bash
npm start
```

## 📁 Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Mongoose models
├── routes/         # API route definitions
├── services/       # Business logic
├── utils/          # Utility functions
├── validators/     # Input validation
└── server.js       # Express app setup
```

## 🛠️ API Endpoints

### Health Check
- `GET /api/health` - Check if the server is running

## 📦 Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/campussync
```

## 🧪 Testing

Run tests:
```bash
npm test
```