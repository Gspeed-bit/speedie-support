require('dotenv').config();
const path = require("path")
const colors = require('colors');
const express = require('express');
const { connectDB } = require('./config/db');

const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

//connect to database
connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));



app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));



//serve frontend

if(process.env.Node_ENV === "production"){
  //set build folder as static
  app.use(express.static(path.join(__dirname,'../frontend/build')));
  app.get("*",(req,res)=>res.sendFile)(__dirname,"../","frontend", "build","index.html")
} else{
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome to the speedie support desk' });
  });
}

app.use(errorHandler);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
