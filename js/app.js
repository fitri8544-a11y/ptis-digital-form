/* ==========================================
   PTIS DIGITAL FORM
   Main Application
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    updateClock();

    setInterval(updateClock,1000);

});

/* ================= LOAD LAYOUT ================= */

async function loadLayout(){

    await loadComponent(
        "topbar",
        "components/topbar.html"
    );

    await loadComponent(
        "sidebar",
        "components/sidebar.html"
    );

    await loadComponent(
        "footer",
        "components/footer.html"
    );

    /* ================= ADMIN MENU ================= */

    const adminMenu =
    document.getElementById("adminMenu");

    if(
        adminMenu &&
        window.currentUserRole === "admin"
    ){

        adminMenu.classList.remove("hidden");

    }

}