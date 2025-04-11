import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import authRoutes from './routes/adminRoutes/auth.routes.js';
import wholesalerRoutes from './routes/adminRoutes/wholesalers.routes.js';
import productRoutes from './routes/adminRoutes/product.routes.js';
import categoryRoutes from './routes/adminRoutes/category.routes.js';
import brandRoutes from './routes/adminRoutes/brand.routes.js';
import orderRoutes from './routes/adminRoutes/order.routes.js';
import category from './routes/userRoutes/home.routes.js';
import cors from 'cors';
import session from "express-session";
import helmet from 'helmet';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();



app.use(cors({
    origin: ['http://localhost:5173','https://kewi.ps','http://kewi.ps'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET, // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/admin', orderRoutes);
app.use('/admin', brandRoutes);
app.use('/admin', categoryRoutes);
app.use('/admin', productRoutes);
app.use('/admin', wholesalerRoutes);
app.use('/auth', authRoutes);

app.use('/user', category);

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'static/index.html'));
})

app.listen(PORT , ()=> {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});