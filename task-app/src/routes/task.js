const express = require('express');
const Task = require('../models/task');

const router = express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }

    // task.save().then(() => {
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // });

})


// get all tasks
router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        if (!tasks) {
            return res.status(204).send('Empty Dataset');
        }
        res.send(tasks);

    } catch (error) {
        res.status(500).send(error);
    }

    // Task.find({}).then((tasks) => {
    //     if (!tasks) {
    //         return res.status(204).send('Empty Dataset');
    //     }
    //     res.send(tasks);

    // }).catch((error) => {
    //     res.status(500).send(error);

    // });

});

// get task by id
router.get('/tasks/:id', async (req, res) => {

    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send('Not Found');
        }

        res.send(task);

    } catch (error) {
        res.status(500).send(error);
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send('task not found');
    //     }
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // });

});

router.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'isCompleted'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update Request..!!' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send();
    }

});

module.exports = router;