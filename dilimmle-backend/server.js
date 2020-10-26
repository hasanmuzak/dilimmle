const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const dbSettings = require('./config/db').MongoURL;
const cors = require('cors');

// DB Connection
mongoose.connect(dbSettings, {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true})
    .then(()=>{
        console.log('Connected to MongoDB!');
    })
    .catch(err => {
        console.log(err);
    })

// Environment Variables
const PORT = process.env.PORT;

//Routers
const userRouter = require('./routers/user');
const articleRouter = require('./routers/article');
const apiRouter = require('./routers/api');
const translateRouter = require('./routers/translate');
const utilRouter = require('./routers/util');

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);
app.use('/user', userRouter);
app.use('/articles', articleRouter);
app.use('/translate', translateRouter);
app.use('/utils', utilRouter);

app.listen(PORT, ()=> console.log(`Server started on ${PORT} successfuly.`));