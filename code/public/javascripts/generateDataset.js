window.onload = function() {
    generate();

}

function generate() {
    var contador = 1;
    var numOfEachProfile = 2;
    var meanAvailableTaskTW = 14
    var varAvailableTaskTW = 8


    var availableTaskPW = Math.floor(Math.random() * (meanAvailableTaskTW - varAvailableTaskTW)) + varAvailableTaskTW; // 8 a 13 tasks
    alert(availableTaskPW)
    var availableTaskTW = Math.floor(Math.random() * (meanAvailableTaskTW - varAvailableTaskTW)) + varAvailableTaskTW; // 8 a 13 tasks
    let block = "";
    block += "<table>";
    block += "<tr>";
    // block += " <th>ID</th>"; // ID
    //Prev WEEK
    block += "<th>PW-Available-Tasks</th><th>PW-Accepted-Tasks</th><th>PW-Canceled-Tasks</th><th>PW-Concluded-Tasks</th><th>PW-Times-Acessed-Platform</th><th>PW-Time-spent-online</th><th>PW-avg-days-conclude-Task</th><th>leader-previous-week</th><th>PW-leader-task-Concluded</th>";
    //THIS WEEK
    block += "<th>TW-Available-Tasks</th><th>TW-Accepted-Tasks</th><th>TW-Canceled-Task</th><th>TW-Concluded-Task</th><th>TW-Times-Acessed-Platform</th><th>TW-Time-spent-online</th><th>TW-avg-days-to-conclude-Task</th><th>TW-leader-previous-week</th><th>TW-leader-task-Concluded</th><th>Profile</th></tr>";
    //perfil 1, Com churn e ocupado
    let acceptedtaskThisweek = 0.51;
    let canceledtaskThisweek = 0.60;
    let concludedTaskThisweek = 0.60;
    let timesAccessedPlatform = 2.4;
    let timeSpentOnThePlatform = 30; //segundos
    let avgDaysToConcludeTask = 5;
    for (let i = 1; i < numOfEachProfile + 1; i++) {
        block += "<tr>";
        // block += "<td>" + contador++ + ",</td>";

        block += populateTable(availableTaskPW, acceptedtaskThisweek, canceledtaskThisweek, concludedTaskThisweek, timesAccessedPlatform, timeSpentOnThePlatform, avgDaysToConcludeTask)
        block += populateTable(availableTaskTW, acceptedtaskThisweek, canceledtaskThisweek, concludedTaskThisweek, timesAccessedPlatform, timeSpentOnThePlatform, avgDaysToConcludeTask)
        block += "<td>" + 1 + "</td>"; //Churn-and-Busy
        block += "</tr>";
    }
    //block += "<tr><td></td></tr>"
    //perfil 2 Com churn e não-ocupado
    acceptedtaskThisweek = 0.57;
    canceledtaskThisweek = 0.33;
    concludedTaskThisweek = 0.72;
    timesAccessedPlatform = 3.2;
    timeSpentOnThePlatform = 60; //segundos
    avgDaysToConcludeTask = 3;
    for (let i = 1; i < numOfEachProfile + 1; i++) {
        block += "<tr>";
        // block += "<td>" + contador++ + ",</td>";

        block += populateTable(availableTaskPW, acceptedtaskThisweek, canceledtaskThisweek, concludedTaskThisweek, timesAccessedPlatform, timeSpentOnThePlatform, avgDaysToConcludeTask)
        block += populateTable(availableTaskTW, acceptedtaskThisweek, canceledtaskThisweek, concludedTaskThisweek, timesAccessedPlatform, timeSpentOnThePlatform, avgDaysToConcludeTask)
        block += "<td>" + 2 + "</td>"; //Churn-and-not-Busy
        block += "</tr>";
    }
    //block += "<tr><td></td></tr>"
    //perfil 3 Sem churn mas ocupado
    acceptedtaskThisweek = 0.75;
    canceledtaskThisweek = 0.2;
    concludedTaskThisweek = 0.90;
    timesAccessedPlatform = 3.9;
    timeSpentOnThePlatform = 130; //segundos
    avgDaysToConcludeTask = 2.5;
    for (let i = 1; i < numOfEachProfile + 1; i++) {
        block += "<tr>";
        //  block += "<td>" + contador++ + ",</td>";

        block += populateTable(availableTaskPW, acceptedtaskThisweek, canceledtaskThisweek, concludedTaskThisweek, timesAccessedPlatform, timeSpentOnThePlatform, avgDaysToConcludeTask)
        block += populateTable(availableTaskTW, acceptedtaskThisweek, canceledtaskThisweek, concludedTaskThisweek, timesAccessedPlatform, timeSpentOnThePlatform, avgDaysToConcludeTask)
        block += "<td>" + 3 + "</td>"; //"No-churn-and-Busy"
        block += "</tr>";
    }
    //block += "<tr><td></td></tr>"
    //perfil 4 Sem churn e não ocupado
    acceptedtaskThisweek = 0.95;
    canceledtaskThisweek = 0.08;
    concludedTaskThisweek = 0.90;
    timesAccessedPlatform = 4.5;
    timeSpentOnThePlatform = 160; //segundos
    avgDaysToConcludeTask = 1.5;
    for (let i = 1; i < numOfEachProfile + 1; i++) {
        block += "<tr>";
        // block += "<td>" + contador++ + ",</td>";
        block += populateTable(availableTaskPW, acceptedtaskThisweek, canceledtaskThisweek, concludedTaskThisweek, timesAccessedPlatform, timeSpentOnThePlatform, avgDaysToConcludeTask)
        block += populateTable(availableTaskTW, acceptedtaskThisweek, canceledtaskThisweek, concludedTaskThisweek, timesAccessedPlatform, timeSpentOnThePlatform, avgDaysToConcludeTask)
        block += "<td>" + 4 + "</td>"; //"No-churn-and-not-busy"
        block += "</tr>";
    }
    block += "</table>";
    block += "</div>";
    document.getElementById('dataset').innerHTML = block;

}

