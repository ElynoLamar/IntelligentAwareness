var pool = require("./connection");
//gets performance of targetID for this ongoing week
module.exports.getTargetsThisWeeksTasks = async function(communityID, userID) {
        try {
            var query = "select event_task as TaskID, name_event as TaskName, target_task as Target, community_event as Community, state_task as State,date_event as Date  from Task, Event where community_event = ? and Task.event_task=Event.id_event and Task.target_task=? and date_event between date_sub(now(),INTERVAL 1 WEEK) and now()";
            const tasks = await pool.query(query, [communityID, userID]);
            console.log(query);
            return tasks;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    //gets performance of targetID for past week
module.exports.getTargets1WeekOldTasks = async function(communityID, userID) {
        try {
            var query = "select event_task as TaskID, name_event as TaskName, target_task as Target, community_event as Community, state_task as State,date_event as Date  from Task, Event where community_event = ? and Task.event_task=Event.id_event and Task.target_task=? and date_event between date_sub(now(),INTERVAL 2 WEEK) and date_sub(now(),INTERVAL 1 WEEK)";
            const tasks = await pool.query(query, [communityID, userID]);
            console.log(query);
            return tasks;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    //gets performance of targetID for 2 weeks ago
module.exports.getTargets2WeeksOldTasks = async function(communityID, userID) {
        try {
            var query = "select event_task as TaskID, name_event as TaskName, target_task as Target, community_event as Community, state_task as State,date_event as Date  from Task, Event where community_event = ? and Task.event_task=Event.id_event and Task.target_task=? and date_event between date_sub(now(),INTERVAL 3 WEEK) and date_sub(now(),INTERVAL 2 WEEK)";
            const tasks = await pool.query(query, [communityID, userID]);
            console.log(query);
            return tasks;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    //gets performance of targetID for 3 weeks ago
module.exports.getTargets3WeeksOldTasks = async function(communityID, userID) {
    try {
        var query = "select event_task as TaskID, name_event as TaskName, target_task as Target, community_event as Community, state_task as State,date_event as Date  from Task, Event where community_event = ? and Task.event_task=Event.id_event and Task.target_task=? and date_event between date_sub(now(),INTERVAL 4 WEEK) and date_sub(now(),INTERVAL 3 WEEK)";
        const tasks = await pool.query(query, [communityID, userID]);
        console.log(query);
        return tasks;
    } catch (err) {
        console.log(err);
        return err;
    }
}

//gets all targets from community 1 ( only one community existing )
module.exports.getTargets = async function() {
    try {
        var query = "Select DISTINCT target_task, name_user from User, Task where id_user=target_task";
        const targets = await pool.query(query);
        console.log(query);
        return targets;
    } catch (err) {
        console.log(err);
        return err;
    }
}

// gets a prediction for a specific person and puts that prediction on the database
module.exports.updateTargetsPrediction = async function(userID, prediction) {
    try {
        var query = "UPDATE Target SET prediction = ? WHERE id_target = ? and id_community=1";
        const targets = await pool.query(query, [prediction, userID]);
        console.log(query);
        return targets;
    } catch (err) {
        console.log(err);
        return err;
    }
}