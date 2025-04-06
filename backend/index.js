const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require('./controller/UserController');
const productRoute = require('./controller/ProductController');
const cartRoute = require('./controller/CartController');
const contactRoute = require('./controller/ContactController');

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use('/api/auth',userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/contact",contactRoute);



app.get('/',(req,res)=>{
    res.send("Express app is running");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})