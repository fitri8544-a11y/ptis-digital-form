/* ==========================================
   PTIS DIGITAL FORM
   Navigation System
========================================== */

/* ================= SIDEBAR ================= */

function initNavigation(){

    document.querySelectorAll(".menu-item").forEach(button=>{

        button.onclick = async ()=>{

            const page = button.dataset.page;

            // ================= LOGOUT =================

            if(page === "logout"){

                await logout();

                return;

            }

            // ================= ACTIVE MENU =================

            document.querySelectorAll(".menu-item").forEach(item=>{

                item.classList.remove("active");

            });

            button.classList.add("active");

            // ================= LOAD PAGE =================

            await loadPage(page);

            if(window.innerWidth < 1024){

                closeSidebar();

            }

        };

    });

}

/* ================= LOAD COMPONENT ================= */

async function loadComponent(id,file){

    try{

        const response = await fetch(file);

        if(!response.ok){

            throw new Error(file);

        }

        const html = await response.text();

        const element = document.getElementById(id);

        if(!element) return;

        element.innerHTML = html;

        if(id==="sidebar"){

            initNavigation();

        }

    }

    catch(error){

        console.error("Component Error :",error);

    }

}

/* ================= LOAD PAGE ================= */

async function loadPage(page){

    try{

        const response =
        await fetch(`pages/${page}.html`);

        if(!response.ok){

            throw new Error(page);

        }

        const html =
        await response.text();

        const content =
        document.getElementById("content");

        if(!content) return;

        content.innerHTML = html;

        // ================= LOGIN =================

        if(page==="login"){

            document
            .getElementById("googleLoginBtn")
            ?.addEventListener(
                "click",
                googleLogin
            );

        }

        // ================= DASHBOARD =================

        if(page==="dashboard"){

            if(typeof loadDashboard==="function"){

                loadDashboard();

            }

        }

        // ================= DIGITAL FORM =================

        if(page==="digital-forms"){

            if(typeof loadForms==="function"){

                loadForms();

            }

        }

        /* ================= DOWNLOAD CENTER ================= */

        if(page==="downloads"){

            if(typeof loadDownloads==="function"){

                loadDownloads();

            }

        }

        // ================= USER =================

        if(page==="user"){

            if(typeof loadUserPage==="function"){

                loadUserPage();

            }

        }

        /* ================= RECORDS ================= */

        if(page==="records"){

            if(typeof loadMyRecords==="function"){

                loadMyRecords();

            }

        }

        /* ================= ADMIN DASHBOARD ================= */

        if(page==="admin-dashboard"){

            if(typeof loadAdminDashboard==="function"){

                setTimeout(()=>{

                    loadAdminDashboard();

                },100);

            }

        }

        /* ================= ADMIN USERS ================= */

        if(page==="admin-users"){

            if(typeof loadAdminUsers==="function"){

                loadAdminUsers();

            }

        }

        /* ================= ADMIN RECORDS ================= */

        if(page==="admin-records"){

            if(typeof loadAdminRecords==="function"){

                loadAdminRecords();

            }

        }

        /* ================= ADMIN ANALYTICS ================= */

        if(page==="admin-analytics"){

            if(typeof loadAdminAnalytics==="function"){

                loadAdminAnalytics();

            }

        }

        // ================= REPORT =================

        if(page==="reports"){

            if(typeof loadReports==="function"){

                loadReports();

            }

        }

        // ================= SETTINGS =================

        if(page==="settings"){

            if(typeof loadSettings==="function"){

                loadSettings();

            }

        }

    }

    catch(error){

        console.error("Load Page Error :",error);

    }

}

/* ================= LOAD FORM ================= */

async function loadForm(form){

    try{

        const response =
        await fetch(`forms/${form}.html`);

        if(!response.ok){

            throw new Error(
                `Gagal memuatkan forms/${form}.html`
            );

        }

        const html =
        await response.text();

        const content =
        document.getElementById("content");

        if(!content){

            throw new Error(
                'Elemen id="content" tidak dijumpai.'
            );

        }

        content.innerHTML = html;

        // ================= KEW.PA-9 =================

        if(form === "kewpa9"){

            currentStep = 1;

            updateWizard();

            // Jika buka dari Rekod Saya,
            // isi semula data Firestore

            if(window.currentRecord){

                setTimeout(()=>{

                    if(
                        typeof populateForm ===
                        "function"
                    ){

                        populateForm();

                    }

                },200);

            }

        }

        // ================= KEW.PA-19 =================

        if(form === "kewpa19"){

            if(
                typeof initKewpa19Wizard ===
                "function"
            ){

                initKewpa19Wizard();

            }

        }

        // ================= KEW.PA-19 PRINT =================

        if(form === "kewpa19-print"){

            setTimeout(()=>{

                if(
                    typeof populateKewpa19Print ===
                    "function"
                ){

                    populateKewpa19Print();

                }

            },200);

        }

        // ================= KEW.PA-3 =================

        if(form === "kewpa3"){

                if(
                    typeof initKewpa3Wizard ===
                    "function"
                ){

                    initKewpa3Wizard();

                }

        }

    }

    catch(error){

        console.error(
            "Ralat loadForm:",
            error
        );

        alert(
            "Halaman borang gagal dimuatkan."
        );

    }

}

/* ================= LOAD KNOWLEDGE MODULE ================= */

async function loadKnowledge(module){

    try{

        const response =
        await fetch(`knowledge/${module}.html`);

        if(!response.ok){

            throw new Error(
                `Gagal memuatkan knowledge/${module}.html`
            );

        }

        const html =
        await response.text();

        const content =
        document.getElementById("content");

        if(!content){

            throw new Error(
                'Elemen id="content" tidak dijumpai.'
            );

        }

        content.innerHTML = html;

        // ================= EXECUTE SCRIPT =================

        const scripts =
        content.querySelectorAll("script");

        scripts.forEach(oldScript=>{

            const newScript =
            document.createElement("script");

            if(oldScript.src){

                newScript.src =
                oldScript.src;

            }else{

                newScript.textContent =
                oldScript.textContent;

            }

            document.body.appendChild(
                newScript
            );

            document.body.removeChild(
                newScript
            );

        });

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

    catch(error){

        console.error(
            "Load Knowledge Error:",
            error
        );

        alert(
            "Modul panduan gagal dimuatkan."
        );

    }

}