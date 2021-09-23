require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const app = express();
const port = process.env.API_PORT;
const userRouter = require('./routes/userRoutes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log('The server has been initialized at port ' + port);
});