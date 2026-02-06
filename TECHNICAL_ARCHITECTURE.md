# MediaScape - Technical Architecture & Implementation Guide

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT TIER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web App    │  │  Mobile App  │  │   Admin      │          │
│  │   (React)    │  │ (React Native)│  │   Portal     │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │
                    │  (Load Balancer)│
                    └────────┬────────┘
                             │
          ┌──────────────────┴──────────────────┐
          │                                      │
┌─────────▼─────────┐              ┌────────────▼──────────┐
│  Authentication   │              │   Application         │
│     Service       │              │      Server           │
│   (JWT/OAuth)     │              │    (Node.js/Express)  │
└─────────┬─────────┘              └────────────┬──────────┘
          │                                      │
          │                  ┌───────────────────┴────────────────┐
          │                  │                                     │
          │         ┌────────▼────────┐                 ┌─────────▼────────┐
          │         │   Business      │                 │    External      │
          │         │    Logic        │                 │    Services      │
          │         │   (Services)    │                 │  - Payment API   │
          │         └────────┬────────┘                 │  - Email/SMS     │
          │                  │                          │  - File Storage  │
          │                  │                          └──────────────────┘
          │         ┌────────▼────────┐
          │         │   Data Access   │
          │         │     Layer       │
          │         └────────┬────────┘
          │                  │
          │         ┌────────▼────────┐
          └─────────┤    Database     │
                    │  (PostgreSQL)   │
                    └─────────────────┘
                             │
                    ┌────────▼────────┐
                    │   File Storage  │
                    │   (AWS S3/CDN)  │
                    └─────────────────┘
```

---

## Technology Stack Breakdown

### Frontend Layer

#### Web Application (React)
```javascript
// Core Dependencies
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "lucide-react": "^0.263.0",
  "axios": "^1.3.0"
}

// State Management
{
  "@reduxjs/toolkit": "^1.9.0", // or
  "zustand": "^4.3.0"
}

// Form Handling
{
  "react-hook-form": "^7.43.0",
  "yup": "^1.0.0"
}

// UI Components (Optional)
{
  "tailwindcss": "^3.2.0",
  "@headlessui/react": "^1.7.0"
}
```

#### File Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Navigation.jsx
│   ├── client/
│   │   ├── CampaignCard.jsx
│   │   ├── CampaignForm.jsx
│   │   └── StatsCard.jsx
│   └── freelancer/
│       ├── ClientCard.jsx
│       └── CommissionCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Categories.jsx
│   ├── Regions.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ClientDashboard.jsx
│   └── FreelancerDashboard.jsx
├── services/
│   ├── api.js
│   ├── auth.js
│   └── campaigns.js
├── hooks/
│   ├── useAuth.js
│   └── useCampaigns.js
├── context/
│   └── AuthContext.jsx
├── utils/
│   ├── constants.js
│   └── helpers.js
└── App.jsx
```

### Backend Layer

#### API Server (Node.js + Express)
```javascript
// Core Dependencies
{
  "express": "^4.18.0",
  "cors": "^2.8.5",
  "helmet": "^7.0.0",
  "compression": "^1.7.4"
}

// Authentication
{
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "passport": "^0.6.0",
  "passport-jwt": "^4.0.1"
}

// Database
{
  "pg": "^8.10.0", // PostgreSQL
  "sequelize": "^6.30.0", // ORM
  // or
  "mongoose": "^7.0.0" // if using MongoDB
}

// Validation
{
  "joi": "^17.8.0",
  "express-validator": "^7.0.0"
}

// Email & SMS
{
  "nodemailer": "^6.9.0",
  "twilio": "^4.10.0"
}

// File Handling
{
  "multer": "^1.4.5",
  "aws-sdk": "^2.1330.0"
}

// Payment
{
  "stripe": "^12.0.0"
}
```

#### Backend Structure
```
server/
├── config/
│   ├── database.js
│   ├── auth.js
│   └── aws.js
├── controllers/
│   ├── authController.js
│   ├── clientController.js
│   ├── freelancerController.js
│   └── adminController.js
├── models/
│   ├── User.js
│   ├── Campaign.js
│   ├── Commission.js
│   └── Payment.js
├── routes/
│   ├── auth.js
│   ├── client.js
│   ├── freelancer.js
│   └── admin.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── services/
│   ├── emailService.js
│   ├── paymentService.js
│   └── storageService.js
├── utils/
│   ├── logger.js
│   └── helpers.js
└── server.js
```

