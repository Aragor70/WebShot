require('dotenv').config({ path: './config/config.env' })
const express = require('express');
const app = express()
const path = require('path');


app.use(express.json());


app.use('/api/urls', require('./routes/api/urls'));



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`.green));

process.on('unhandledRejection', (err, _promise) => {
    console.log(`Error message: ${err.message}`.red)
    server.close(() => process.exit(1))
})
