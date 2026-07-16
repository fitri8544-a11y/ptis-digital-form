/* ==========================================
   PTIS DIGITAL FORM
   Forms Center
========================================== */

let allForms = [];

/* ================= LOAD FORMS ================= */

async function loadForms(){

    try{

        const response =
        await fetch("data/forms.json");

        allForms =
        await response.json();

        renderForms(allForms);

    }

    catch(error){

        console.error(error);

    }

}

/* ================= RENDER ================= */

function renderForms(forms){

    const container =
    document.getElementById("formGrid");

    if(!container) return;

    container.innerHTML = "";

    forms.forEach(form=>{

        const badge =
        form.status==="Aktif"
        ?`
        <span
        class="
        px-3
        py-1
        rounded-full
        bg-green-500/20
        text-green-400
        text-xs
        font-bold">

        ● AKTIF

        </span>
        `
        :
        `
        <span
        class="
        px-3
        py-1
        rounded-full
        bg-yellow-500/20
        text-yellow-300
        text-xs
        font-bold">

        Akan Datang

        </span>
        `;

        const button =
        form.status==="Aktif"

        ?

        `
        <button
        class="
        mt-8
        w-full
        rounded-2xl
        bg-cyan-500
        hover:bg-cyan-600
        py-3
        font-bold">

        Buka Borang →

        </button>
        `

        :

        `
        <button
        class="
        mt-8
        w-full
        rounded-2xl
        bg-slate-700
        cursor-not-allowed
        py-3
        font-bold">

        Akan Datang

        </button>
        `;

        container.innerHTML += `

<div

class="
form-card
hover:scale-[1.02]
transition
duration-300"

onclick="openForm('${form.page}','${form.status}')">

    <div
    class="flex
    justify-between
    items-start">

        <div
        class="text-6xl">

            ${form.icon}

        </div>

        ${badge}

    </div>

    <div class="mt-6">

        <div
        class="text-cyan-400
        font-bold
        tracking-wider">

            ${form.code}

        </div>

        <h2
        class="
        text-2xl
        font-black
        mt-3">

            ${form.title}

        </h2>

        <p
        class="
        mt-3
        text-slate-400">

            ${form.category}

        </p>

        ${button}

    </div>

</div>

`;

    });

}

/* ================= SEARCH ================= */

function searchForms(keyword){

    keyword =
    keyword.toLowerCase();

    const result =
    allForms.filter(form=>

        form.title
        .toLowerCase()
        .includes(keyword)

        ||

        form.code
        .toLowerCase()
        .includes(keyword)

        ||

        form.category
        .toLowerCase()
        .includes(keyword)

    );

    renderForms(result);

}

/* ================= FILTER ================= */

function filterCategory(category){

    if(category==="Semua"){

        renderForms(allForms);

        return;

    }

    const result =
    allForms.filter(form=>

        form.category===category

    );

    renderForms(result);

}

/* ================= OPEN ================= */

function openForm(page,status){

    if(status!=="Aktif"){

        alert("Borang ini masih dalam pembangunan.");

        return;

    }

    loadPage(page);

}