var loggedUser = 0;
window.onload = async function() {
    model = await tf.loadModel('../ML/v2/tfjsmodel/model.json');
    startDashboard()
}

function startDashboard() {
    let block = "";
    block += "<br><label> Which person</label><br>"
    block += "<input type='text' value='10' id='targetID'> </input><br>"
    block += "<label> Which community</label><br>"
    block += "<input type='text' value='1' id='communityID'> </input><br>"
    block += "<label> Insert this weeks performance:  </label><br>"
    block += "<input type='text'>  </input><br><br>"
    block += "<input type='button' value='predict' style='height:50px; width:150px' onclick=sendPredict() id='arrayValues'>  </input><br>"
    block += "<p id='predictionResult' style='color:red;' > test </p><br>"
    document.getElementById("predictionbox").innerHTML = block;
}

async function sendPredict() {
    let obj = {
        target: document.getElementById("targetID").value,
        community: document.getElementById("communityID").value,
        values: document.getElementById("arrayValues").value
    }
    let availableTasks = 0
    let acceptedTasks = 0
    let cancelledTasks = 0
    let completedTasks = 0

    var tasks = await getPersonsTasksLastWeek(obj.target);
    console.log(tasks[0].State)
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
    //  let predictionData = [availableTasks, acceptedTasks, cancelledTasks, completedTasks, ]
    let predictionData = [
        [11, 5, 4, 0, 1.75, 183, 6, 1, 0, 11, 6, 4, 1, 0.53, 51, 5, 1, 0]
    ]
    const prediction = model.predict(predictionData)
    alert(prediction)

}

async function getPersonsTasksLastWeek(personID) {
    try {
        var tasks = await $.ajax({
            url: "/api/targets/" + personID + "/tasks/week/4",
            method: "get",
            dataType: "json"
        });
        return tasks;
    } catch (err) {
        console.log(err);
    }
}