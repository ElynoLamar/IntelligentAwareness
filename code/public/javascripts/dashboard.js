window.onload = function() {

}

function openTasks() {
    let block = "";
    block += "<form class='form-container'>";
    block += "<div class='form-content'>";
    block += "<span class='close' onclick='closeMiddleBox()'>&times;</span>";
    block += "<h1>Tasks for you</h1>";

    block += "<br><br><p> Task nº1 </p>";
    block += "<p> Task nº2 </p>";
    block += "<p> Task nº3 </p>";
    block += "<p> Task nº4 </p>";
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