var loggedUser = 0;
window.onload = function() {
    startDashboard(1)
    filterstart();
    let block = ""
    block += "<div id='KPIselector'><label style= 'font-size:15;float:left'>Choose your KPI:   </label><select id='kpivalue' onchange='changeKPI()' style= 'float:left'><option value=1>Available Tasks</option><option value=2>Accepted Tasks %</option><option value=3>Cancelled Tasks %</option><option value=4>Completed Tasks %</option><option value=5>Times visited platform</option><option value=6>Seconds spent</option></select></div>"
    document.getElementById('kpiDropdown').innerHTML = block;
    document.getElementById('teste').innerHTML = "<input type='button' onclick='teste()' value='CLICK HERE'>  </input>";

}

function teste() {
    window.location = 'dataset.html';
}

function changeKPI() {
    var kpi = document.getElementById("kpivalue");
    var selectedKPi = kpi.options[kpi.selectedIndex].value;
    startDashboard(selectedKPi)
}
async function getCommunitysTargetObj(id) {
    try {
        var targets = await $.ajax({
            url: "/api/communities/" + id,
            method: "get",
            dataType: "json"
        });
        return targets;
    } catch (err) {
        console.log(err);
    }
}

async function getTargetsThisWeeksTasksObj(id) {
    try {
        var tasks = await $.ajax({
            url: "/api/targets/" + id + "/tasks/week/1",
            method: "get",
            dataType: "json"
        });
        return tasks;
    } catch (err) {
        console.log(err);
    }
}

async function getTargets1WeekOldTasksObj(id) {
    try {
        var tasks = await $.ajax({
            url: "/api/targets/" + id + "/tasks/week/2",
            method: "get",
            dataType: "json"
        });
        return tasks;
    } catch (err) {
        console.log(err);
    }
}

async function getTargets2WeeksOldTasksObj(id) {
    try {
        var tasks = await $.ajax({
            url: "/api/targets/" + id + "/tasks/week/3",
            method: "get",
            dataType: "json"
        });
        return tasks;
    } catch (err) {
        console.log(err);
    }
}
async function getTargets3WeeksOldTasksObj(id) {
    try {
        var tasks = await $.ajax({
            url: "/api/targets/" + id + "/tasks/week/4",
            method: "get",
            dataType: "json"
        });
        return tasks;
    } catch (err) {
        console.log(err);
    }
}

function linegraph(target, container, type) {
    let dataArray = []
    let yMax = 1.20
    if (type == 1) {
        dataArray[0] = target.W1tasks[0]
        dataArray[1] = target.W2tasks[0]
        dataArray[2] = target.W3tasks[0]
        dataArray[3] = target.W4tasks[0]
        yMax = target.W1tasks[0] + 1
    } else if (type == 2) {
        dataArray[0] = target.W1tasks[1]
        dataArray[1] = target.W2tasks[1]
        dataArray[2] = target.W3tasks[1]
        dataArray[3] = target.W4tasks[1]
    } else if (type == 3) {
        dataArray[0] = target.W1tasks[2]
        dataArray[1] = target.W2tasks[2]
        dataArray[2] = target.W3tasks[2]
        dataArray[3] = target.W4tasks[2]
    } else if (type == 4) {
        dataArray[0] = target.W1tasks[3]
        dataArray[1] = target.W2tasks[3]
        dataArray[2] = target.W3tasks[3]
        dataArray[3] = target.W4tasks[3]
    }
    color = random_rgba();
    const labels = ['3 weeks ago', '2 weeks ago', '1 week ago', 'this week'];
    const data = {
        labels: labels,
        datasets: [{
            label: target.name,
            backgroundColor: color,
            borderColor: color,
            data: dataArray,
        }]
    };
    const config = {
        type: 'line',
        data,
        options: {
            display: true,
            text: "teste",
            fontSize: 25,
            scales: {
                y: {
                    beginAtZero: true,
                    max: yMax
                }
            }
        }
    };
    var myChart = new Chart(
        document.getElementById(container),
        config
    );


}


function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

async function startDashboard(type) {
    let block = "";
    var targets = await getCommunitysTargetObj(1);

    for (let i = 0; i < targets.length; i++) {
        targets[i].W1tasks = await getTargetsThisWeeksTasksObj(targets[i].id_target)
        targets[i].W2tasks = await getTargets1WeekOldTasksObj(targets[i].id_target)
        targets[i].W3tasks = await getTargets2WeeksOldTasksObj(targets[i].id_target)
        targets[i].W4tasks = await getTargets3WeeksOldTasksObj(targets[i].id_target)
        if (targets[i].prediction == 1)
            block += "<span  class='filterDiv ccb' ><canvas  id='myChart" + i + "'></canvas></span>"
        if (targets[i].prediction == 2)
            block += "<span  class='filterDiv cca' ><canvas  id='myChart" + i + "'></canvas></span>"
        if (targets[i].prediction == 3)
            block += "<span class='filterDiv ncb'><canvas   id='myChart" + i + "'></canvas></span>"
        if (targets[i].prediction == 4)
            block += "<span class='filterDiv nca' ><canvas  id='myChart" + i + "'></canvas></span>"
    }
    console.log(JSON.stringify(targets[0].W2tasks));
    document.getElementById("dashboardContent").innerHTML = block;
    document.getElementById("dashboardContent").style.gridTemplateAreas = "'title . .' 'A B C'";
    for (let i = 0; i < targets.length; i++) {
        let evaluation = {
            id: targets[i].id,
            name: targets[i].name_user,
            W1tasks: calculateTasksKPIs(targets[i].W1tasks),
            W2tasks: calculateTasksKPIs(targets[i].W2tasks),
            W3tasks: calculateTasksKPIs(targets[i].W3tasks),
            W4tasks: calculateTasksKPIs(targets[i].W4tasks)
        }
        targets[i].evaluate = evaluation
            // console.log(JSON.stringify(targets[i].evaluate));
        linegraph(targets[i].evaluate, "myChart" + i, type);
    }
    filterSelection('all');
}


function calculateTasksKPIs(targetObj) {
    let availableTasks = targetObj.length
    let acceptedTasks = 0
    let cancelledTasks = 0
    let completedTasks = 0
    for (let i = 0; i < targetObj.length; i++) {
        if (targetObj[i].State == 2) {
            acceptedTasks++;

        } else if (targetObj[i].State == 3) {
            acceptedTasks++;
            cancelledTasks++;
        } else if (targetObj[i].State == 4) {
            acceptedTasks++;
            completedTasks++;
        }
    }
    let taskArray = [availableTasks, (acceptedTasks / availableTasks).toFixed(2), (cancelledTasks / acceptedTasks).toFixed(2), (completedTasks / (acceptedTasks - cancelledTasks)).toFixed(2)]
        //console.log(taskArray);
    return taskArray;
}



function filterSelection(c) {

    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function filterstart() {

    let block = "";
    block += "<button class=btn active onclick=filterSelection('all')> Show all</button>"
    block += "<button class=btn onclick=filterSelection('ccb')> Churn and Busy</button>"
    block += "<button class=btn onclick=filterSelection('cca')> Churn and Active</button>"
    block += "<button class=btn onclick=filterSelection('ncb')> No Churn and Busy</button>"
    block += "<button class=btn onclick=filterSelection('nca')> No churn and Active</button>"
    document.getElementById("myBtnContainer").innerHTML = block;

}