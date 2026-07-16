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

    const response =
    await fetch(`forms/${form}.html`);

    const html =
    await response.text();

    document.getElementById("content").innerHTML = html;

    // ================= KEW.PA-9 =================

    if(form === "kewpa9"){

        currentStep = 1;

        updateWizard();

        // Jika buka dari Rekod Saya,
        // isi semula data Firestore

        if(window.currentRecord){

            setTimeout(()=>{

                if(typeof populateForm==="function"){

                    populateForm();

                }

            },200);

        }

    }

}