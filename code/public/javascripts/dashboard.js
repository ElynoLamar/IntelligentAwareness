var loggedUser = 0;
window.onload = function() {
    startDashboard()
    document.getElementById('teste').innerHTML = "<input type='button' onclick='teste()' value='CLICK HERE'>  </input>";
}

function teste() {
    window.location = 'dataset.html';
}

function startDashboard() {
    let block = "";
    block += "<span id='A'>Tasks <img onclick=openTasks() class='buttonsContent' src='../images/task.png' ></span>"
    block += "<span id='B'>Notifications<img onclick=openNotifs() class='buttonsContent' id='imagemessages' src='../images/messages.png' ></span>"
    block += "<span id='C'>Progress <img onclick=openProgresses() class='buttonsContent'  id='imageprogress' src='../images/progress.png' ></span>"
    document.getElementById("dashboardContent").innerHTML = block;
    document.getElementById("dashboardContent").style.gridTemplateAreas = "'title . .' 'A B C'";
}

function openTasks() {
    let block = "";
    block += "<form class='form-container'>";
    block += "<div class='form-content'>";
    block += "<span class='close' onclick='closeMiddleBox()'>&times;</span>";
    block += "<h1>Notifications for you</h1>";
    block += "<br><br>";
    block += "<table>";
    block += "<tr>";
    block += "<th>Task name</th><th>Community</th><th>Action</th>";
    block += "</tr>";
    block += " <tr>";
    block += "<td>Peter</td><td>Griffin</td> <td>$100</td>";
    block += " </tr>";
    block += "<tr>";
    block += "<td>Lois</td><td>Griffin</td><td>$150</td>";
    block += "</tr>";
    block += "<tr>";
    block += "<td>Joe</td> <td>Swanson</td> <td>$300</td>";
    block += "</tr>"
    block += "<tr>";
    block += "<td>Cleveland</td><td>Brown</td><td>$250</td>";
    block += "</tr></table>";
    block += "<br> <span id='closeButton'>Close</span>";

    block += "</form>";
    block += "</div>";
    document.getElementById("MiddleBox").innerHTML = block;


}

function closeMiddleBox() {
    document.getElementById("MiddleBox").innerHTML = "";
}

function openNotifs() {
    let block = "";
    block += "<form class='form-container'>";
    block += "<div class='form-content'>";
    block += "<span class='close' onclick='closeMiddleBox()'>&times;</span>";
    block += "<h1>Notifications for you</h1>";
    block += "<br><br>";
    block += "<table>";
    block += "<tr>";
    block += "<th>Task name</th><th>Community</th><th>Action</th>";
    block += "</tr>";
    block += " <tr>";
    block += "<td>Peter</td><td>Griffin</td> <td>$100</td>";
    block += " </tr>";
    block += "<tr>";
    block += "<td>Lois</td><td>Griffin</td><td>$150</td>";
    block += "</tr>";
    block += "<tr>";
    block += "<td>Joe</td> <td>Swanson</td> <td>$300</td>";
    block += "</tr>"
    block += "<tr>";
    block += "<td>Cleveland</td><td>Brown</td><td>$250</td>";
    block += "</tr></table>";

    block += "</form>";
    block += "</div>";
    document.getElementById("MiddleBox").innerHTML = block;

}

function openProgresses() {
    let block = "";
    block += "<div id='myBtnContainer'>"
    block += "<button class='btn active' onclick=filterSelection('all')> Show all</button>"
    block += "<button class='btn' onclick=filterSelection('cars')> Churn and inactive</button>"
    block += "<button class='btn' onclick=filterSelection('animals')> Churn but active</button>"
    block += "<button class='btn' onclick=filterSelection('fruits')> No churn but inactive</button>"
    block += "<button class='btn' onclick=filterSelection('colors')> No churn and active</button>"
    block += "</div>"

    block += "<div class='container'>"
    block += "<div class='filterDiv cars'>BMW</div>"
    block += "<div class='filterDiv colors fruits'>Orange</div>"
    block += "<div class='filterDiv cars'>Volvo</div>"
    block += "<div class='filterDiv colors'>Red</div>"
    block += "<div class='filterDiv cars animals'>Mustang</div>"
    block += "<div class='filterDiv colors'>Blue</div>"
    block += "<div class='filterDiv animals'>Cat</div>"
    block += "<div class='filterDiv animals'>Dog</div>"
    block += "<div class='filterDiv fruits'>Melon</div>"
    block += "<div class='filterDiv fruits animals'>Kiwi</div>"
    block += "<div class='filterDiv fruits'>Banana</div>"
    block += "<div class='filterDiv fruits'>Lemon</div>"
    block += "<div class='filterDiv animals'>Cow</div>"
    block += "</div>"
    block += "<div onclick=startDashboard() id='backpage'><img id='backpageimg' src=../images/Backpage.png></div>"
    document.getElementById("dashboardContent").innerHTML = block;
    var btnContainer = document.getElementById("myBtnContainer");
    var btns = btnContainer.getElementsByClassName("btn");
    // Add active class to the current button (highlight it

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
    document.getElementById("dashboardContent").style.gridTemplateAreas = "unset";
    filterSelection("all")
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