/* ==========================================
   PTIS DIGITAL FORM
   FIRESTORE
========================================== */

/* ================= GENERATE FORM NUMBER ================= */

async function generateFormNumber(){

    const snapshot =
    await db.collection("forms").get();

    const runningNo =
    snapshot.size + 1;

    return `KEWPA9-${String(runningNo).padStart(5,"0")}`;

}

/* ================= SAVE FORM ================= */

async function saveForm(){

    try{

        // Simpan step terakhir dahulu

        saveCurrentStep();

        // ================= EDIT MODE =================

        if(window.editMode){

            formState.updatedAt =
            firebase.firestore.FieldValue.serverTimestamp();

            await db
            .collection("forms")
            .doc(window.currentRecordId)
            .update({

                pemohon: formState.pemohon,

                permohonan: formState.permohonan,

                aset: formState.aset,

                pegawai: formState.pegawai,

                updatedAt: formState.updatedAt

            });

            alert(

                "✅ Permohonan berjaya dikemaskini.\n\n" +

                "No Permohonan : " +

                window.currentRecordId

            );

            // Reset Edit Mode

            window.editMode = false;

            window.currentRecordId = null;

            // Kembali ke Rekod Saya

            await loadPage("records");

            return;

        }

        // ================= CREATE NEW =================

        const formNo =
        await generateFormNumber();

        formState.formNo = formNo;

        formState.formType = "KEW.PA-9";

        formState.status = "Pending";

        formState.createdAt =
        firebase.firestore.FieldValue.serverTimestamp();

        formState.user = {

            uid:
            auth.currentUser.uid,

            nama:
            auth.currentUser.displayName,

            email:
            auth.currentUser.email

        };

        await db
        .collection("forms")
        .doc(formNo)
        .set(formState);

        alert(

            "✅ Permohonan berjaya disimpan.\n\n" +

            "No Permohonan : " +

            formNo

        );

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

/* ==========================================
   RECORD CENTER STATE
========================================== */

let myRecordData = [];

let activeRecordFilter = "all";

let recordEventsInitialized = false;

/* ==========================================
   LOAD MY RECORDS V2
========================================== */

async function loadMyRecords(){

    const table =
    document.getElementById(
        "recordTable"
    );

    if(!table){
        return;
    }


    showRecordLoading();

    initializeRecordCenterEvents();


    try{

        const currentUser =
        auth.currentUser;

        if(!currentUser){

            showRecordMessage(
                "Sesi pengguna tidak dijumpai. Sila log masuk semula.",
                "error"
            );

            return;

        }


        const email =
        currentUser.email || "";

        const uid =
        currentUser.uid || "";


        /*
        ==========================================
        AMBIL SEMUA JENIS REKOD
        ==========================================
        */

        const [
            kewpa9Snapshot,
            kewpa19Snapshot,
            kewpa3Snapshot
        ] = await Promise.all([

            // KEW.PA-9

            db
            .collection("forms")
            .where(
                "user.email",
                "==",
                email
            )
            .get(),


            // KEW.PA-19

            db
            .collection("kewpa19")
            .where(
                "createdByEmail",
                "==",
                email
            )
            .get(),


            // KEW.PA-3

            db
            .collection("kewpa3")
            .where(
                "createdByUid",
                "==",
                uid
            )
            .get()

        ]);


        const records = [];


        /* ================= KEW.PA-9 ================= */

        kewpa9Snapshot.forEach(doc=>{

            const data =
            doc.data();

            records.push({

                id:
                doc.id,

                collection:
                "forms",

                filterType:
                "kewpa9",

                formType:
                data.formType ||
                "KEW.PA-9",

                formDescription:
                "Permohonan Pergerakan / Pinjaman Aset",

                status:
                data.status || "",

                createdAt:
                data.createdAt || null,

                searchText:[
                    doc.id,
                    data.formNo,
                    data.formType,
                    data.pemohon?.nama,
                    data.pemohon?.sekolah,
                    data.pemohon?.jabatan
                ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase(),

                data:
                data

            });

        });


        /* ================= KEW.PA-19 ================= */

        kewpa19Snapshot.forEach(doc=>{

            const data =
            doc.data();

            records.push({

                id:
                doc.id,

                displayId:
                data.borangNo ||
                doc.id,

                collection:
                "kewpa19",

                filterType:
                "kewpa19",

                formType:
                data.formType ||
                data.jenisBorang ||
                "KEW.PA-19",

                formDescription:
                "Perakuan Pelupusan Aset",

                status:
                data.status || "",

                createdAt:
                data.createdAt || null,

                searchText:[
                    doc.id,
                    data.borangNo,
                    data.formType,
                    data.jenisBorang,
                    data.aset?.noSiri,
                    data.aset?.keterangan,
                    data.jabatan?.nama
                ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase(),

                data:
                data

            });

        });


        /* ================= KEW.PA-3 ================= */

        kewpa3Snapshot.forEach(doc=>{

            const data =
            doc.data();

            records.push({

                id:
                doc.id,

                displayId:
                data.borangNo ||
                doc.id,

                collection:
                "kewpa3",

                filterType:
                "kewpa3",

                formType:
                data.jenisBorang ||
                "KEW.PA-3",

                formDescription:
                "Daftar Harta Modal",

                status:
                data.status || "",

                createdAt:
                data.createdAt || null,

                searchText:[
                    doc.id,
                    data.borangNo,
                    data.jenisBorang,
                    data.jabatan
                    ?.noSiriPendaftaran,
                    data.jabatan
                    ?.kementerianJabatan,
                    data.jabatan
                    ?.bahagianCawangan,
                    data.aset
                    ?.keteranganAset,
                    data.aset
                    ?.kategori,
                    data.aset
                    ?.jenisJenamaModel,
                    data.aset
                    ?.namaPembekal
                ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase(),

                data:
                data

            });

        });


        /*
        ==========================================
        SUSUN REKOD TERBARU DI ATAS
        ==========================================
        */

        records.sort((a,b)=>{

            const timeA =
            getRecordTimestamp(
                a.createdAt
            );

            const timeB =
            getRecordTimestamp(
                b.createdAt
            );

            return timeB - timeA;

        });


        myRecordData =
        records;


        updateRecordCounters();

        renderMyRecords();


    }catch(error){

        console.error(
            "Ralat loadMyRecords:",
            error
        );

        showRecordMessage(
            "Rekod gagal dimuatkan. Sila cuba semula.",
            "error"
        );

    }

}

/* ==========================================
   PAPAR LOADING REKOD
========================================== */

function showRecordLoading(){

    const table =
    document.getElementById(
        "recordTable"
    );

    const resultCount =
    document.getElementById(
        "recordResultCount"
    );

    const emptyState =
    document.getElementById(
        "recordEmptyState"
    );

    if(emptyState){

        emptyState.classList.add(
            "hidden"
        );

    }

    if(resultCount){

        resultCount.textContent =
        "Memuatkan rekod...";

    }

    if(!table){
        return;
    }

    table.innerHTML = `

        <tr>

            <td
            colspan="4"
            class="
            px-6
            py-16
            text-center">

                <div
                class="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-slate-700
                border-t-cyan-400">
                </div>

                <p
                class="
                mt-4
                text-sm
                text-slate-400">

                    Memuatkan data rekod...

                </p>

            </td>

        </tr>

    `;

}

/* ==========================================
   PAPAR MESEJ REKOD
========================================== */

function showRecordMessage(
    message,
    type = "empty"
){

    const table =
    document.getElementById(
        "recordTable"
    );

    const resultCount =
    document.getElementById(
        "recordResultCount"
    );

    const emptyState =
    document.getElementById(
        "recordEmptyState"
    );

    if(resultCount){

        resultCount.textContent =
        "0 rekod ditemui";

    }

    if(emptyState){

        emptyState.classList.add(
            "hidden"
        );

    }

    if(!table){
        return;
    }

    const textClass =
    type === "error"
    ? "text-red-300"
    : "text-slate-400";

    table.innerHTML = `

        <tr>

            <td
            colspan="4"
            class="
            px-6
            py-14
            text-center
            ${textClass}">

                ${escapeRecordHTML(message)}

            </td>

        </tr>

    `;

}

/* ==========================================
   UPDATE RECORD COUNTERS
========================================== */

function updateRecordCounters(){

    const totalAll =
    myRecordData.length;

    const totalKewpa3 =
    myRecordData.filter(
        record=>
        record.filterType ===
        "kewpa3"
    ).length;

    const totalKewpa9 =
    myRecordData.filter(
        record=>
        record.filterType ===
        "kewpa9"
    ).length;

    const totalKewpa19 =
    myRecordData.filter(
        record=>
        record.filterType ===
        "kewpa19"
    ).length;


    setRecordCount(
        "recordCountAll",
        totalAll
    );

    setRecordCount(
        "recordCountKewpa3",
        totalKewpa3
    );

    setRecordCount(
        "recordCountKewpa9",
        totalKewpa9
    );

    setRecordCount(
        "recordCountKewpa19",
        totalKewpa19
    );

}

/* ==========================================
   RENDER MY RECORDS
========================================== */

function renderMyRecords(){

    const table =
    document.getElementById(
        "recordTable"
    );

    const searchInput =
    document.getElementById(
        "recordSearchInput"
    );

    const resultCount =
    document.getElementById(
        "recordResultCount"
    );

    const emptyState =
    document.getElementById(
        "recordEmptyState"
    );

    if(!table){
        return;
    }


    const keyword =
    searchInput?.value
    .trim()
    .toLowerCase() || "";


    const filteredRecords =
    myRecordData.filter(record=>{

        const matchCategory =
        activeRecordFilter === "all" ||
        record.filterType ===
        activeRecordFilter;

        const matchSearch =
        !keyword ||
        record.searchText
        .includes(keyword);

        return (
            matchCategory &&
            matchSearch
        );

    });


    if(resultCount){

        resultCount.textContent =
        `${filteredRecords.length} rekod ditemui`;

    }


    updateActiveRecordLabels();


    if(
        filteredRecords.length === 0
    ){

        table.innerHTML = "";

        if(emptyState){

            emptyState.classList.remove(
                "hidden"
            );

        }

        return;

    }


    if(emptyState){

        emptyState.classList.add(
            "hidden"
        );

    }


    table.innerHTML =
    filteredRecords
    .map(record=>{

        const recordId =
        escapeRecordHTML(
            record.id
        );

        const displayId =
        escapeRecordHTML(
            record.displayId ||
            record.id
        );

        const collection =
        escapeRecordHTML(
            record.collection
        );

        const formType =
        escapeRecordHTML(
            record.formType
        );

        const description =
        escapeRecordHTML(
            record.formDescription
        );

        const displayDate =
        formatRecordDate(
            record.createdAt
        );


        return `

            <tr
            class="
            border-b
            border-slate-800
            transition
            hover:bg-white/[0.025]">

                <!-- NO. PERMOHONAN -->

                <td
                class="
                px-6
                py-5">

                    <div
                    class="
                    font-black
                    text-white">

                        ${displayId}

                    </div>

                </td>


                <!-- BORANG -->

                <td
                class="
                px-6
                py-5">

                    <div
                    class="
                    font-black
                    text-white">

                        ${formType}

                    </div>

                    <div
                    class="
                    mt-1
                    text-xs
                    text-slate-500">

                        ${description}

                    </div>

                </td>


                <!-- TARIKH -->

                <td
                class="
                px-6
                py-5
                text-sm
                text-slate-300">

                    ${displayDate}

                </td>


                <!-- TINDAKAN -->

                <td
                class="
                px-6
                py-5">

                    <div
                    class="
                    flex
                    flex-wrap
                    justify-end
                    gap-2">

                        <button
                        type="button"
                        onclick="
                        viewMyRecord(
                            '${collection}',
                            '${recordId}'
                        )"
                        class="
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-cyan-500/10
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-cyan-300
                        transition
                        hover:bg-cyan-500/20">

                            👁️ Lihat

                        </button>

                        <button
                        type="button"
                        onclick="
                        editMyRecord(
                            '${collection}',
                            '${recordId}'
                        )"
                        class="
                        rounded-xl
                        border
                        border-amber-500/20
                        bg-amber-500/10
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-amber-300
                        transition
                        hover:bg-amber-500/20">

                            ✏️ Edit

                        </button>

                        <button
                        type="button"
                        onclick="
                        printMyRecord(
                            '${collection}',
                            '${recordId}'
                        )"
                        class="
                        rounded-xl
                        border
                        border-emerald-500/20
                        bg-emerald-500/10
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-emerald-300
                        transition
                        hover:bg-emerald-500/20">

                            🖨️ Cetak

                        </button>

                    </div>

                </td>

            </tr>

        `;

    })
    .join("");

}

/* ==========================================
   UPDATE ACTIVE RECORD LABELS
========================================== */

function updateActiveRecordLabels(){

    const config = {

        all:{
            title:
            "Semua Rekod",

            description:
            "Paparan semua borang yang pernah dihantar."
        },

        kewpa3:{
            title:
            "Rekod KEW.PA-3",

            description:
            "Senarai Daftar Harta Modal."
        },

        kewpa9:{
            title:
            "Rekod KEW.PA-9",

            description:
            "Senarai pergerakan dan pinjaman aset."
        },

        kewpa19:{
            title:
            "Rekod KEW.PA-19",

            description:
            "Senarai perakuan pelupusan aset."
        }

    };


    const selected =
    config[activeRecordFilter] ||
    config.all;


    const title =
    document.getElementById(
        "recordSectionTitle"
    );

    const description =
    document.getElementById(
        "recordSectionDescription"
    );

    const activeLabel =
    document.getElementById(
        "recordActiveFilterLabel"
    );


    if(title){

        title.textContent =
        selected.title;

    }

    if(description){

        description.textContent =
        selected.description;

    }

    if(activeLabel){

        activeLabel.textContent =
        selected.title;

    }


    updateRecordFilterStyles();

}

/* ==========================================
   UPDATE FILTER STYLES
========================================== */

function updateRecordFilterStyles(){

    document
    .querySelectorAll(
        ".record-filter-tab"
    )
    .forEach(button=>{

        const isActive =
        button.dataset.recordFilter ===
        activeRecordFilter;

        button.classList.toggle(
            "border-cyan-500/30",
            isActive
        );

        button.classList.toggle(
            "bg-cyan-500/15",
            isActive
        );

        button.classList.toggle(
            "text-cyan-300",
            isActive
        );

        button.classList.toggle(
            "border-slate-700",
            !isActive
        );

        button.classList.toggle(
            "bg-slate-800/70",
            !isActive
        );

        button.classList.toggle(
            "text-slate-400",
            !isActive
        );

    });


    document
    .querySelectorAll(
        ".record-filter-card"
    )
    .forEach(button=>{

        const isActive =
        button.dataset.recordFilter ===
        activeRecordFilter;

        button.classList.toggle(
            "ring-2",
            isActive
        );

        button.classList.toggle(
            "ring-cyan-400/50",
            isActive
        );

    });

}

/* ==========================================
   INITIALIZE RECORD EVENTS
========================================== */

function initializeRecordCenterEvents(){

    if(recordEventsInitialized){
        return;
    }

    recordEventsInitialized = true;


    document.addEventListener(
        "click",
        event=>{

            const filterButton =
            event.target.closest(
                "[data-record-filter]"
            );

            if(filterButton){

                activeRecordFilter =
                filterButton
                .dataset
                .recordFilter ||
                "all";

                renderMyRecords();

                return;

            }


            const refreshButton =
            event.target.closest(
                "#recordRefreshBtn"
            );

            if(refreshButton){

                loadMyRecords();

            }

        }
    );


    document.addEventListener(
        "input",
        event=>{

            if(
                event.target.id ===
                "recordSearchInput"
            ){

                renderMyRecords();

            }

        }
    );

}

/* ==========================================
   RECORD HELPER FUNCTIONS
========================================== */

function getRecordTimestamp(timestamp){

    if(!timestamp){

        return 0;

    }

    if(
        typeof timestamp.toMillis ===
        "function"
    ){

        return timestamp.toMillis();

    }

    if(
        typeof timestamp.toDate ===
        "function"
    ){

        return timestamp
        .toDate()
        .getTime();

    }

    const convertedDate =
    new Date(timestamp);

    return Number.isNaN(
        convertedDate.getTime()
    )
    ? 0
    : convertedDate.getTime();

}


/* ================= FORMAT DATE ================= */

function formatRecordDate(timestamp){

    if(!timestamp){

        return "-";

    }

    try{

        const date =
        typeof timestamp.toDate ===
        "function"
        ? timestamp.toDate()
        : new Date(timestamp);

        return date.toLocaleDateString(
            "ms-MY",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }catch(error){

        return "-";

    }

}

/* ================= STATUS BADGE ================= */

function getRecordStatusBadge(status){

    const normalizedStatus =
    String(
        status || ""
    )
    .trim()
    .toUpperCase();


    /* ================= TIADA STATUS ================= */

    if(normalizedStatus === ""){

        return `

            <span
            class="
            inline-flex
            px-3
            py-1
            rounded-full
            bg-slate-500/10
            border
            border-slate-500/20
            text-slate-400
            text-xs
            font-bold">

                -

            </span>

        `;

    }


    /* ================= DILULUSKAN ================= */

    if(
        normalizedStatus === "APPROVED" ||
        normalizedStatus === "DILULUSKAN"
    ){

        return `

            <span
            class="
            inline-flex
            px-3
            py-1
            rounded-full
            bg-green-500/10
            border
            border-green-500/20
            text-green-300
            text-xs
            font-bold">

                DILULUSKAN

            </span>

        `;

    }


    /* ================= DITOLAK ================= */

    if(
        normalizedStatus === "REJECTED" ||
        normalizedStatus === "DITOLAK"
    ){

        return `

            <span
            class="
            inline-flex
            px-3
            py-1
            rounded-full
            bg-red-500/10
            border
            border-red-500/20
            text-red-300
            text-xs
            font-bold">

                DITOLAK

            </span>

        `;

    }


    /* ================= MENUNGGU ================= */

    if(
        normalizedStatus === "PENDING" ||
        normalizedStatus === "MENUNGGU"
    ){

        return `

            <span
            class="
            inline-flex
            px-3
            py-1
            rounded-full
            bg-amber-500/10
            border
            border-amber-500/20
            text-amber-300
            text-xs
            font-bold">

                MENUNGGU

            </span>

        `;

    }


    /* ================= DRAF ================= */

    if(normalizedStatus === "DRAF"){

        return `

            <span
            class="
            inline-flex
            px-3
            py-1
            rounded-full
            bg-slate-500/10
            border
            border-slate-500/20
            text-slate-300
            text-xs
            font-bold">

                DRAF

            </span>

        `;

    }


    /* ================= DEFAULT ================= */

    return `

        <span
        class="
        inline-flex
        px-3
        py-1
        rounded-full
        bg-blue-500/10
        border
        border-blue-500/20
        text-blue-300
        text-xs
        font-bold">

            ${escapeRecordHTML(status)}

        </span>

    `;

}


/* ================= UPDATE COUNTER ================= */

function setRecordCount(
    elementId,
    value
){

    const element =
    document.getElementById(
        elementId
    );

    if(element){

        element.textContent =
        value;

    }

}


/* ================= SECURITY ================= */

function escapeRecordHTML(value){

    return String(
        value ?? ""
    )
    .replaceAll(
        "&",
        "&amp;"
    )
    .replaceAll(
        "<",
        "&lt;"
    )
    .replaceAll(
        ">",
        "&gt;"
    )
    .replaceAll(
        '"',
        "&quot;"
    )
    .replaceAll(
        "'",
        "&#039;"
    );

}

/* ==========================================
   MY RECORD ACTION ROUTER
========================================== */

async function viewMyRecord(
    collectionName,
    recordId
){

    // ================= KEW.PA-9 =================

    if(collectionName === "forms"){

        if(
            typeof viewRecord ===
            "function"
        ){

            viewRecord(recordId);

        }

        return;

    }


    // ================= KEW.PA-19 =================

    if(collectionName === "kewpa19"){

        await viewKewpa19Record(
            recordId
        );

        return;

    }


    // ================= KEW.PA-3 =================

    if(collectionName === "kewpa3"){

        await viewKewpa3Record(
            recordId
        );

        return;

    }

}


/* ================= EDIT ================= */

async function editMyRecord(
    collectionName,
    recordId
){

    // ================= KEW.PA-9 =================

    if(collectionName === "forms"){

        if(
            typeof editRecord ===
            "function"
        ){

            editRecord(recordId);

        }

        return;

    }


    // ================= KEW.PA-19 =================

    if(collectionName === "kewpa19"){

        await editKewpa19Record(
            recordId
        );

        return;

    }


    // ================= KEW.PA-3 =================

    if(collectionName === "kewpa3"){

        alert(
            "✏️ Fungsi Edit KEW.PA-3 akan dibina pada langkah seterusnya."
        );

        return;

    }

}


/* ================= PRINT ================= */

async function printMyRecord(
    collectionName,
    recordId
){

    // ================= KEW.PA-9 =================

    if(collectionName === "forms"){

        printRecord(recordId);

        return;

    }


    // ================= KEW.PA-19 =================

    if(collectionName === "kewpa19"){

        printKewpa19Record(recordId);

        return;

    }


    // ================= KEW.PA-3 =================

    if(collectionName === "kewpa3"){

        alert(
            "🖨️ Fungsi Cetak KEW.PA-3 akan dibina selepas fungsi Edit."
        );

        return;

    }

}

/* ==========================================
   VIEW KEW.PA-19 RECORD
========================================== */

async function viewKewpa19Record(
    recordId
){

    try{

        const documentSnapshot =
        await db
        .collection("kewpa19")
        .doc(recordId)
        .get();

        if(!documentSnapshot.exists){

            alert(
                "Rekod KEW.PA-19 tidak dijumpai."
            );

            return;

        }

        const data =
        documentSnapshot.data();

        const noSiri =
        data.aset?.noSiri || "-";

        const jabatan =
        data.jabatan?.nama || "-";

        const status =
        data.status || "DRAF";

        alert(
            `KEW.PA-19\n\n` +
            `No. Siri Aset: ${noSiri}\n` +
            `Kementerian / Jabatan: ${jabatan}\n` +
            `Status: ${status}`
        );

    }catch(error){

        console.error(
            "Ralat melihat KEW.PA-19:",
            error
        );

        alert(
            "Rekod KEW.PA-19 gagal dibuka."
        );

    }

}

/* ==========================================
   VIEW KEW.PA-3 RECORD
========================================== */

async function viewKewpa3Record(
    recordId
){

    try{

        const documentSnapshot =
        await db
        .collection("kewpa3")
        .doc(recordId)
        .get();

        if(!documentSnapshot.exists){

            alert(
                "Rekod KEW.PA-3 tidak dijumpai."
            );

            return;

        }

        const data =
        documentSnapshot.data();

        const borangNo =
        data.borangNo || "-";

        const noSiri =
        data.jabatan
        ?.noSiriPendaftaran || "-";

        const sekolah =
        data.jabatan
        ?.bahagianCawangan || "-";

        const aset =
        data.aset
        ?.jenisJenamaModel ||
        data.aset
        ?.keteranganAset ||
        "-";

        const status =
        data.status || "Aktif";


        alert(

            `KEW.PA-3\n\n` +

            `No. Borang: ${borangNo}\n` +

            `No. Siri Pendaftaran: ${noSiri}\n` +

            `Aset: ${aset}\n` +

            `Sekolah: ${sekolah}\n` +

            `Status: ${status}`

        );

    }catch(error){

        console.error(
            "Ralat melihat KEW.PA-3:",
            error
        );

        alert(
            "Rekod KEW.PA-3 gagal dibuka."
        );

    }

}

/* ==========================================
   VIEW RECORD
========================================== */

async function viewRecord(id){

    try{

        const doc =
        await db
        .collection("forms")
        .doc(id)
        .get();

        if(!doc.exists){

            alert("Rekod tidak dijumpai.");

            return;

        }

        const data =
        doc.data();

        // Simpan Document ID
        window.currentRecordId =
        doc.id;

        // Isi terus ke formState

        formState.pemohon =
        data.pemohon || {};

        formState.permohonan =
        data.permohonan || {};

        formState.aset =
        data.aset || [];

        formState.pegawai =
        data.pegawai || {};

        // Buka borang

        await loadForm("kewpa9");

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

/* ==========================================
   EDIT RECORD
========================================== */

async function editRecord(id){

    try{

        const doc =
        await db
        .collection("forms")
        .doc(id)
        .get();

        if(!doc.exists){

            alert("Rekod tidak dijumpai.");

            return;

        }

        const data =
        doc.data();

        window.currentRecordId =
        doc.id;

        window.editMode = true;

        formState.pemohon =
        data.pemohon || {};

        formState.permohonan =
        data.permohonan || {};

        formState.aset =
        data.aset || [];

        formState.pegawai =
        data.pegawai || {};

        await loadForm("kewpa9");

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================
   PRINT RECORD
========================================== */

async function printRecord(id){

    try{

        const doc =
        await db
        .collection("forms")
        .doc(id)
        .get();

        if(!doc.exists){

            alert("Rekod tidak dijumpai.");

            return;

        }

        const data =
        doc.data();

        data.id = doc.id;

        await openPrint(

            "kewpa9",

            data

        );

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}