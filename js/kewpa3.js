/* ==========================================
   KEW.PA-3
   DAFTAR HARTA MODAL
========================================== */

const kewpa3State = {

    jabatan:{

        kementerianJabatan:"",
        bahagianCawangan:"",
        noSiriPendaftaran:""

    },

    aset:{

        kodNasional:"",
        keteranganAset:"",
        kategori:"",
        subKategori:"",
        jenisJenamaModel:"",
        buatan:"",
        hargaPerolehanAsal:"",
        jenisNoEnjin:"",
        tarikhPerolehan:"",
        tarikhDiterima:"",
        noCasisSiriPembuat:"",
        noPesananKontrak:"",
        noPendaftaran:"",
        tempohJaminan:"",
        namaPembekal:"",
        alamatPembekal:"",
        spesifikasiCatatan:""

    },

    pengesahan:{

        nama:"",
        jawatan:"",
        tarikh:"",
        cap:""

    },

    penempatan:[],

    pemeriksaan:[],

    nilaiSemasa:[],

    pindahanPelupusan:[]

};

let kewpa3CurrentStep = 1;

const kewpa3TotalStep = 5;


/* ==========================================
   INIT
========================================== */

function initKewpa3Wizard(){

    kewpa3CurrentStep = 1;

    updateKewpa3Wizard();

}

/* ==========================================
   UPDATE WIZARD
========================================== */

function updateKewpa3Wizard(){

    const progressBar =
    document.getElementById(
        "kewpa3ProgressBar"
    );

    const stepText =
    document.getElementById(
        "kewpa3StepText"
    );

    const progress =
    (
        kewpa3CurrentStep /
        kewpa3TotalStep
    ) * 100;

    if(progressBar){

        progressBar.style.width =
        `${progress}%`;

    }

    if(stepText){

        stepText.textContent =
        `Langkah ${kewpa3CurrentStep} daripada ${kewpa3TotalStep}`;

    }

    loadKewpa3Step();

    updateKewpa3Buttons();

}

/* ==========================================
   SAVE CURRENT STEP
========================================== */

function saveKewpa3CurrentStep(){

    // ================= LANGKAH 1 =================

    if(kewpa3CurrentStep === 1){

        const noSiriPendaftaran =
        document.getElementById(
            "kewpa3NoSiriPendaftaran"
        );

        const kementerianJabatan =
        document.getElementById(
            "kewpa3KementerianJabatan"
        );

        const bahagianCawangan =
        document.getElementById(
            "kewpa3BahagianCawangan"
        );

        if(noSiriPendaftaran){

            kewpa3State.jabatan
            .noSiriPendaftaran =
            noSiriPendaftaran.value.trim();

        }

        if(kementerianJabatan){

            kewpa3State.jabatan
            .kementerianJabatan =
            kementerianJabatan.value.trim();

        }

        if(bahagianCawangan){

            kewpa3State.jabatan
            .bahagianCawangan =
            bahagianCawangan.value.trim();

        }

    }


    // ================= LANGKAH 2 =================

    if(kewpa3CurrentStep === 2){

        const fieldMap = {

            kodNasional:
            "kewpa3KodNasional",

            keteranganAset:
            "kewpa3KeteranganAset",

            kategori:
            "kewpa3Kategori",

            subKategori:
            "kewpa3SubKategori",

            jenisJenamaModel:
            "kewpa3JenisJenamaModel",

            buatan:
            "kewpa3Buatan",

            hargaPerolehanAsal:
            "kewpa3HargaPerolehanAsal",

            jenisNoEnjin:
            "kewpa3JenisNoEnjin",

            tarikhPerolehan:
            "kewpa3TarikhPerolehan",

            tarikhDiterima:
            "kewpa3TarikhDiterima",

            noCasisSiriPembuat:
            "kewpa3NoCasisSiriPembuat",

            noPesananKontrak:
            "kewpa3NoPesananKontrak",

            noPendaftaran:
            "kewpa3NoPendaftaran",

            tempohJaminan:
            "kewpa3TempohJaminan",

            namaPembekal:
            "kewpa3NamaPembekal",

            alamatPembekal:
            "kewpa3AlamatPembekal",

            spesifikasiCatatan:
            "kewpa3SpesifikasiCatatan"

        };

        Object.entries(fieldMap)
        .forEach(([stateKey, elementId])=>{

            const element =
            document.getElementById(
                elementId
            );

            if(element){

                kewpa3State.aset[stateKey] =
                element.value.trim();

            }

        });

    }

    // ================= LANGKAH 3 =================

    if(kewpa3CurrentStep === 3){

    const fieldMap={

        nama:
        "kewpa3NamaPegawai",

        jawatan:
        "kewpa3JawatanPegawai",

        tarikh:
        "kewpa3TarikhPengesahan",

        cap:
        "kewpa3CapJabatan"

    };

    Object.entries(fieldMap)
    .forEach(([key,id])=>{

        const element=
        document.getElementById(id);

        if(element){

            kewpa3State.pengesahan[key]=
            element.value.trim();

            }

        });

    }

    if(kewpa3CurrentStep===4){

        savePenempatan();

    }

}


/* ==========================================
   RESTORE CURRENT STEP
========================================== */

function restoreKewpa3Step(){

    // ================= LANGKAH 1 =================

    if(kewpa3CurrentStep === 1){

        const noSiriPendaftaran =
        document.getElementById(
            "kewpa3NoSiriPendaftaran"
        );

        const kementerianJabatan =
        document.getElementById(
            "kewpa3KementerianJabatan"
        );

        const bahagianCawangan =
        document.getElementById(
            "kewpa3BahagianCawangan"
        );

        if(noSiriPendaftaran){

            noSiriPendaftaran.value =
            kewpa3State.jabatan
            .noSiriPendaftaran || "";

        }

        if(kementerianJabatan){

            kementerianJabatan.value =
            kewpa3State.jabatan
            .kementerianJabatan || "";

        }

        if(bahagianCawangan){

            bahagianCawangan.value =
            kewpa3State.jabatan
            .bahagianCawangan || "";

        }

    }

    // ================= LANGKAH 2 =================

    if(kewpa3CurrentStep === 2){

        const fieldMap = {

            kodNasional:
            "kewpa3KodNasional",

            keteranganAset:
            "kewpa3KeteranganAset",

            kategori:
            "kewpa3Kategori",

            subKategori:
            "kewpa3SubKategori",

            jenisJenamaModel:
            "kewpa3JenisJenamaModel",

            buatan:
            "kewpa3Buatan",

            hargaPerolehanAsal:
            "kewpa3HargaPerolehanAsal",

            jenisNoEnjin:
            "kewpa3JenisNoEnjin",

            tarikhPerolehan:
            "kewpa3TarikhPerolehan",

            tarikhDiterima:
            "kewpa3TarikhDiterima",

            noCasisSiriPembuat:
            "kewpa3NoCasisSiriPembuat",

            noPesananKontrak:
            "kewpa3NoPesananKontrak",

            noPendaftaran:
            "kewpa3NoPendaftaran",

            tempohJaminan:
            "kewpa3TempohJaminan",

            namaPembekal:
            "kewpa3NamaPembekal",

            alamatPembekal:
            "kewpa3AlamatPembekal",

            spesifikasiCatatan:
            "kewpa3SpesifikasiCatatan"

        };

        Object.entries(fieldMap).forEach(([stateKey, elementId])=>{

            const element =
            document.getElementById(elementId);

            if(element){

                element.value =
                kewpa3State.aset[stateKey] || "";

            }

        });

    }

    if(kewpa3CurrentStep === 3){

    const fieldMap={

        nama:
        "kewpa3NamaPegawai",

        jawatan:
        "kewpa3JawatanPegawai",

        tarikh:
        "kewpa3TarikhPengesahan",

        cap:
        "kewpa3CapJabatan"

    };

    Object.entries(fieldMap)
    .forEach(([key,id])=>{

        const element=
        document.getElementById(id);

        if(element){

            element.value=
            kewpa3State.pengesahan[key] || "";

            }

        });

    }

}

