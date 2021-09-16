const express = require('express');
const mongoose = require('mongoose');
const todohandler = require('./routHandler/todoHandler');
// app initialization
const app = express();
app.use(express.json());
// mongoose connection with mongodb
mongoose
    .connect('mongodb://localhost/todo')
    .then(() => console.log('mongoose connection is successful'))
    .catch((err) => console.log(err));

// app route handler
app.use('/todo', todohandler);

// default error handler
app.use((req, res, next) => {
    res.status(404).send('fill was not found');
});

app.use((err, req, res, next) => {
    if (res.headerSent) {
        next('header already sent');
    } else {
        res.status(500).send('there was a server side error');
    }
});
app.listen(3000, () => {
    console.log('server is running');
});
