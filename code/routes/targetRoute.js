var express = require('express');
var router = express.Router();
var mTarget = require("../models/targetModel");

router.get('/:targetID/tasks/week/1', async function(req, res, next) {
    let targetID = req.params.targetID;
    let tasks = await mTarget.getTargetsThisWeeksTasks(1, targetID);
    res.send(tasks);
});

router.get('/:targetID/tasks/week/2', async function(req, res, next) {
    let targetID = req.params.targetID;
    let tasks = await mTarget.getTargets1WeekOldTasks(1, targetID);
    res.send(tasks);
});

router.get('/:targetID/tasks/week/3', async function(req, res, next) {
    let targetID = req.params.targetID;
    let tasks = await mTarget.getTargets2WeeksOldTasks(1, targetID);
    res.send(tasks);
});

router.get('/:targetID/tasks/week/4', async function(req, res, next) {
    let targetID = req.params.targetID;
    let tasks = await mTarget.getTargets3WeeksOldTasks(1, targetID);
    res.send(tasks);
});

module.exports = router;