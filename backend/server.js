import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import authRoutes from './routes/adminRoutes/auth.routes.js';
import wholesalerRoutes from './routes/adminRoutes/wholesalers.routes.js';
import productRoutes from './routes/adminRoutes/product.routes.js';
import categoryRoutes from './routes/adminRoutes/category.routes.js';
import brandRoutes from './routes/adminRoutes/brand.routes.js';
import orderRoutes from './routes/adminRoutes/order.routes.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
import session from "express-session";


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Initialize session middleware (place this in your main server file: app.js or server.js)
app.use(session({
    secret: "your_secret_key", // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

app.use('/admin', orderRoutes)
app.use('/admin', brandRoutes)
app.use('/admin', categoryRoutes)
app.use('/admin', productRoutes)
app.use('/admin', wholesalerRoutes)
app.use('/auth', authRoutes);

app.listen(PORT , ()=> {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});