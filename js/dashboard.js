async function loadDashboard(){

    try{

        const response =
        await fetch("data/dashboard.json");

        if(!response.ok){

            throw new Error(
                `Gagal memuatkan dashboard.json: ${response.status}`
            );

        }

        const data =
        await response.json();

        const dashboardUser =
        document.getElementById("dashboardUser");

        const userName =
        document.getElementById("userName");

        const userRole =
        document.getElementById("userRole");

        if(dashboardUser){

            dashboardUser.textContent =
            data.user?.name || "Pengguna";

        }

        if(userName){

            userName.textContent =
            data.user?.name || "Pengguna";

        }

        if(userRole){

            userRole.textContent =
            data.user?.role || "User";

        }

    }catch(error){

        console.error(
            "Ralat loadDashboard:",
            error
        );

    }

}