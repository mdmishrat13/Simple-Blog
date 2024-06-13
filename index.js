const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const colors = require("colors");
const connectDb = require("./db/db");
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const commentRouter = require('./routes/commentRoutes')
const reactRouter = require('./routes/reactRoutes')
const followRouter = require('./routes/followersRoutes')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const multer = require('multer')



// middlewares 
app.use(express.json());
app.use(cors({origin:['http://localhost:3000'],credentials:true}))
app.use(cookieParser())



// routes 

app.use('/api/v1/auth',userRouter)
app.use('/api/v1/posts',postRouter)
app.use('/api/v1/comment',commentRouter)
app.use('/api/v1/reacts',reactRouter)
app.use('/api/v1/follow',followRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const run = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.info("Server is running....".bgCyan.bold));
  } catch (error) {
    console.info(`ERROR:${error.message}`.bgRed.bold)
  }
};

run();