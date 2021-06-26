var loggedUser = 0;

window.onload = async function() {
    startDashboard()
}

async function startDashboard() {
    var targets = await getTargets();
    console.log(JSON.stringify(targets));
    let block = "";
    block += "<label>Choose a Target:</label><br>"
    block += "<select id='target'>"
    for (let i = 0; i < targets.length; i++) {
        block += "<option value=" + targets[i].target_task + ">" + targets[i].name_user + "</option>"
    }
    block += "</select><br>"
    block += "<label> Which community</label><br>"
    block += "<select id='communityID'>"
    block += "<option value=" + 1 + ">Fitness</option>"
    block += "</select><br>"
    block += "<label> Insert this weeks performance:  </label><br>"
    block += "<input type='text' id='weekPerformance'>  </input><br><br>"
    block += "<input type='button' value='predict' style='height:50px; width:150px' onclick=sendPredict() id='arrayValues'>  </input><br>"
    block += "<p id='predictionResult' style='color:red;' > test </p><br>"
    document.getElementById("predictionbox").innerHTML = block;
}

async function sendPredict() {
    const model = await tf.loadLayersModel('../javascripts/tfjsmodel/model.json');
    let obj = {
        target: document.getElementById("target").value,
        community: 1,
        values: document.getElementById("arrayValues").value
    }
    let availableTasks = 0
    let acceptedTasks = 0
    let cancelledTasks = 0
    let completedTasks = 0
    var tasks = await getPersonsTasksLastWeek(obj.target);

    for (let i = 0; i < tasks.length; i++) {
        availableTasks++
        if (tasks[i].State == 2 || tasks[i].State == 4 || tasks[i].State == 3) {
            acceptedTasks++
        }
        if (tasks[i].State == 3 || tasks[i].State == 1) {
            cancelledTasks++
        }
        if (tasks[i].State == 4) {
            completedTasks++
        }
    }
    console.log(availableTasks);
    console.log(acceptedTasks);
    console.log(cancelledTasks);
    console.log(completedTasks);
    let inputArray = [availableTasks, acceptedTasks, cancelledTasks, completedTasks, 3.38, 778, 2, 2, 0]
    console.log(inputArray)
    let inputArray2 = document.getElementById("weekPerformance").value // [12, 7, 4, 1, 1.61, 132, 6, 1, 0]
    inputArray2 = inputArray2.split(',')
    let inputArray3 = []
    for (let i = 0; i < inputArray.length; i++) {
        inputArray3.push(inputArray[i])
    }
    for (let i = 0; i < inputArray2.length; i++) {
        inputArray3.push(parseFloat(inputArray2[i]))
    }
    console.log(inputArray3)
        //CHURN E BUSY
        //[12,7,4,1,1.61,132,6,1,0,10,5,3,1,3.82,265,6,1,0]
        //churn active
        //[12,6,2,2,5.37,404,3,2,0,10,6,3,2,3.65,168,3,2,0]
        //no churn busy
        //[12,8,2,5,5.31,574,4,2,0,10,7,2,4,3.87,616,3,2,0]
        //no churn active
        //[12,12,3,8,3.38,778,2,2,0,10,10,1,7,4.94,773,2,2,0]
        //  let predictionData = [availableTasks, acceptedTasks, cancelledTasks, completedTasks, ]
    let predictionTensor = [
        inputArray3
    ]
    const predictionAux = model.predict(tf.tensor(predictionTensor))
    prediction = predictionAux.dataSync();
    aux = 0;
    result = 5;
    for (let i = 0; i < prediction.length; i++) {
        if (aux <= prediction[i]) {
            aux = prediction[i];
            result = i;
        }
    }
    if (result == 0) {
        document.getElementById("predictionResult").innerHTML = "This person has been predicted to have churn and probably had a busy week"
    } else if (result == 1) {
        document.getElementById("predictionResult").innerHTML = "This person has been predicted to have churn and probably had an active week"
    } else if (result == 2) {
        document.getElementById("predictionResult").innerHTML = "This person has been predicted not to have churn and probably had a busy week"
    } else if (result == 3) {
        document.getElementById("predictionResult").innerHTML = "This person has been predicted not to have churn and probably had an active  week"
    }
}

async function getPersonsTasksLastWeek(personID) {
    try {
        var tasks = await $.ajax({
            url: "/api/targets/" + personID + "/tasks/week/1",
            method: "get",
            dataType: "json"
        });
        return tasks;
    } catch (err) {
        console.log(err);
    }
}

async function getPersonsTasksLast2Weeks(personID) {
    try {
        var tasks = await $.ajax({
            url: "/api/targets/" + personID + "/tasks/week/2",
            method: "get",
            dataType: "json"
        });
        return tasks;
    } catch (err) {
        console.log(err);
    }
}

async function getTargets() {
    try {
        var targets = await $.ajax({
            url: "/api/targets/",
            method: "get",
            dataType: "json"
        });
        return targets;
    } catch (err) {
        console.log(err);
    }
}