/* ==========================================
   VALIDATE CURRENT STEP
========================================== */

function validateKewpa3CurrentStep(){

    // ================= LANGKAH 1 =================

    if(kewpa3CurrentStep === 1){

        const requiredFields = [

            {
                id:"kewpa3NoSiriPendaftaran",
                message:"Sila masukkan No. Siri Pendaftaran."
            },

            {
                id:"kewpa3KementerianJabatan",
                message:"Sila masukkan Kementerian / Jabatan."
            },

            {
                id:"kewpa3BahagianCawangan",
                message:"Sila masukkan Bahagian / Cawangan."
            }

        ];

        for(const field of requiredFields){

            const element =
            document.getElementById(field.id);

            if(
                !element ||
                !element.value.trim()
            ){

                alert(field.message);

                element?.focus();

                return false;

            }

        }

    }


    // ================= LANGKAH 2 =================

    if(kewpa3CurrentStep === 2){

        const requiredFields = [

            {
                id:"kewpa3KeteranganAset",
                message:"Sila masukkan Keterangan Aset."
            },

            {
                id:"kewpa3Kategori",
                message:"Sila masukkan Kategori."
            },

            {
                id:"kewpa3JenisJenamaModel",
                message:"Sila masukkan Jenis / Jenama / Model."
            },

            {
                id:"kewpa3HargaPerolehanAsal",
                message:"Sila masukkan Harga Perolehan Asal."
            },

            {
                id:"kewpa3TarikhPerolehan",
                message:"Sila pilih Tarikh Perolehan."
            },

            {
                id:"kewpa3TarikhDiterima",
                message:"Sila pilih Tarikh Diterima."
            },

            {
                id:"kewpa3NamaPembekal",
                message:"Sila masukkan Nama Pembekal."
            },

            {
                id:"kewpa3AlamatPembekal",
                message:"Sila masukkan Alamat Pembekal."
            }

        ];

        for(const field of requiredFields){

            const element =
            document.getElementById(field.id);

            if(
                !element ||
                !element.value.trim()
            ){

                alert(field.message);

                element?.focus();

                return false;

            }

        }


        // VALIDASI HARGA

        const hargaPerolehan =
        document.getElementById(
            "kewpa3HargaPerolehanAsal"
        );

        const harga =
        Number(
            hargaPerolehan?.value
        );

        if(
            !Number.isFinite(harga) ||
            harga <= 0
        ){

            alert(
                "Harga Perolehan Asal mestilah melebihi RM0.00."
            );

            hargaPerolehan?.focus();

            return false;

        }


        // VALIDASI TARIKH

        const tarikhPerolehan =
        document.getElementById(
            "kewpa3TarikhPerolehan"
        );

        const tarikhDiterima =
        document.getElementById(
            "kewpa3TarikhDiterima"
        );

        if(
            tarikhPerolehan?.value &&
            tarikhDiterima?.value &&
            tarikhDiterima.value <
            tarikhPerolehan.value
        ){

            alert(
                "Tarikh Diterima tidak boleh lebih awal daripada Tarikh Perolehan."
            );

            tarikhDiterima.focus();

            return false;

        }

    }


    // ================= LANGKAH 3 =================

    if(kewpa3CurrentStep === 3){

        const requiredFields = [

            {
                id:"kewpa3NamaPegawai",
                message:"Sila masukkan Nama Pegawai."
            },

            {
                id:"kewpa3JawatanPegawai",
                message:"Sila masukkan Jawatan."
            },

            {
                id:"kewpa3TarikhPengesahan",
                message:"Sila pilih Tarikh Pengesahan."
            }

        ];

        for(const field of requiredFields){

            const element =
            document.getElementById(field.id);

            if(
                !element ||
                !element.value.trim()
            ){

                alert(field.message);

                element?.focus();

                return false;

            }

        }

    }


    // ================= LANGKAH 4 =================

    if(kewpa3CurrentStep === 4){

        const rows =
        document.querySelectorAll(
            "#kewpa3PenempatanList > div"
        );

        if(!rows.length){

            alert(
                "Sila masukkan sekurang-kurangnya satu rekod penempatan."
            );

            return false;

        }

        for(
            let index = 0;
            index < rows.length;
            index++
        ){

            const lokasi =
            document.getElementById(
                `lokasi_${index}`
            );

            const pegawai =
            document.getElementById(
                `pegawai_${index}`
            );

            const tarikh =
            document.getElementById(
                `tarikh_${index}`
            );

            if(
                !lokasi ||
                !lokasi.value.trim()
            ){

                alert(
                    `Sila masukkan Lokasi bagi Penempatan ${index + 1}.`
                );

                lokasi?.focus();

                return false;

            }

            if(
                !pegawai ||
                !pegawai.value.trim()
            ){

                alert(
                    `Sila masukkan Pegawai Penempatan bagi rekod ${index + 1}.`
                );

                pegawai?.focus();

                return false;

            }

            if(
                !tarikh ||
                !tarikh.value
            ){

                alert(
                    `Sila pilih Tarikh Penempatan bagi rekod ${index + 1}.`
                );

                tarikh?.focus();

                return false;

            }

        }

    }


    // LANGKAH 5 TIDAK MEMERLUKAN INPUT

    return true;

}


/* ==========================================
   GENERATE NO BORANG
========================================== */

async function generateKewpa3BorangNo(){

    const year =
    new Date().getFullYear();

    const counterRef =
    db.collection("counters")
    .doc(`kewpa3-${year}`);

    const sequence =
    await db.runTransaction(
        async transaction=>{

            const snapshot =
            await transaction.get(
                counterRef
            );

            let nextNumber = 1;

            if(snapshot.exists){

                nextNumber =
                Number(
                    snapshot.data().current || 0
                ) + 1;

            }

            transaction.set(
                counterRef,
                {
                    current:nextNumber,
                    year:year,

                    updatedAt:
                    firebase.firestore
                    .FieldValue
                    .serverTimestamp()
                },
                {
                    merge:true
                }
            );

            return nextNumber;

        }
    );

    return `KEWPA3-${year}-${String(sequence).padStart(4,"0")}`;

}

