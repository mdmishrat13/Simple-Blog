const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const colors = require("colors");
const connectDb = require("./db/db");
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const cookieParser = require('cookie-parser')



// middlewares 
app.use(express.json());
app.use(cors({origin:['http://localhost:3000'],credentials:true}))
app.use(cookieParser())



// routes 

app.use('/api/v1/auth',userRouter)
app.use('/api/v1/posts',postRouter)



const run = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.info("Server is running....".bgCyan.bold));
  } catch (error) {
    console.info(`ERROR:${error.message}`.bgRed.bold)
  }
};

run();