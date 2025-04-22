const express = require('express');
const cors = require('cors');
require('dotenv').config();
// console.log('Mongo URI:', process.env.MONGO_URI); // This line is now hidden

const connectDB = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const productoRoutes = require('./routes/productos');
app.use('/productos', productoRoutes);

const movimientoRoutes = require('./routes/movimientos');
app.use('/movimientos', movimientoRoutes);

const usuarioRoutes = require('./routes/usuarios');
app.use('/usuarios', usuarioRoutes);

// Error handling middleware (should be after all routes)
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

console.log('Connecting to MongoDB...');
connectDB()
    .then(() => {
        console.log('✅ MongoDB connection established.');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running and listening on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });