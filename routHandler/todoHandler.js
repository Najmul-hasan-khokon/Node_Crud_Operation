const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');

const router = express.Router();
const Todo = new mongoose.model('Todo', todoSchema);

// get the all route
router.get('/', async (req, res) => {
    try {
        await Todo.find({ status: 'active' }, (err, data) => {
            res.status(200).json({
                data,
                message: 'todo was geted successfully',
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'there was an server side error' });
        console.log(error);
    }
});
router.get('/me:id', async (req, res) => {
    await Todo.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: 'there was an server side error',
            });
        } else {
            res.status(200).json({
                data,
                message: 'todo was geted successfully',
            });
        }
    });
});

// post route
router.post('/', async (req, res) => {
    try {
        const smalltodo = new Todo(req.body);
        const newtodo = await smalltodo.save();
        res.status(200).json({ newtodo });
    } catch (error) {
        res.status(500).json({ error: 'there was a server side error from post' });
        console.log(error);
    }
});
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: 'todo was inserted successfully',
        });
    } catch (error) {
        res.status(500).json({
            error: 'there was a server side error from post multiple',
        });
    }
});

// put route
router.put('/:id', (req, res) => {
    Todo.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: 'hasan abul',
            },
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: 'there was a server side error from put',
                });
            } else {
                res.status(200).json({
                    message: 'todo was updated successfully',
                });
            }
        },
    );
});
// delete route
router.delete('/', (req, res) => {
    Todo.deleteMany({ status: 'inactive' }, (err) => {
        if (err) {
            res.status(500).json({ error: 'there was a server side error' });
        } else {
            res.status(200).json({ message: 'todo was deleted successfully' });
        }
    });
});

module.exports = router;
