const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/', require('./routes/routes'));

app.set("port", 5002);
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});