function populateTable(availableTask, acceptedtask, canceledtask, concludedTask, timesAccessedPlatform, timeSpentOnThePlatform, avgDaysToConcludeTask) {
    let block = "";
    block += "<td>" + availableTask + ",</td>";
    let thisacceptedtaskPerc = getRandomIntInclusive(acceptedtask - 0.10, acceptedtask + 0.10);
    let thisacceptedtask = Math.round(thisacceptedtaskPerc * availableTask)
    if (thisacceptedtask > availableTask) block += "<td>" + availableTask + ",</td>"; // prob de aceitar a task
    else block += "<td>" + thisacceptedtask + ",</td>"; // prob de aceitar a task

    let thiscanceledtaskPerc = getRandomIntInclusive(canceledtask - 0.10, canceledtask + 0.10);
    let thiscanceledtask = Math.ceil(thisacceptedtask * thiscanceledtaskPerc)
    block += "<td>" + thiscanceledtask + ",</td>"; // prob de cancelar a task

    let thisconcludedTaskPerc = getRandomIntInclusive(concludedTask - 0.10, concludedTask + 0.10);
    let thisconcludedTask = Math.floor((thisacceptedtask - thiscanceledtask) * thisconcludedTaskPerc);
    block += "<td>" + thisconcludedTask + ",</td>"; // prob de concluir a task

    let thisTimesAccessed = getRandomIntInclusive(timesAccessedPlatform - 2, timesAccessedPlatform + 3);
    block += "<td>" + thisTimesAccessed + ",</td>"; // Times accessed platform
    block += "<td>" + getRandomIntInclusiveCeil(timeSpentOnThePlatform * timesAccessedPlatform - 30, timeSpentOnThePlatform * timesAccessedPlatform + 300) + ",</td>"; // time spent per access on avg
    block += "<td>" + getRandomIntInclusiveCeil(avgDaysToConcludeTask - 1, avgDaysToConcludeTask + 1) + ",</td>"; // avg day to conclude a task

    let isLeader = checkLeader(availableTask, thisacceptedtask, thiscanceledtask, thisconcludedTask);
    block += "<td>" + isLeader + ",</td>"; // was previous leader?
    block += "<td>" + leaderTaskConcluded(thisconcludedTask, isLeader) + ",</td>"; // prob of doing leader task
    return block;
}

function getRandomIntInclusive(min, max) {
    console.log(min);
    console.log(max);
    return (Math.random() * (max - min) + min).toFixed(2);
}


function getRandomIntInclusiveCeil(min, max) {
    return Math.ceil(Math.random() * (max - min) + min); //The maximum is inclusive and the minimum is inclusive
}


function checkLeader(total, accepted, canceled, completed) {
    let answer = 0;
    let x = (accepted - canceled) / total
    let y = completed / accepted
    if (x > 0.55) { // if the accepted tasks are higher than 55%
        if (y > 0.70) { // if the completed chance is higher than 70%
            answer = 3; // leader
        } else {
            answer = 2; //normal
        }
    } else if (y < 0.25) {
        answer = 1; // anchor
    } else {
        answer = 2; //normal
    }
    return answer;
}

function leaderTaskConcluded(concludedChance, lead) {
    let x = getRandomIntInclusive(concludedChance - 0.10, concludedChance + 0.10);
    if (lead == "Leader") {
        if (x >= concludedChance) {
            return 1; // yes
        } else return 0; //no
    } else return 0; //no
}