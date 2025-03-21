import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import authRoutes from './routes/adminRoutes/auth.routes.js';
import wholesalerRoutes from './routes/adminRoutes/wholesalers.routes.js';
import productRoutes from './routes/adminRoutes/product.routes.js';
import categoryRoutes from './routes/adminRoutes/category.routes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

app.use('/admin', categoryRoutes)
app.use('/admin', productRoutes)
app.use('/admin', wholesalerRoutes)
app.use('/auth', authRoutes);

app.listen(PORT , ()=> {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});