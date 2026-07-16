/* ==========================================
   PTIS DIGITAL FORM
   KEW.PA-9 Wizard Engine V1
========================================== */

let currentStep = 1;

const totalSteps = 4;

function initWizard(){

    showStep(1);

}

function showStep(step){

    currentStep = step;

    for(let i=1;i<=totalSteps;i++){

        const section = document.getElementById("step"+i);

        if(section){

            section.classList.add("hidden");

        }

    }

    const active = document.getElementById("step"+step);

    if(active){

        active.classList.remove("hidden");

    }

    updateProgress();

    updateStepIndicator();

    updateButtons();

    if(step===4){

        loadReview();

    }

}

function nextStep(){

    if(currentStep >= totalSteps) return;

    showStep(currentStep + 1);

}

function previousStep(){

    if(currentStep <= 1) return;

    showStep(currentStep - 1);

}

function updateProgress(){

    const progressFill =
    document.getElementById("progressFill");

    if(progressFill){

        progressFill.style.width =
        ((currentStep / totalSteps) * 100) + "%";

    }

}

function updateButtons(){

    const prev =
    document.getElementById("btnPrevious");

    const next =
    document.getElementById("btnNext");

    const submit =
    document.getElementById("btnSubmit");

    if(prev){

        prev.style.display =
        currentStep===1 ? "none" : "inline-flex";

    }

    if(next){

        next.style.display =
        currentStep===4 ? "none" : "inline-flex";

    }

    if(submit){

        submit.style.display =
        currentStep===4 ? "inline-flex" : "none";

    }

}

function updateStepIndicator(){

    document
    .querySelectorAll(".wizard-step")
    .forEach((step,index)=>{

        step.classList.remove("active");

        if(index + 1 <= currentStep){

            step.classList.add("active");

        }

    });

}

function loadReview(){

    setValue("reviewNama","namaPemohon");

    setValue("reviewSekolah","sekolah");

    setValue("reviewTarikh","tarikhPinjaman");

    setValue("reviewAset","jenisAset");

}

function setValue(review,input){

    const reviewEl =
    document.getElementById(review);

    const inputEl =
    document.getElementById(input);

    if(reviewEl && inputEl){

        reviewEl.innerHTML =
        inputEl.value || "-";

    }

}

function saveDraft(){

    alert("Fungsi Simpan Draft akan disambungkan ke Firebase.");

}

function submitForm(){

    const agree =
    document.getElementById("agreeDeclaration");

    if(!agree.checked){

        alert("Sila tandakan pengesahan sebelum menghantar.");

        return;

    }

    alert("Permohonan berjaya dihantar.");

}

document.addEventListener("DOMContentLoaded",()=>{

    initWizard();

});