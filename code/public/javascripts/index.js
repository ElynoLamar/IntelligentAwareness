//ignore this page, not used
//
// ignore this page, not used
//
// ignore this page, not used
//
// ignore this page, not used
//
// ignore this page, not used
//
// ignore this page, not used
//
// ignore this page, not used
//
// ignore this page, not used
//
// ignore this page, not used
//
// ignore this page, not used
//
// ignore this page, not used
//

var loggedUser = 0;
window.onload = function() {


}

function login() {
    alert("[PROVISÓRIO] you're now logged in");
    loggedUser = 1;
    if (loggedUser != 0) {
        let block = "<p onclick=openDashboard()>Dashboard | Logout<p>";
        document.getElementById('userMenu').innerHTML = block;
        //  document.getElementById('userMenu').onclick = openDashboard();
    }
}

function openDashboard() {
    alert("DASHBOARD opened")
    window.location = "links/dashboard.html";
}