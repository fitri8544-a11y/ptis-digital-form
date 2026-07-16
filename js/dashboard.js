async function loadDashboard(){

    const response=
    await fetch("data/dashboard.json");

    const data=
    await response.json();

    document.getElementById("dashboardUser").innerHTML=
    data.user.name;

    document.getElementById("userName").innerHTML=
    data.user.name;

    document.getElementById("userRole").innerHTML=
    data.user.role;

}