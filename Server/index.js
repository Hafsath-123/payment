require('dotenv').config();
const express = require('express');
const cors = require('cors');
const RunServer = require('./database/connection');
const productRoutes = require("./routes/productRoutes");
const paymentroutes = require("./routes/paymentroutes");
const path = require('path')


const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

// Static folder for image access
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentroutes);

RunServer()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
