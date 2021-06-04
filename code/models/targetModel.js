var pool = require("./connection");

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