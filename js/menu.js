/* ==========================================
   PTIS DIGITAL FORM
   Mobile Sidebar Controller
========================================== */

const sidebar =
document.getElementById("sidebar");

const overlay =
document.getElementById("sidebarOverlay");

/* ================= OPEN ================= */

function openSidebar(){

    if(!sidebar) return;

    sidebar.classList.add("show");

    overlay?.classList.add("show");

    document.body.classList.add(
        "sidebar-open"
    );

}

/* ================= CLOSE ================= */

function closeSidebar(){

    if(!sidebar) return;

    sidebar.classList.remove("show");

    overlay?.classList.remove("show");

    document.body.classList.remove(
        "sidebar-open"
    );

}

/* ================= TOGGLE ================= */

function toggleSidebar(){

    if(!sidebar) return;

    if(
        sidebar.classList.contains("show")
    ){

        closeSidebar();

    }

    else{

        openSidebar();

    }

}

/* ================= CLICK OUTSIDE ================= */

overlay?.addEventListener(

    "click",

    closeSidebar

);

/* ================= DESKTOP ================= */

window.addEventListener(

    "resize",

    ()=>{

        if(window.innerWidth >= 1024){

            closeSidebar();

        }

    }

);