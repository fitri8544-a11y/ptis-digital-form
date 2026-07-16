/* ==========================================
   PTIS DIGITAL FORM
   FORM ENGINE
========================================== */

/* ==========================================
   FORM STATE
========================================== */

const formState = {

    pemohon: {},

    permohonan: {},

    aset: [],

    pegawai: {}

};

/* ==========================================
   WIZARD
========================================== */

let currentStep = 1;

const totalStep = 5;

/* ==========================================
   UPDATE WIZARD
========================================== */

function updateWizard(){

    const stepLabel =
    document.getElementById("stepLabel");

    const progressBar =
    document.getElementById("progressBar");

    if(stepLabel){

        stepLabel.innerHTML =
        `Step ${currentStep} / ${totalStep}`;

    }

    if(progressBar){

        progressBar.style.width =
        `${(currentStep / totalStep) * 100}%`;

    }

    loadCurrentStep();

    setTimeout(()=>{

        restoreCurrentStep();

    },50);

}

/* ==========================================
   SAVE CURRENT STEP
========================================== */

function saveCurrentStep(){

    switch(currentStep){

        /* ================= STEP 1 ================= */

        case 1:

            formState.pemohon = {

                nama:
                document.getElementById("namaPemohon")?.value || "",

                jawatan:
                document.getElementById("jawatan")?.value || "",

                bahagian:
                document.getElementById("bahagian")?.value || "",

                telefon:
                document.getElementById("telefon")?.value || "",

                email:
                document.getElementById("email")?.value || ""

            };

        break;

        /* ================= STEP 2 ================= */

        case 2:

            formState.permohonan = {

                tujuan:
                document.getElementById("tujuan")?.value || "",

                tempat:
                document.getElementById("tempat")?.value || "",

                tarikhPinjam:
                document.getElementById("tarikhPinjam")?.value || "",

                tarikhPulang:
                document.getElementById("tarikhPulang")?.value || ""

            };

        break;

        /* ================= STEP 3 ================= */

        case 3:

            if(typeof getAssetList === "function"){

                formState.aset =
                getAssetList();

            }

        break;

        /* ================= STEP 4 ================= */

        case 4:

            formState.pegawai = {

                namaPengeluar:
                document.getElementById("namaPengeluar")?.value || "",

                jawatanPengeluar:
                document.getElementById("jawatanPengeluar")?.value || "",

                namaPelulus:
                document.getElementById("namaPelulus")?.value || "",

                jawatanPelulus:
                document.getElementById("jawatanPelulus")?.value || ""

            };

        break;

    }

}

/* ==========================================
   RESTORE STEP
========================================== */

function restoreCurrentStep(){

    switch(currentStep){

        /* ================= STEP 1 ================= */

        case 1:

            if(document.getElementById("namaPemohon"))
                document.getElementById("namaPemohon").value =
                formState.pemohon.nama || "";

            if(document.getElementById("jawatan"))
                document.getElementById("jawatan").value =
                formState.pemohon.jawatan || "";

            if(document.getElementById("bahagian"))
                document.getElementById("bahagian").value =
                formState.pemohon.bahagian || "";

            if(document.getElementById("telefon"))
                document.getElementById("telefon").value =
                formState.pemohon.telefon || "";

            if(document.getElementById("email"))
                document.getElementById("email").value =
                formState.pemohon.email || "";

        break;

        /* ================= STEP 2 ================= */

        case 2:

            if(document.getElementById("tujuan"))
                document.getElementById("tujuan").value =
                formState.permohonan.tujuan || "";

            if(document.getElementById("tempat"))
                document.getElementById("tempat").value =
                formState.permohonan.tempat || "";

            if(document.getElementById("tarikhPinjam"))
                document.getElementById("tarikhPinjam").value =
                formState.permohonan.tarikhPinjam || "";

            if(document.getElementById("tarikhPulang"))
                document.getElementById("tarikhPulang").value =
                formState.permohonan.tarikhPulang || "";

        break;

        /* STEP 3 akan kita restore selepas Firestore siap */

        /* ================= STEP 4 ================= */

        case 4:

            if(document.getElementById("namaPengeluar"))
                document.getElementById("namaPengeluar").value =
                formState.pegawai.namaPengeluar || "";

            if(document.getElementById("jawatanPengeluar"))
                document.getElementById("jawatanPengeluar").value =
                formState.pegawai.jawatanPengeluar || "";

            if(document.getElementById("namaPelulus"))
                document.getElementById("namaPelulus").value =
                formState.pegawai.namaPelulus || "";

            if(document.getElementById("jawatanPelulus"))
                document.getElementById("jawatanPelulus").value =
                formState.pegawai.jawatanPelulus || "";

        break;

    }

}

/* ==========================================
   NEXT STEP
========================================== */

function nextStep(){

    saveCurrentStep();

    if(currentStep < totalStep){

        currentStep++;

        updateWizard();

    }

}

/* ==========================================
   PREVIOUS STEP
========================================== */

function previousStep(){

    saveCurrentStep();

    if(currentStep > 1){

        currentStep--;

        updateWizard();

    }

}

/* ==========================================
   BUTTON EVENT
========================================== */

document.addEventListener("click",async e=>{

    if(e.target.id==="nextBtn"){

        nextStep();

    }

    if(e.target.id==="prevBtn"){

        previousStep();

    }

    if(e.target.id==="saveBtn"){

        await saveForm();

    }

});