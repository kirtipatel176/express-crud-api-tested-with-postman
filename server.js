require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('✅ API is running'));

app.use('/products', productRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Server failed:', err.message);
  }
};

startServer();