---

## Database Schema

### PostgreSQL Schema

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('client', 'freelancer', 'admin')),
    referral_code VARCHAR(20) UNIQUE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns Table
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    variant VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    country VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'cancelled')),
    design_by VARCHAR(20) NOT NULL CHECK (design_by IN ('client', 'company')),
    design_file_url TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    duration_months INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Freelancer-Client Relationships
CREATE TABLE freelancer_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    freelancer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    UNIQUE(freelancer_id, client_id)
);

-- Commissions Table
CREATE TABLE commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    freelancer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    month VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    client_spend DECIMAL(10, 2) NOT NULL,
    commission_rate DECIMAL(3, 2) DEFAULT 0.10,
    commission_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255) UNIQUE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Design Requests Table
CREATE TABLE design_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    brief TEXT,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_progress', 'completed', 'rejected')),
    design_url TEXT,
    designer_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Activity Logs
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    metadata JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_campaigns_client ON campaigns(client_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_commissions_freelancer ON commissions(freelancer_id);
CREATE INDEX idx_commissions_month ON commissions(month);
CREATE INDEX idx_freelancer_clients_freelancer ON freelancer_clients(freelancer_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_referral ON users(referral_code);
```

---

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "phone": "+971501234567",
  "company": "Tech Corp",
  "userType": "client" | "freelancer"
}

Response (201):
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "userType": "client",
      "referralCode": "MKT7A2B9C" // if freelancer
    },
    "token": "jwt_token_here"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "userType": "client"
    },
    "token": "jwt_token_here"
  }
}
```

### Client Endpoints

#### Get Dashboard Data
```
GET /api/client/dashboard
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "stats": {
      "totalCampaigns": 5,
      "runningCampaigns": 3,
      "monthlyCost": 3700
    },
    "campaigns": [
      {
        "id": "uuid",
        "category": "T-Banner A",
        "price": 300,
        "country": "UAE",
        "region": "Dubai",
        "status": "running",
        "startDate": "2025-01-15"
      }
    ]
  }
}
```

#### Create Campaign
```
POST /api/client/campaign
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "category": "tBanner",
  "variant": "tbanner-a",
  "country": "UAE",
  "region": "Dubai",
  "designBy": "client",
  "duration": 3
}

Response (201):
{
  "success": true,
  "data": {
    "campaign": {
      "id": "uuid",
      "category": "T-Banner A",
      "price": 300,
      "status": "pending",
      "createdAt": "2025-02-06T10:30:00Z"
    }
  }
}
```

### Freelancer Endpoints

#### Get Dashboard Data
```
GET /api/freelancer/dashboard
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "stats": {
      "totalClients": 10,
      "monthlyCommission": 1250,
      "totalAdValue": 12500
    },
    "referralCode": "MKT7A2B9C",
    "clients": [
      {
        "id": "uuid",
        "name": "Tech Corp",
        "email": "contact@techcorp.com",
        "totalAds": 3,
        "monthlyValue": 2200,
        "commission": 220,
        "status": "active",
        "joinDate": "2025-01-10"
      }
    ]
  }
}
```

---

## Security Implementation

### Password Hashing
```javascript
// server/utils/auth.js
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}
```

### JWT Token Generation
```javascript
// server/utils/jwt.js
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      userType: user.userType 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
```

### Authentication Middleware
```javascript
// server/middleware/auth.js
const { verifyToken } = require('../utils/jwt');

async function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }

  req.user = decoded;
  next();
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.userType)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Insufficient permissions' 
      });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
```

---

## Payment Integration

### Stripe Integration
```javascript
// server/services/paymentService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPaymentIntent(amount, currency = 'USD', metadata = {}) {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: currency.toLowerCase(),
    metadata
  });

  return paymentIntent;
}

async function processMonthlyBilling(clientId) {
  // Get all active campaigns for client
  const campaigns = await Campaign.findAll({
    where: { 
      clientId, 
      status: 'running' 
    }
  });

  // Calculate total monthly cost
  const totalCost = campaigns.reduce((sum, campaign) => sum + campaign.price, 0);

  // Create payment intent
  const paymentIntent = await createPaymentIntent(totalCost, 'USD', {
    clientId,
    month: new Date().toISOString().slice(0, 7),
    campaigns: campaigns.map(c => c.id)
  });

  return paymentIntent;
}
```

---

## File Upload Handling

### AWS S3 Configuration
```javascript
// server/config/aws.js
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

async function uploadFile(file, folder = 'designs') {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${folder}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  const result = await s3.upload(params).promise();
  return result.Location;
}

module.exports = { uploadFile };
```

### Multer Configuration
```javascript
// server/middleware/upload.js
const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept images and PDFs only
  if (
    file.mimetype.startsWith('image/') || 
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  }
});

module.exports = upload;
```

---

## Email Notification System

### Nodemailer Configuration
```javascript
// server/services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendWelcomeEmail(user) {
  const mailOptions = {
    from: 'MediaScape <noreply@mediascape.com>',
    to: user.email,
    subject: 'Welcome to MediaScape',
    html: `
      <h1>Welcome, ${user.name}!</h1>
      <p>Thank you for joining MediaScape.</p>
      ${user.userType === 'freelancer' ? 
        `<p>Your referral code: <strong>${user.referralCode}</strong></p>` : 
        ''
      }
      <p>Get started by logging into your dashboard.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

async function sendCampaignApprovalEmail(campaign, client) {
  const mailOptions = {
    from: 'MediaScape <noreply@mediascape.com>',
    to: client.email,
    subject: 'Campaign Approved',
    html: `
      <h1>Your campaign is now live!</h1>
      <p>Campaign: ${campaign.category}</p>
      <p>Location: ${campaign.region}, ${campaign.country}</p>
      <p>Start Date: ${campaign.startDate}</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { 
  sendWelcomeEmail, 
  sendCampaignApprovalEmail 
};
```

---

## Deployment Configuration

### Docker Setup
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mediascape
      - JWT_SECRET=${JWT_SECRET}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=mediascape
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Environment Variables
```bash
# .env.example
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/mediascape

# JWT
JWT_SECRET=your_super_secret_key_here

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=mediascape-assets

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Frontend URL
FRONTEND_URL=https://mediascape.com
```

---

## Testing Strategy

### Unit Tests (Jest)
```javascript
// tests/services/campaign.test.js
const { createCampaign } = require('../../services/campaignService');

describe('Campaign Service', () => {
  test('should create campaign with valid data', async () => {
    const campaignData = {
      clientId: 'test-uuid',
      category: 'tBanner',
      variant: 'tbanner-a',
      country: 'UAE',
      region: 'Dubai',
      designBy: 'client',
      duration: 3
    };

    const campaign = await createCampaign(campaignData);

    expect(campaign).toHaveProperty('id');
    expect(campaign.price).toBe(300);
    expect(campaign.status).toBe('pending');
  });

  test('should reject invalid category', async () => {
    const campaignData = {
      clientId: 'test-uuid',
      category: 'invalid',
      variant: 'invalid',
      country: 'UAE',
      region: 'Dubai',
      designBy: 'client',
      duration: 3
    };

    await expect(createCampaign(campaignData)).rejects.toThrow();
  });
});
```

### Integration Tests
```javascript
// tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../server');

describe('Auth API', () => {
  test('POST /api/auth/register - should create new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        userType: 'client'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });

  test('POST /api/auth/login - should authenticate user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });
});
```

---

## Monitoring & Logging

### Winston Logger Setup
```javascript
// server/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

---

## Performance Optimization

### Redis Caching
```javascript
// server/utils/cache.js
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

async function get(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) reject(err);
      resolve(data ? JSON.parse(data) : null);
    });
  });
}

async function set(key, value, expiry = 3600) {
  return new Promise((resolve, reject) => {
    client.setex(key, expiry, JSON.stringify(value), (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
}

module.exports = { get, set };
```

---

## Conclusion

This technical architecture provides a robust, scalable foundation for the MediaScape platform. The system is designed with security, performance, and maintainability as core principles, ensuring a professional-grade solution ready for production deployment.