/* ==========================================
   SIMPAN KEW.PA-3
========================================== */

let kewpa3IsSaving = false;


async function saveKewpa3Form(){

    if(kewpa3IsSaving){
        return;
    }

    const nextButton =
    document.getElementById(
        "kewpa3NextBtn"
    );

    try{

        kewpa3IsSaving = true;

        if(nextButton){

            nextButton.disabled = true;

            nextButton.textContent =
            "⏳ Sedang Menyimpan...";

            nextButton.classList.add(
                "opacity-60",
                "cursor-not-allowed"
            );

        }


        if(
            typeof db === "undefined"
        ){

            throw new Error(
                "Sambungan Firestore tidak ditemui."
            );

        }


        const currentUser =
        typeof firebase !== "undefined" &&
        firebase.auth
        ? firebase.auth().currentUser
        : null;


        if(!currentUser){

            throw new Error(
                "Sila log masuk sebelum menyimpan borang."
            );

        }


        const borangNo =
        await generateKewpa3BorangNo();


        const documentRef =
        db.collection("kewpa3")
        .doc();


        const formData = {

            id:
            documentRef.id,

            borangNo:
            borangNo,

            status:
            "Aktif",

            jenisBorang:
            "KEW.PA-3",

            createdBy:
            currentUser.email || "",

            createdByUid:
            currentUser.uid || "",

            createdByName:
            currentUser.displayName || "",

            createdAt:
            firebase.firestore
            .FieldValue
            .serverTimestamp(),

            updatedAt:
            firebase.firestore
            .FieldValue
            .serverTimestamp(),

            jabatan:{
                ...kewpa3State.jabatan
            },

            aset:{
                ...kewpa3State.aset,

                hargaPerolehanAsal:
                Number(
                    kewpa3State.aset
                    .hargaPerolehanAsal
                ) || 0
            },

            pengesahan:{
                ...kewpa3State.pengesahan
            },

            penempatan:
            kewpa3State.penempatan.map(
                item=>({

                    lokasi:
                    item.lokasi || "",

                    pegawai:
                    item.pegawai || "",

                    tarikh:
                    item.tarikh || ""

                })
            )

        };


        await documentRef.set(
            formData
        );


        alert(
            `Borang berjaya disimpan.\n\nNo. Borang: ${borangNo}`
        );


        resetKewpa3Form();


    }catch(error){

        console.error(
            "Ralat simpan KEW.PA-3:",
            error
        );

        alert(
            error?.message ||
            "Borang tidak berjaya disimpan. Sila cuba semula."
        );

    }finally{

        kewpa3IsSaving = false;

        if(nextButton){

            nextButton.disabled = false;

            nextButton.classList.remove(
                "opacity-60",
                "cursor-not-allowed"
            );

            updateKewpa3Buttons();

        }

    }

}

/* ==========================================
   RESET BORANG
========================================== */

