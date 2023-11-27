const express = require('express');
require('./config/config')
require('dotenv').config();
const studentRouter = require('./routes/studentRouter')

const app = express();

app.use(express.json());

app.use('/api/student', studentRouter)

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
})