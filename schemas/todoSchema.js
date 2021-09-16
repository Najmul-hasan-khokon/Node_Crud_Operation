const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
});
module.exports = todoSchema;