function resetKewpa3Form(){

    kewpa3State.jabatan = {

        kementerianJabatan:"",
        bahagianCawangan:"",
        noSiriPendaftaran:""

    };

    kewpa3State.aset = {

        kodNasional:"",
        keteranganAset:"",
        kategori:"",
        subKategori:"",
        jenisJenamaModel:"",
        buatan:"",
        hargaPerolehanAsal:"",
        jenisNoEnjin:"",
        tarikhPerolehan:"",
        tarikhDiterima:"",
        noCasisSiriPembuat:"",
        noPesananKontrak:"",
        noPendaftaran:"",
        tempohJaminan:"",
        namaPembekal:"",
        alamatPembekal:"",
        spesifikasiCatatan:""

    };

    kewpa3State.pengesahan = {

        nama:"",
        jawatan:"",
        tarikh:"",
        cap:""

    };

    kewpa3State.penempatan = [];

    kewpa3State.pemeriksaan = [];

    kewpa3State.nilaiSemasa = [];

    kewpa3State.pindahanPelupusan = [];

    kewpa3CurrentStep = 1;

    updateKewpa3Wizard();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


/* ==========================================
   BUTTON
========================================== */

function updateKewpa3Buttons(){

    const prev =
    document.getElementById(
        "kewpa3PrevBtn"
    );

    const next =
    document.getElementById(
        "kewpa3NextBtn"
    );

    prev.classList.toggle(
        "hidden",
        kewpa3CurrentStep === 1
    );

    next.textContent =
    kewpa3CurrentStep === kewpa3TotalStep
    ? "💾 Simpan Borang"
    : "Seterusnya →";

}

/* ==========================================
   INPUT TEMPLATE
========================================== */

function kewpa3InputField(
    id,
    label,
    placeholder = "",
    required = false,
    type = "text"
){

    return `

        <div>

            <label
            for="${id}"
            class="
            mb-2
            block
            text-sm
            font-bold
            text-slate-200">

                ${label}

                ${
                    required
                    ? `<span class="text-red-400">*</span>`
                    : ""
                }

            </label>

            <input
            id="${id}"
            type="${type}"
            autocomplete="off"
            placeholder="${placeholder}"
            ${
                type === "number"
                ? `min="0" step="0.01"`
                : ""
            }
            class="
            w-full
            rounded-2xl
            border
            border-slate-700
            bg-slate-950/70
            px-4
            py-3.5
            text-white
            outline-none
            transition
            placeholder:text-slate-600
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-500/10">

        </div>

    `;

}

/* ==========================================
   STEP
========================================== */

function loadKewpa3Step(){

    const container =
    document.getElementById(
        "kewpa3WizardContent"
    );

    if(!container) return;

    switch(kewpa3CurrentStep){

        case 1:

    container.innerHTML = `

        <div class="space-y-7">

            <!-- STEP HEADER -->

            <div
            class="
            border-b
            border-slate-800
            pb-5">

                <div
                class="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/10
                px-4
                py-2
                text-xs
                font-bold
                tracking-wider
                text-cyan-300">

                    LANGKAH 1

                </div>

                <h2
                class="
                mt-4
                text-2xl
                md:text-3xl
                font-black
                text-white">

                    Maklumat Jabatan

                </h2>

                <p
                class="
                mt-2
                text-sm
                text-slate-400">

                    Sila lengkapkan maklumat pendaftaran,
                    kementerian atau jabatan serta
                    bahagian atau cawangan.

                </p>

            </div>

            <!-- FORM -->

            <div
            class="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-2">

                <!-- NO SIRI PENDAFTARAN -->

                <div class="lg:col-span-2">

                    <label
                    for="kewpa3NoSiriPendaftaran"
                    class="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-slate-200">

                        No. Siri Pendaftaran

                        <span class="text-red-400">
                            *
                        </span>

                    </label>

                    <input
                    id="kewpa3NoSiriPendaftaran"
                    type="text"
                    autocomplete="off"
                    placeholder="Contoh: KPM/JPNKED/KBA0065/H/16/01"
                    class="
                    w-full
                    rounded-2xl
                    border
                    border-slate-700
                    bg-slate-950/70
                    px-4
                    py-3.5
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-cyan-500
                    focus:ring-4
                    focus:ring-cyan-500/10">

                    <p
                    class="
                    mt-2
                    text-xs
                    text-slate-500">

                        Masukkan nombor siri pendaftaran
                        aset seperti yang ditetapkan oleh jabatan.

                    </p>

                </div>

                <!-- KEMENTERIAN / JABATAN -->

                <div>

                    <label
                    for="kewpa3KementerianJabatan"
                    class="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-slate-200">

                        Kementerian / Jabatan

                        <span class="text-red-400">
                            *
                        </span>

                    </label>

                    <input
                    id="kewpa3KementerianJabatan"
                    type="text"
                    autocomplete="organization"
                    placeholder="Contoh: Kementerian Pendidikan Malaysia"
                    class="
                    w-full
                    rounded-2xl
                    border
                    border-slate-700
                    bg-slate-950/70
                    px-4
                    py-3.5
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-cyan-500
                    focus:ring-4
                    focus:ring-cyan-500/10">

                </div>

                <!-- BAHAGIAN / CAWANGAN -->

                <div>

                    <label
                    for="kewpa3BahagianCawangan"
                    class="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-slate-200">

                        Bahagian / Cawangan

                        <span class="text-red-400">
                            *
                        </span>

                    </label>

                    <input
                    id="kewpa3BahagianCawangan"
                    type="text"
                    autocomplete="organization-title"
                    placeholder="Contoh: Sekolah Kebangsaan Paya Besar"
                    class="
                    w-full
                    rounded-2xl
                    border
                    border-slate-700
                    bg-slate-950/70
                    px-4
                    py-3.5
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-cyan-500
                    focus:ring-4
                    focus:ring-cyan-500/10">

                </div>

            </div>

            <!-- INFO -->

            <div
            class="
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-blue-500/20
            bg-blue-500/10
            p-4">

                <span class="text-xl">
                    ℹ️
                </span>

                <p
                class="
                text-sm
                leading-6
                text-blue-200">

                    Maklumat ini akan dipaparkan pada bahagian
                    atas borang rasmi KEW.PA-3.

                </p>

            </div>

        </div>

    `;

    restoreKewpa3Step();

break;

        
case 2:

    container.innerHTML = `

        <div class="space-y-8">

            <!-- HEADER -->

            <div class="border-b border-slate-800 pb-5">

                <div
                class="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/10
                px-4
                py-2
                text-xs
                font-bold
                tracking-wider
                text-cyan-300">

                    LANGKAH 2

                </div>

                <h2
                class="
                mt-4
                text-2xl
                md:text-3xl
                font-black
                text-white">

                    Maklumat Harta Modal

                </h2>

                <p class="mt-2 text-sm text-slate-400">

                    Lengkapkan maklumat aset, perolehan,
                    pembekal dan spesifikasi harta modal.

                </p>

            </div>

            <!-- MAKLUMAT UTAMA -->

            <div class="space-y-5">

                <h3 class="text-lg font-bold text-cyan-300">
                    A. Maklumat Utama Aset
                </h3>

                <div
                class="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2">

                    ${kewpa3InputField(
                        "kewpa3KodNasional",
                        "Kod Nasional",
                        "Contoh: 2101010101",
                        false
                    )}

                    ${kewpa3InputField(
                        "kewpa3KeteranganAset",
                        "Keterangan Aset",
                        "Contoh: Komputer Riba",
                        true
                    )}

                    ${kewpa3InputField(
                        "kewpa3Kategori",
                        "Kategori",
                        "Contoh: Peralatan ICT",
                        true
                    )}

                    ${kewpa3InputField(
                        "kewpa3SubKategori",
                        "Sub Kategori",
                        "Contoh: Komputer",
                        false
                    )}

                    <div class="md:col-span-2">

                        ${kewpa3InputField(
                            "kewpa3JenisJenamaModel",
                            "Jenis / Jenama / Model",
                            "Contoh: Laptop Lenovo ThinkPad E14",
                            true
                        )}

                    </div>

                </div>

            </div>

            <!-- PEROLEHAN -->

            <div class="space-y-5">

                <h3 class="text-lg font-bold text-cyan-300">
                    B. Maklumat Perolehan
                </h3>

                <div
                class="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2">

                    ${kewpa3InputField(
                        "kewpa3Buatan",
                        "Buatan",
                        "Contoh: Malaysia / China",
                        false
                    )}

                    ${kewpa3InputField(
                        "kewpa3HargaPerolehanAsal",
                        "Harga Perolehan Asal (RM)",
                        "Contoh: 3250.00",
                        true,
                        "number"
                    )}

                    ${kewpa3InputField(
                        "kewpa3TarikhPerolehan",
                        "Tarikh Perolehan",
                        "",
                        true,
                        "date"
                    )}

                    ${kewpa3InputField(
                        "kewpa3TarikhDiterima",
                        "Tarikh Diterima",
                        "",
                        true,
                        "date"
                    )}

                    ${kewpa3InputField(
                        "kewpa3NoPesananKontrak",
                        "No. Pesanan Rasmi Kerajaan / Kontrak",
                        "Contoh: KPM/PO/2026/00125",
                        false
                    )}

                    ${kewpa3InputField(
                        "kewpa3TempohJaminan",
                        "Tempoh Jaminan",
                        "Contoh: 3 Tahun",
                        false
                    )}

                </div>

            </div>

            <!-- IDENTIFIKASI ASET -->

            <div class="space-y-5">

                <h3 class="text-lg font-bold text-cyan-300">
                    C. Maklumat Pengenalan Aset
                </h3>

                <div
                class="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2">

                    ${kewpa3InputField(
                        "kewpa3JenisNoEnjin",
                        "Jenis dan No. Enjin",
                        "Untuk aset berkaitan sahaja",
                        false
                    )}

                    ${kewpa3InputField(
                        "kewpa3NoCasisSiriPembuat",
                        "No. Casis / Siri Pembuat",
                        "Contoh: PF3ABC123456",
                        false
                    )}

                    ${kewpa3InputField(
                        "kewpa3NoPendaftaran",
                        "No. Pendaftaran (Kenderaan)",
                        "Untuk kenderaan sahaja",
                        false
                    )}

                </div>

            </div>

            <!-- PEMBEKAL -->

            <div class="space-y-5">

                <h3 class="text-lg font-bold text-cyan-300">
                    D. Maklumat Pembekal
                </h3>

                <div
                class="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2">

                    ${kewpa3InputField(
                        "kewpa3NamaPembekal",
                        "Nama Pembekal",
                        "Nama syarikat pembekal",
                        true
                    )}

                    <div class="md:col-span-2">

                        <label
                        for="kewpa3AlamatPembekal"
                        class="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-slate-200">

                            Alamat Pembekal

                            <span class="text-red-400">*</span>

                        </label>

                        <textarea
                        id="kewpa3AlamatPembekal"
                        rows="3"
                        placeholder="Masukkan alamat lengkap pembekal"
                        class="
                        w-full
                        resize-none
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-950/70
                        px-4
                        py-3.5
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-600
                        focus:border-cyan-500
                        focus:ring-4
                        focus:ring-cyan-500/10">
                        </textarea>

                    </div>

                    <div class="md:col-span-2">

                        <label
                        for="kewpa3SpesifikasiCatatan"
                        class="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-slate-200">

                            Spesifikasi / Catatan

                        </label>

                        <textarea
                        id="kewpa3SpesifikasiCatatan"
                        rows="4"
                        placeholder="Masukkan spesifikasi lengkap atau catatan berkaitan aset"
                        class="
                        w-full
                        resize-none
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-950/70
                        px-4
                        py-3.5
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-600
                        focus:border-cyan-500
                        focus:ring-4
                        focus:ring-cyan-500/10">
                        </textarea>

                    </div>

                </div>

            </div>

        </div>

    `;

    restoreKewpa3Step();

        break;

        case 3:

container.innerHTML = `

<div class="space-y-8">

    <!-- HEADER -->

    <div class="border-b border-slate-800 pb-5">

        <div
        class="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-cyan-500/20
        bg-cyan-500/10
        px-4
        py-2
        text-xs
        font-bold
        tracking-wider
        text-cyan-300">

            LANGKAH 3

        </div>

        <h2
        class="
        mt-4
        text-2xl
        md:text-3xl
        font-black
        text-white">

            Maklumat Pegawai Pengesahan

        </h2>

        <p
        class="
        mt-2
        text-sm
        text-slate-400">

            Maklumat pegawai yang bertanggungjawab
            mengesahkan pendaftaran harta modal.

        </p>

    </div>

    <div
    class="
    grid
    grid-cols-1
    gap-6
    md:grid-cols-2">

        ${kewpa3InputField(

            "kewpa3NamaPegawai",

            "Nama Pegawai",

            "Masukkan nama penuh",

            true

        )}

        ${kewpa3InputField(

            "kewpa3JawatanPegawai",

            "Jawatan",

            "Contoh: Guru Besar",

            true

        )}

        ${kewpa3InputField(

            "kewpa3TarikhPengesahan",

            "Tarikh Pengesahan",

            "",

            true,

            "date"

        )}

        ${kewpa3InputField(

            "kewpa3CapJabatan",

            "Cap Jabatan",

            "Contoh: SK Kuala Ketil",

            false

        )}

    </div>

    <div
    class="
    rounded-2xl
    border
    border-blue-500/20
    bg-blue-500/10
    p-5">

        <p
        class="
        text-sm
        leading-6
        text-blue-200">

            Maklumat ini akan dipaparkan
            pada bahagian pengesahan
            semasa cetakan rasmi KEW.PA-3.

        </p>

    </div>

</div>

`;

restoreKewpa3Step();

break;

        case 4:

container.innerHTML = `

<div class="space-y-8">

    <div class="border-b border-slate-800 pb-5">

        <div
        class="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-cyan-500/20
        bg-cyan-500/10
        px-4
        py-2
        text-xs
        font-bold
        tracking-wider
        text-cyan-300">

            LANGKAH 4

        </div>

        <h2
        class="
        mt-4
        text-2xl
        md:text-3xl
        font-black
        text-white">

            Penempatan Aset

        </h2>

        <p
        class="
        mt-2
        text-sm
        text-slate-400">

            Rekod lokasi semasa aset ditempatkan.

        </p>

    </div>

    <div id="kewpa3PenempatanList"
         class="space-y-5">

    </div>

    <button
    type="button"
    onclick="addPenempatanRow()"
    class="
    rounded-2xl
    bg-cyan-600
    hover:bg-cyan-700
    px-6
    py-3
    font-bold
    text-white">

        ➕ Tambah Penempatan

    </button>

</div>

`;

renderPenempatan();

break;

        case 5:

    container.innerHTML = `

        <div class="space-y-8">

            <!-- HEADER -->

            <div class="border-b border-slate-800 pb-5">

                <div
                class="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/10
                px-4
                py-2
                text-xs
                font-bold
                tracking-wider
                text-cyan-300">

                    LANGKAH 5

                </div>

                <h2
                class="
                mt-4
                text-2xl
                md:text-3xl
                font-black
                text-white">

                    Semakan Akhir

                </h2>

                <p class="mt-2 text-sm text-slate-400">

                    Sila semak semua maklumat sebelum menyimpan
                    borang KEW.PA-3.

                </p>

            </div>


            <!-- MAKLUMAT JABATAN -->

            <div
            class="
            rounded-3xl
            border
            border-slate-700
            bg-slate-900/60
            p-6">

                <div
                class="
                mb-5
                flex
                items-center
                justify-between
                gap-4">

                    <h3
                    class="
                    text-lg
                    font-black
                    text-cyan-300">

                        1. Maklumat Jabatan

                    </h3>

                    <button
                    type="button"
                    onclick="goToKewpa3Step(1)"
                    class="
                    rounded-xl
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    px-4
                    py-2
                    text-xs
                    font-bold
                    text-cyan-300
                    hover:bg-cyan-500/20">

                        Edit

                    </button>

                </div>

                <div
                class="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2">

                    ${kewpa3ReviewItem(
                        "No. Siri Pendaftaran",
                        kewpa3State.jabatan.noSiriPendaftaran
                    )}

                    ${kewpa3ReviewItem(
                        "Kementerian / Jabatan",
                        kewpa3State.jabatan.kementerianJabatan
                    )}

                    ${kewpa3ReviewItem(
                        "Bahagian / Cawangan",
                        kewpa3State.jabatan.bahagianCawangan
                    )}

                </div>

            </div>


            <!-- MAKLUMAT ASET -->

            <div
            class="
            rounded-3xl
            border
            border-slate-700
            bg-slate-900/60
            p-6">

                <div
                class="
                mb-5
                flex
                items-center
                justify-between
                gap-4">

                    <h3
                    class="
                    text-lg
                    font-black
                    text-cyan-300">

                        2. Maklumat Harta Modal

                    </h3>

                    <button
                    type="button"
                    onclick="goToKewpa3Step(2)"
                    class="
                    rounded-xl
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    px-4
                    py-2
                    text-xs
                    font-bold
                    text-cyan-300
                    hover:bg-cyan-500/20">

                        Edit

                    </button>

                </div>

                <div
                class="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2">

                    ${kewpa3ReviewItem(
                        "Kod Nasional",
                        kewpa3State.aset.kodNasional
                    )}

                    ${kewpa3ReviewItem(
                        "Keterangan Aset",
                        kewpa3State.aset.keteranganAset
                    )}

                    ${kewpa3ReviewItem(
                        "Kategori",
                        kewpa3State.aset.kategori
                    )}

                    ${kewpa3ReviewItem(
                        "Sub Kategori",
                        kewpa3State.aset.subKategori
                    )}

                    ${kewpa3ReviewItem(
                        "Jenis / Jenama / Model",
                        kewpa3State.aset.jenisJenamaModel
                    )}

                    ${kewpa3ReviewItem(
                        "Buatan",
                        kewpa3State.aset.buatan
                    )}

                    ${kewpa3ReviewItem(
                        "Harga Perolehan Asal",
                        formatKewpa3Currency(
                            kewpa3State.aset.hargaPerolehanAsal
                        )
                    )}

                    ${kewpa3ReviewItem(
                        "Tarikh Perolehan",
                        formatKewpa3Date(
                            kewpa3State.aset.tarikhPerolehan
                        )
                    )}

                    ${kewpa3ReviewItem(
                        "Tarikh Diterima",
                        formatKewpa3Date(
                            kewpa3State.aset.tarikhDiterima
                        )
                    )}

                    ${kewpa3ReviewItem(
                        "No. Pesanan / Kontrak",
                        kewpa3State.aset.noPesananKontrak
                    )}

                    ${kewpa3ReviewItem(
                        "Tempoh Jaminan",
                        kewpa3State.aset.tempohJaminan
                    )}

                    ${kewpa3ReviewItem(
                        "Jenis dan No. Enjin",
                        kewpa3State.aset.jenisNoEnjin
                    )}

                    ${kewpa3ReviewItem(
                        "No. Casis / Siri Pembuat",
                        kewpa3State.aset.noCasisSiriPembuat
                    )}

                    ${kewpa3ReviewItem(
                        "No. Pendaftaran",
                        kewpa3State.aset.noPendaftaran
                    )}

                    ${kewpa3ReviewItem(
                        "Nama Pembekal",
                        kewpa3State.aset.namaPembekal
                    )}

                    <div class="md:col-span-2">

                        ${kewpa3ReviewItem(
                            "Alamat Pembekal",
                            kewpa3State.aset.alamatPembekal
                        )}

                    </div>

                    <div class="md:col-span-2">

                        ${kewpa3ReviewItem(
                            "Spesifikasi / Catatan",
                            kewpa3State.aset.spesifikasiCatatan
                        )}

                    </div>

                </div>

            </div>


            <!-- PENGESAHAN -->

            <div
            class="
            rounded-3xl
            border
            border-slate-700
            bg-slate-900/60
            p-6">

                <div
                class="
                mb-5
                flex
                items-center
                justify-between
                gap-4">

                    <h3
                    class="
                    text-lg
                    font-black
                    text-cyan-300">

                        3. Maklumat Pegawai Pengesahan

                    </h3>

                    <button
                    type="button"
                    onclick="goToKewpa3Step(3)"
                    class="
                    rounded-xl
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    px-4
                    py-2
                    text-xs
                    font-bold
                    text-cyan-300
                    hover:bg-cyan-500/20">

                        Edit

                    </button>

                </div>

                <div
                class="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2">

                    ${kewpa3ReviewItem(
                        "Nama Pegawai",
                        kewpa3State.pengesahan.nama
                    )}

                    ${kewpa3ReviewItem(
                        "Jawatan",
                        kewpa3State.pengesahan.jawatan
                    )}

                    ${kewpa3ReviewItem(
                        "Tarikh Pengesahan",
                        formatKewpa3Date(
                            kewpa3State.pengesahan.tarikh
                        )
                    )}

                    ${kewpa3ReviewItem(
                        "Cap Jabatan",
                        kewpa3State.pengesahan.cap
                    )}

                </div>

            </div>


            <!-- PENEMPATAN -->

            <div
            class="
            rounded-3xl
            border
            border-slate-700
            bg-slate-900/60
            p-6">

                <div
                class="
                mb-5
                flex
                items-center
                justify-between
                gap-4">

                    <h3
                    class="
                    text-lg
                    font-black
                    text-cyan-300">

                        4. Penempatan Aset

                    </h3>

                    <button
                    type="button"
                    onclick="goToKewpa3Step(4)"
                    class="
                    rounded-xl
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    px-4
                    py-2
                    text-xs
                    font-bold
                    text-cyan-300
                    hover:bg-cyan-500/20">

                        Edit

                    </button>

                </div>

                <div class="space-y-4">

                    ${renderKewpa3PenempatanReview()}

                </div>

            </div>


            <!-- INFO -->

            <div
            class="
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-emerald-500/20
            bg-emerald-500/10
            p-5">

                <span class="text-xl">
                    ✅
                </span>

                <p
                class="
                text-sm
                leading-6
                text-emerald-200">

                    Dengan menekan butang Simpan Borang,
                    semua maklumat akan direkodkan ke dalam
                    sistem PTIS Digital Forms.

                </p>

            </div>

        </div>

    `;

break;

    }

}

/* ==========================================
   RENDER PENEMPATAN
========================================== */

function renderPenempatan(){

    const container =
    document.getElementById(
        "kewpa3PenempatanList"
    );

    if(!container) return;


    // WUJUDKAN SATU BARIS JIKA MASIH KOSONG

    if(
        !Array.isArray(
            kewpa3State.penempatan
        ) ||
        kewpa3State.penempatan.length === 0
    ){

        kewpa3State.penempatan = [

            {
                lokasi:"",
                pegawai:"",
                tarikh:""
            }

        ];

    }


    container.innerHTML = "";


    kewpa3State.penempatan
    .forEach((item,index)=>{

        container.innerHTML += `

            <div
            class="
            rounded-2xl
            border
            border-slate-700
            bg-slate-900/60
            p-5">

                <div
                class="
                mb-5
                flex
                items-center
                justify-between
                gap-4">

                    <h3
                    class="
                    font-bold
                    text-white">

                        Penempatan ${index + 1}

                    </h3>

                    ${
                        kewpa3State.penempatan.length > 1
                        ? `

                            <button
                            type="button"
                            onclick="removePenempatanRow(${index})"
                            class="
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-red-300
                            transition
                            hover:bg-red-500/20">

                                🗑️ Padam

                            </button>

                        `
                        : ""
                    }

                </div>

                <div
                class="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-3">

                    ${kewpa3InputField(

                        `lokasi_${index}`,

                        "Lokasi",

                        "Contoh: Makmal Komputer",

                        true

                    )}

                    ${kewpa3InputField(

                        `pegawai_${index}`,

                        "Pegawai Penempatan",

                        "Nama Pegawai",

                        true

                    )}

                    ${kewpa3InputField(

                        `tarikh_${index}`,

                        "Tarikh Penempatan",

                        "",

                        true,

                        "date"

                    )}

                </div>

            </div>

        `;

    });


    // PULIHKAN DATA KE DALAM INPUT

    kewpa3State.penempatan
    .forEach((item,index)=>{

        const lokasi =
        document.getElementById(
            `lokasi_${index}`
        );

        const pegawai =
        document.getElementById(
            `pegawai_${index}`
        );

        const tarikh =
        document.getElementById(
            `tarikh_${index}`
        );


        if(lokasi){

            lokasi.value =
            item.lokasi || "";

        }


        if(pegawai){

            pegawai.value =
            item.pegawai || "";

        }


        if(tarikh){

            tarikh.value =
            item.tarikh || "";

        }

    });

}

/* ==========================================
   SAVE PENEMPATAN
========================================== */

function savePenempatan(){

    const rows =
    document.querySelectorAll(
        "#kewpa3PenempatanList > div"
    );

    if(!rows.length){
        return;
    }

    const penempatanBaru = [];

    rows.forEach((row,index)=>{

        const lokasi =
        document.getElementById(
            `lokasi_${index}`
        );

        const pegawai =
        document.getElementById(
            `pegawai_${index}`
        );

        const tarikh =
        document.getElementById(
            `tarikh_${index}`
        );

        penempatanBaru.push({

            lokasi:
            lokasi?.value.trim() || "",

            pegawai:
            pegawai?.value.trim() || "",

            tarikh:
            tarikh?.value || ""

        });

    });

    kewpa3State.penempatan =
    penempatanBaru;

}


/* ==========================================
   ADD PENEMPATAN
========================================== */

function addPenempatanRow(){

    savePenempatan();

    kewpa3State.penempatan.push({

        lokasi:"",
        pegawai:"",
        tarikh:""

    });

    renderPenempatan();

}


/* ==========================================
   REMOVE PENEMPATAN
========================================== */

function removePenempatanRow(index){

    savePenempatan();

    if(
        kewpa3State.penempatan.length <= 1
    ){

        alert(
            "Sekurang-kurangnya satu rekod penempatan diperlukan."
        );

        return;

    }

    kewpa3State.penempatan.splice(
        index,
        1
    );

    renderPenempatan();

}

/* ==========================================
   REVIEW ITEM
========================================== */

function kewpa3ReviewItem(label,value){

    const paparan =
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
    ? escapeKewpa3Html(String(value))
    : "-";

    return `

        <div
        class="
        rounded-2xl
        border
        border-slate-800
        bg-slate-950/50
        p-4">

            <p
            class="
            mb-1
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-slate-500">

                ${escapeKewpa3Html(label)}

            </p>

            <p
            class="
            whitespace-pre-line
            break-words
            text-sm
            font-semibold
            text-white">

                ${paparan}

            </p>

        </div>

    `;

}

/* ==========================================
   REVIEW PENEMPATAN
========================================== */

function renderKewpa3PenempatanReview(){

    if(
        !Array.isArray(kewpa3State.penempatan) ||
        kewpa3State.penempatan.length === 0
    ){

        return `

            <p class="text-sm text-slate-500">
                Tiada maklumat penempatan.
            </p>

        `;

    }

    return kewpa3State.penempatan
    .map((item,index)=>{

        return `

            <div
            class="
            rounded-2xl
            border
            border-slate-800
            bg-slate-950/50
            p-5">

                <p
                class="
                mb-4
                font-black
                text-white">

                    Penempatan ${index + 1}

                </p>

                <div
                class="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-3">

                    ${kewpa3ReviewItem(
                        "Lokasi",
                        item.lokasi
                    )}

                    ${kewpa3ReviewItem(
                        "Pegawai Penempatan",
                        item.pegawai
                    )}

                    ${kewpa3ReviewItem(
                        "Tarikh Penempatan",
                        formatKewpa3Date(
                            item.tarikh
                        )
                    )}

                </div>

            </div>

        `;

    })
    .join("");

}

/* ==========================================
   FORMAT TARIKH
========================================== */

function formatKewpa3Date(value){

    if(!value){
        return "-";
    }

    const date =
    new Date(`${value}T00:00:00`);

    if(
        Number.isNaN(
            date.getTime()
        )
    ){
        return value;
    }

    return date.toLocaleDateString(
        "ms-MY",
        {
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );

}

/* ==========================================
   FORMAT HARGA
========================================== */

function formatKewpa3Currency(value){

    const amount =
    Number(value);

    if(
        !Number.isFinite(amount)
    ){
        return "-";
    }

    return new Intl.NumberFormat(
        "ms-MY",
        {
            style:"currency",
            currency:"MYR"
        }
    ).format(amount);

}

/* ==========================================
   ESCAPE HTML
========================================== */

function escapeKewpa3Html(value){

    return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}

/* ==========================================
   PERGI KE LANGKAH
========================================== */

function goToKewpa3Step(step){

    const targetStep =
    Number(step);

    if(
        !Number.isInteger(targetStep) ||
        targetStep < 1 ||
        targetStep > kewpa3TotalStep
    ){
        return;
    }

    kewpa3CurrentStep =
    targetStep;

    updateKewpa3Wizard();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

/* ==========================================
   NEXT
========================================== */

async function nextKewpa3Step(){

    if(
        !validateKewpa3CurrentStep()
    ){

        return;

    }

    saveKewpa3CurrentStep();


    if(
        kewpa3CurrentStep <
        kewpa3TotalStep
    ){

        kewpa3CurrentStep++;

        updateKewpa3Wizard();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

        return;

    }


    // LANGKAH 5 — SIMPAN KE FIRESTORE

    await saveKewpa3Form();

}


/* ==========================================
   PREVIOUS
========================================== */

function previousKewpa3Step(){

    saveKewpa3CurrentStep();

    if(
        kewpa3CurrentStep > 1
    ){

        kewpa3CurrentStep--;

        updateKewpa3Wizard();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* ==========================================
   EVENT
========================================== */

document.addEventListener(
"click",

(event)=>{

    if(
        event.target.id ===
        "kewpa3NextBtn"
    ){

        nextKewpa3Step();

    }

    if(
        event.target.id ===
        "kewpa3PrevBtn"
    ){

        previousKewpa3Step();

    }

});

/* =========================================================
   KEW.PA-3 PRINT
========================================================= */

window.currentPrintKewpa3 = null;


/* ================= SAFE VALUE ================= */

function kewpa3PrintValue(value){

    if(
        value === null ||
        value === undefined ||
        value === ""
    ){
        return "-";
    }

    return String(value);

}


/* ================= FORMAT DATE ================= */

function formatKewpa3PrintDate(value){

    if(!value){
        return "-";
    }

    const date =
    new Date(value);

    if(
        Number.isNaN(
            date.getTime()
        )
    ){
        return kewpa3PrintValue(value);
    }

    return date.toLocaleDateString(
        "ms-MY",
        {
            day:"2-digit",
            month:"2-digit",
            year:"numeric"
        }
    );

}


/* ================= FORMAT MONEY ================= */

function formatKewpa3PrintMoney(value){

    const number =
    Number(value);

    if(
        !Number.isFinite(number)
    ){
        return "-";
    }

    return new Intl.NumberFormat(
        "ms-MY",
        {
            style:"currency",
            currency:"MYR",
            minimumFractionDigits:2
        }
    ).format(number);

}


/* ================= SET TEXT ================= */

function setKewpa3PrintText(
    elementId,
    value
){

    const element =
    document.getElementById(
        elementId
    );

    if(!element){
        return;
    }

    element.textContent =
    kewpa3PrintValue(value);

}


/* ================= POPULATE PRINT ================= */

function populateKewpa3Print(){

    const data =
    window.currentPrintKewpa3;

    if(!data){
        console.error(
            "Data cetakan KEW.PA-3 tidak dijumpai."
        );
        return;
    }


    /* ================= HEADER ================= */

    setKewpa3PrintText(
        "printKewpa3KementerianJabatan",
        data.jabatan
        ?.kementerianJabatan
    );

    setKewpa3PrintText(
        "printKewpa3BahagianCawangan",
        data.jabatan
        ?.bahagianCawangan
    );

    setKewpa3PrintText(
        "printKewpa3NoSiri",
        data.jabatan
        ?.noSiriPendaftaran
    );

    setKewpa3PrintText(
        "printKewpa3BorangNo",
        data.borangNo ||
        data.id
    );


    /* ================= ASSET ================= */

    const aset =
    data.aset || {};

    setKewpa3PrintText(
        "printKewpa3KodNasional",
        aset.kodNasional
    );

    setKewpa3PrintText(
        "printKewpa3KeteranganAset",
        aset.keteranganAset
    );

    setKewpa3PrintText(
        "printKewpa3Kategori",
        aset.kategori
    );

    setKewpa3PrintText(
        "printKewpa3SubKategori",
        aset.subKategori
    );

    setKewpa3PrintText(
        "printKewpa3JenisJenamaModel",
        aset.jenisJenamaModel
    );

    setKewpa3PrintText(
        "printKewpa3Buatan",
        aset.buatan
    );

    setKewpa3PrintText(
        "printKewpa3Harga",
        formatKewpa3PrintMoney(
            aset.hargaPerolehanAsal
        )
    );

    setKewpa3PrintText(
        "printKewpa3NoEnjin",
        aset.jenisNoEnjin
    );

    setKewpa3PrintText(
        "printKewpa3NoCasis",
        aset.noCasisSiriPembuat
    );

    setKewpa3PrintText(
        "printKewpa3NoPendaftaran",
        aset.noPendaftaran
    );

    setKewpa3PrintText(
        "printKewpa3TempohJaminan",
        aset.tempohJaminan
    );

    setKewpa3PrintText(
        "printKewpa3TarikhPerolehan",
        formatKewpa3PrintDate(
            aset.tarikhPerolehan
        )
    );

    setKewpa3PrintText(
        "printKewpa3TarikhDiterima",
        formatKewpa3PrintDate(
            aset.tarikhDiterima
        )
    );

    setKewpa3PrintText(
        "printKewpa3PesananKontrak",
        aset.noPesananKontrak
    );

    setKewpa3PrintText(
        "printKewpa3NamaPembekal",
        aset.namaPembekal
    );

    setKewpa3PrintText(
        "printKewpa3AlamatPembekal",
        aset.alamatPembekal
    );

    setKewpa3PrintText(
        "printKewpa3Spesifikasi",
        aset.spesifikasiCatatan
    );


    /* ================= CONFIRMATION ================= */

    const pengesahan =
    data.pengesahan || {};

    setKewpa3PrintText(
        "printKewpa3PengesahanNama",
        pengesahan.nama
    );

    setKewpa3PrintText(
        "printKewpa3PengesahanJawatan",
        pengesahan.jawatan
    );

    setKewpa3PrintText(
        "printKewpa3PengesahanTarikh",
        formatKewpa3PrintDate(
            pengesahan.tarikh
        )
    );

    setKewpa3PrintText(
        "printKewpa3PengesahanCap",
        pengesahan.cap
    );


 /* ================= PLACEMENT ================= */

const placementContainer =
document.getElementById(
    "printKewpa3PenempatanHorizontal"
);

if(placementContainer){

    const penempatan =
    Array.isArray(data.penempatan)
    ? data.penempatan.slice(0,6)
    : [];

    const lokasiCells = [];
    const tarikhCells = [];
    const pegawaiCells = [];

    for(let index = 0; index < 6; index++){

        const item =
        penempatan[index] || {};

        lokasiCells.push(`

            <div class="kewpa3-history-value">

                ${
                    escapeKewpa3PrintHTML(
                        item.lokasi || "-"
                    )
                }

            </div>

        `);

        tarikhCells.push(`

            <div class="kewpa3-history-value">

                ${
                    escapeKewpa3PrintHTML(
                        item.tarikh
                        ? formatKewpa3PrintDate(
                            item.tarikh
                        )
                        : "-"
                    )
                }

            </div>

        `);

        pegawaiCells.push(`

            <div class="kewpa3-history-value">

                ${
                    escapeKewpa3PrintHTML(
                        item.pegawai || "-"
                    )
                }

            </div>

        `);

    }

    placementContainer.innerHTML = `

        <div class="kewpa3-history-title">

            PENEMPATAN

        </div>

        <div class="kewpa3-history-label">

            Lokasi

        </div>

        ${lokasiCells.join("")}

        <div class="kewpa3-history-label">

            Tarikh

        </div>

        ${tarikhCells.join("")}

        <div class="kewpa3-history-label">

            Nama Pegawai

        </div>

        ${pegawaiCells.join("")}

    `;

}


    /* ================= GENERATED DATE ================= */

    setKewpa3PrintText(
        "printKewpa3GeneratedAt",
        `Dijana pada ${new Date()
        .toLocaleString("ms-MY")}`
    );

}


/* ================= SECURITY ================= */

function escapeKewpa3PrintHTML(value){

    return String(
        value ?? ""
    )
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


/* ================= OPEN PRINT PAGE ================= */

async function printKewpa3Record(
    recordId
){

    try{

        if(!recordId){

            throw new Error(
                "ID rekod KEW.PA-3 tidak dijumpai."
            );

        }

        const snapshot =
        await db
        .collection("kewpa3")
        .doc(recordId)
        .get();

        if(!snapshot.exists){

            throw new Error(
                "Rekod KEW.PA-3 tidak dijumpai."
            );

        }

        window.currentPrintKewpa3 = {

            id:
            snapshot.id,

            ...snapshot.data()

        };

        await loadForm(
            "kewpa3-print-v3"
        );

        setTimeout(()=>{

            populateKewpa3Print();

        },150);

    }
    catch(error){

        console.error(
            "Ralat cetak KEW.PA-3:",
            error
        );

        alert(
            error?.message ||
            "Paparan cetakan KEW.PA-3 gagal dibuka."
        );

    }

}