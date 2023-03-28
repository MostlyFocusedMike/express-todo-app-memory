const express = require('express');
const taskController = require('./controllers/task');
const addModels = require('./middleware/add-models');

const router = express.Router();

router.use(addModels);

router.post('/api/tasks', taskController.create); // CREATE
router.get('/api/tasks', taskController.list); // READ
router.patch('/api/tasks/:taskId', taskController.update); // UPDATE
router.delete('/api/tasks/:taskId', taskController.destroy); // DELETE
router.delete('/api/tasks', taskController.destroyAll); // DELETE ALL

module.exports = router;
