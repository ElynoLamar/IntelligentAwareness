var express = require('express');
var router = express.Router();
var mTarget = require("../models/targetModel");
//gets performance of targetID for this ongoing week
router.get('/:targetID/tasks/week/1', async function(req, res, next) {
    let targetID = req.params.targetID;
    let tasks = await mTarget.getTargetsThisWeeksTasks(1, targetID);
    res.send(tasks);
});
//gets performance of targetID for past week
router.get('/:targetID/tasks/week/2', async function(req, res, next) {
    let targetID = req.params.targetID;
    let tasks = await mTarget.getTargets1WeekOldTasks(1, targetID);
    res.send(tasks);
});
//gets performance of targetID for 2 weeks ago
router.get('/:targetID/tasks/week/3', async function(req, res, next) {
    let targetID = req.params.targetID;
    let tasks = await mTarget.getTargets2WeeksOldTasks(1, targetID);
    res.send(tasks);
});
//gets performance of targetID for 3 weeks ago
router.get('/:targetID/tasks/week/4', async function(req, res, next) {
    let targetID = req.params.targetID;
    let tasks = await mTarget.getTargets3WeeksOldTasks(1, targetID);
    res.send(tasks);
});
//gets all targets from community 1 ( only one community existing )
router.get('/', async function(req, res, next) {
    let targets = await mTarget.getTargets();
    res.send(targets);
});


// gets a prediction for a specific person and puts that prediction on the database
router.put('/:targetID/prediction/:prediction', async function(req, res, next) {
    let targetID = req.params.targetID;
    let prediction = req.params.prediction;
    let targets = await mTarget.updateTargetsPrediction(targetID, prediction);
    res.send(targets);
});


module.exports = router;