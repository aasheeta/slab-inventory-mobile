// backend/server.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connectDB = require('./config/db');

const authRoutes   = require('./routes/authRoutes');
const bundleRoutes = require('./routes/bundleRoutes');
const blockRoutes = require('./routes/blockRoutes')
const materialRoutes = require('./routes/materialRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// all auth endpoints now live under /api/auth
app.use('/api/auth', authRoutes);

// all bundle endpoints need a valid token
app.use('/api/bundles', bundleRoutes);
app.use('/api/blocks', blockRoutes);  
app.use('/api/materials', materialRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
