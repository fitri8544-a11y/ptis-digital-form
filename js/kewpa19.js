/* ==========================================
   PTIS DIGITAL FORM
   KEW.PA-19 WIZARD ENGINE
========================================== */

/* ================= FORM STATE ================= */

const kewpa19State = {

    jabatan: {},

    aset: {},

    penilaian: {},

    laporan: {},

    pemeriksa: {}

};

/* ================= WIZARD STATE ================= */

let kewpa19CurrentStep = 1;

const kewpa19TotalStep = 5;

/* ==========================================
   INITIALIZE WIZARD
========================================== */

function initKewpa19Wizard(){

    kewpa19CurrentStep = 1;

    updateKewpa19Wizard();

}

/* ==========================================
   RESET STATE
========================================== */

function resetKewpa19State(){

    kewpa19State.jabatan = {};

    kewpa19State.aset = {};

    kewpa19State.penilaian = {};

    kewpa19State.laporan = {};

    kewpa19State.pemeriksa = {};

    kewpa19CurrentStep = 1;

}

/* ==========================================
   UPDATE WIZARD
========================================== */

function updateKewpa19Wizard(){

    const stepLabel =
    document.getElementById(
        "kewpa19StepLabel"
    );

    const progressBar =
    document.getElementById(
        "kewpa19ProgressBar"
    );

    if(stepLabel){

        stepLabel.textContent =
        `Langkah ${kewpa19CurrentStep} / ${kewpa19TotalStep}`;

    }

    if(progressBar){

        progressBar.style.width =
        `${(
            kewpa19CurrentStep /
            kewpa19TotalStep
        ) * 100}%`;

    }

    loadKewpa19Step();

    setTimeout(()=>{

        restoreKewpa19Step();

    },50);

    updateKewpa19Buttons();

}

/* ==========================================
   LOAD CURRENT STEP
========================================== */

function loadKewpa19Step(){

    const container =
    document.getElementById(
        "kewpa19WizardContent"
    );

    if(!container) return;

    switch(kewpa19CurrentStep){

        /* ================= STEP 1 ================= */

        case 1:

            container.innerHTML = `

            <div class="space-y-8">

                <div>

                    <h2 class="text-3xl font-black">

                        🏢 Maklumat Kementerian / Jabatan

                    </h2>

                    <p class="text-slate-400 mt-2">

                        Lengkapkan maklumat organisasi pemilik aset.

                    </p>

                </div>

                <div class="grid md:grid-cols-2 gap-6">

                    <div class="md:col-span-2">

                        <label class="form-label">

                            Kementerian atau Jabatan

                        </label>

                        <input
                        id="kewpa19Jabatan"
                        type="text"
                        class="form-input"
                        placeholder="Contoh: Kementerian Pendidikan Malaysia">

                    </div>

                    <div class="md:col-span-2">

                        <label class="form-label">

                            Alamat

                        </label>

                        <textarea
                        id="kewpa19Alamat"
                        class="form-textarea"
                        rows="4"
                        placeholder="Masukkan alamat penuh organisasi"></textarea>

                    </div>

                </div>

            </div>

            `;

        break;

        /* ================= STEP 2 ================= */

        case 2:

            container.innerHTML = `

            <div class="space-y-8">

                <div>

                    <h2 class="text-3xl font-black">

                        💻 Maklumat Aset

                    </h2>

                    <p class="text-slate-400 mt-2">

                        Lengkapkan butiran aset yang diperiksa untuk pelupusan.

                    </p>

                </div>

                <div class="grid md:grid-cols-2 gap-6">

                    <div>

                        <label class="form-label">

                            No. Siri Pendaftaran Aset

                        </label>

                        <input
                        id="kewpa19NoSiri"
                        type="text"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            No. Kodifikasi Nasional

                        </label>

                        <input
                        id="kewpa19Kodifikasi"
                        type="text"
                        class="form-input">

                    </div>

                    <div class="md:col-span-2">

                        <label class="form-label">

                            Jenis, Jenama dan Model

                        </label>

                        <input
                        id="kewpa19JenisJenamaModel"
                        type="text"
                        class="form-input"
                        placeholder="Contoh: Komputer Dell OptiPlex 7090">

                    </div>

                    <div>

                        <label class="form-label">

                            No. Chassis / Siri Pembuat

                        </label>

                        <input
                        id="kewpa19NoChassis"
                        type="text"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            No. Enjin

                        </label>

                        <input
                        id="kewpa19NoEnjin"
                        type="text"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            No. Pendaftaran Kenderaan

                        </label>

                        <input
                        id="kewpa19NoPendaftaran"
                        type="text"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            Tarikh Perolehan

                        </label>

                        <input
                        id="kewpa19TarikhPerolehan"
                        type="date"
                        class="form-input">

                    </div>

                    <div class="md:col-span-2">

                        <label class="form-label">

                            Nilai Perolehan Asal (RM)

                        </label>

                        <input
                        id="kewpa19NilaiPerolehan"
                        type="number"
                        min="0"
                        step="0.01"
                        class="form-input"
                        placeholder="0.00">

                    </div>

                </div>

            </div>

            `;

        break;

        /* ================= STEP 3 ================= */

        case 3:

            container.innerHTML = `

            <div class="space-y-8">

                <div>

                    <h2 class="text-3xl font-black">

                        🔧 Penilaian Teknikal

                    </h2>

                    <p class="text-slate-400 mt-2">

                        Masukkan maklumat prestasi, penggunaan dan kos aset.

                    </p>

                </div>

                <div class="grid md:grid-cols-2 gap-6">

                    <div>

                        <label class="form-label">

                            Jumlah Jarak Perjalanan (km)

                        </label>

                        <input
                        id="kewpa19Jarak"
                        type="number"
                        min="0"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            Tempoh Penggunaan (jam)

                        </label>

                        <input
                        id="kewpa19TempohPenggunaan"
                        type="number"
                        min="0"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            Tahap Prestasi Semasa Aset (%)

                        </label>

                        <input
                        id="kewpa19Prestasi"
                        type="number"
                        min="0"
                        max="100"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            Jumlah Kos Penyelenggaraan Terdahulu (RM)

                        </label>

                        <input
                        id="kewpa19KosTerdahulu"
                        type="number"
                        min="0"
                        step="0.01"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            Nilai Semasa (RM)

                        </label>

                        <input
                        id="kewpa19NilaiSemasa"
                        type="number"
                        min="0"
                        step="0.01"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            Anggaran Kos Penyelenggaraan Semasa (RM)

                        </label>

                        <input
                        id="kewpa19KosSemasa"
                        type="number"
                        min="0"
                        step="0.01"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            Anggaran Nilai Selepas Diperbaiki (RM)

                        </label>

                        <input
                        id="kewpa19NilaiSelepasBaiki"
                        type="number"
                        min="0"
                        step="0.01"
                        class="form-input">

                    </div>

                    <div>

                        <label class="form-label">

                            Anggaran Tempoh Usia Guna Selepas Diperbaiki

                        </label>

                        <input
                        id="kewpa19UsiaGuna"
                        type="text"
                        class="form-input"
                        placeholder="Contoh: 2 tahun">

                    </div>

                </div>

            </div>

            `;

        break;

        /* ================= STEP 4 ================= */

        case 4:

            container.innerHTML = `

            <div class="space-y-8">

                <div>

                    <h2 class="text-3xl font-black">

                        📋 Laporan Pemeriksaan

                    </h2>

                    <p class="text-slate-400 mt-2">

                        Nyatakan penambahbaikan dan hasil pemeriksaan aset.

                    </p>

                </div>

                <div class="space-y-6">

                    <div>

                        <label class="form-label">

                            Butir Penambahbaikan 1

                        </label>

                        <textarea
                        id="kewpa19TambahBaik1"
                        class="form-textarea"
                        rows="2"></textarea>

                    </div>

                    <div>

                        <label class="form-label">

                            Butir Penambahbaikan 2

                        </label>

                        <textarea
                        id="kewpa19TambahBaik2"
                        class="form-textarea"
                        rows="2"></textarea>

                    </div>

                    <div>

                        <label class="form-label">

                            Butir Penambahbaikan 3

                        </label>

                        <textarea
                        id="kewpa19TambahBaik3"
                        class="form-textarea"
                        rows="2"></textarea>

                    </div>

                    <div>

                        <label class="form-label">

                            Laporan Pemeriksaan 1

                        </label>

                        <textarea
                        id="kewpa19Laporan1"
                        class="form-textarea"
                        rows="2"></textarea>

                    </div>

                    <div>

                        <label class="form-label">

                            Laporan Pemeriksaan 2

                        </label>

                        <textarea
                        id="kewpa19Laporan2"
                        class="form-textarea"
                        rows="2"></textarea>

                    </div>

                    <div>

                        <label class="form-label">

                            Laporan Pemeriksaan 3

                        </label>

                        <textarea
                        id="kewpa19Laporan3"
                        class="form-textarea"
                        rows="2"></textarea>

                    </div>

                </div>

            </div>

            `;

        break;

        /* ================= STEP 5 ================= */

        case 5:

            container.innerHTML = `

            <div class="space-y-8">

                <div>

                    <h2 class="text-3xl font-black">

                        👨‍💼 Maklumat Pemeriksa

                    </h2>

                    <p class="text-slate-400 mt-2">

                        Lengkapkan maklumat pegawai yang membuat perakuan.

                    </p>

                </div>

                <div class="grid lg:grid-cols-2 gap-8">

                    <div class="asset-card">

                        <h3 class="text-xl font-bold mb-6">

                            Pemeriksa Pertama

                        </h3>

                        <div class="space-y-5">

                            <div>

                                <label class="form-label">

                                    Nama

                                </label>

                                <input
                                id="kewpa19Pemeriksa1Nama"
                                type="text"
                                class="form-input">

                            </div>

                            <div>

                                <label class="form-label">

                                    Jawatan

                                </label>

                                <input
                                id="kewpa19Pemeriksa1Jawatan"
                                type="text"
                                class="form-input">

                            </div>

                            <div>

                                <label class="form-label">

                                    Tarikh

                                </label>

                                <input
                                id="kewpa19Pemeriksa1Tarikh"
                                type="date"
                                class="form-input">

                            </div>

                            <div>

                                <label class="form-label">

                                    Cap

                                </label>

                                <input
                                id="kewpa19Pemeriksa1Cap"
                                type="text"
                                class="form-input">

                            </div>

                        </div>

                    </div>

                    <div class="asset-card">

                        <h3 class="text-xl font-bold mb-6">

                            Pemeriksa Kedua

                        </h3>

                        <div class="space-y-5">

                            <div>

                                <label class="form-label">

                                    Nama

                                </label>

                                <input
                                id="kewpa19Pemeriksa2Nama"
                                type="text"
                                class="form-input">

                            </div>

                            <div>

                                <label class="form-label">

                                    Jawatan

                                </label>

                                <input
                                id="kewpa19Pemeriksa2Jawatan"
                                type="text"
                                class="form-input">

                            </div>

                            <div>

                                <label class="form-label">

                                    Tarikh

                                </label>

                                <input
                                id="kewpa19Pemeriksa2Tarikh"
                                type="date"
                                class="form-input">

                            </div>

                            <div>

                                <label class="form-label">

                                    Cap

                                </label>

                                <input
                                id="kewpa19Pemeriksa2Cap"
                                type="text"
                                class="form-input">

                            </div>

                        </div>

                    </div>

                </div>

                <div class="flex justify-end">

                    <button
                    id="saveKewpa19Btn"
                    type="button"
                    class="btn-success">

                        💾 Simpan KEW.PA-19

                    </button>

                </div>

            </div>

            `;

        break;

    }

}

/* ==========================================
   UPDATE BUTTONS
========================================== */

function updateKewpa19Buttons(){

    const previousButton =
    document.getElementById(
        "kewpa19PrevBtn"
    );

    const nextButton =
    document.getElementById(
        "kewpa19NextBtn"
    );

    if(previousButton){

        previousButton.style.visibility =
        kewpa19CurrentStep === 1
        ? "hidden"
        : "visible";

    }

    if(nextButton){

        nextButton.style.display =
        kewpa19CurrentStep === kewpa19TotalStep
        ? "none"
        : "inline-flex";

    }

}

/* ==========================================
   SAVE CURRENT STEP
========================================== */

function saveKewpa19CurrentStep(){

    switch(kewpa19CurrentStep){

        case 1:

            kewpa19State.jabatan = {

                nama:
                document.getElementById(
                    "kewpa19Jabatan"
                )?.value || "",

                alamat:
                document.getElementById(
                    "kewpa19Alamat"
                )?.value || ""

            };

        break;

        case 2:

            kewpa19State.aset = {

                noSiri:
                document.getElementById(
                    "kewpa19NoSiri"
                )?.value || "",

                kodifikasi:
                document.getElementById(
                    "kewpa19Kodifikasi"
                )?.value || "",

                jenisJenamaModel:
                document.getElementById(
                    "kewpa19JenisJenamaModel"
                )?.value || "",

                noChassis:
                document.getElementById(
                    "kewpa19NoChassis"
                )?.value || "",

                noEnjin:
                document.getElementById(
                    "kewpa19NoEnjin"
                )?.value || "",

                noPendaftaran:
                document.getElementById(
                    "kewpa19NoPendaftaran"
                )?.value || "",

                tarikhPerolehan:
                document.getElementById(
                    "kewpa19TarikhPerolehan"
                )?.value || "",

                nilaiPerolehan:
                document.getElementById(
                    "kewpa19NilaiPerolehan"
                )?.value || ""

            };

        break;

        case 3:

            kewpa19State.penilaian = {

                jarak:
                document.getElementById(
                    "kewpa19Jarak"
                )?.value || "",

                tempohPenggunaan:
                document.getElementById(
                    "kewpa19TempohPenggunaan"
                )?.value || "",

                prestasi:
                document.getElementById(
                    "kewpa19Prestasi"
                )?.value || "",

                kosTerdahulu:
                document.getElementById(
                    "kewpa19KosTerdahulu"
                )?.value || "",

                nilaiSemasa:
                document.getElementById(
                    "kewpa19NilaiSemasa"
                )?.value || "",

                kosSemasa:
                document.getElementById(
                    "kewpa19KosSemasa"
                )?.value || "",

                nilaiSelepasBaiki:
                document.getElementById(
                    "kewpa19NilaiSelepasBaiki"
                )?.value || "",

                usiaGuna:
                document.getElementById(
                    "kewpa19UsiaGuna"
                )?.value || ""

            };

        break;

        case 4:

            kewpa19State.laporan = {

                penambahbaikan: [

                    document.getElementById(
                        "kewpa19TambahBaik1"
                    )?.value || "",

                    document.getElementById(
                        "kewpa19TambahBaik2"
                    )?.value || "",

                    document.getElementById(
                        "kewpa19TambahBaik3"
                    )?.value || ""

                ],

                pemeriksaan: [

                    document.getElementById(
                        "kewpa19Laporan1"
                    )?.value || "",

                    document.getElementById(
                        "kewpa19Laporan2"
                    )?.value || "",

                    document.getElementById(
                        "kewpa19Laporan3"
                    )?.value || ""

                ]

            };

        break;

        case 5:

            kewpa19State.pemeriksa = {

                pertama: {

                    nama:
                    document.getElementById(
                        "kewpa19Pemeriksa1Nama"
                    )?.value || "",

                    jawatan:
                    document.getElementById(
                        "kewpa19Pemeriksa1Jawatan"
                    )?.value || "",

                    tarikh:
                    document.getElementById(
                        "kewpa19Pemeriksa1Tarikh"
                    )?.value || "",

                    cap:
                    document.getElementById(
                        "kewpa19Pemeriksa1Cap"
                    )?.value || ""

                },

                kedua: {

                    nama:
                    document.getElementById(
                        "kewpa19Pemeriksa2Nama"
                    )?.value || "",

                    jawatan:
                    document.getElementById(
                        "kewpa19Pemeriksa2Jawatan"
                    )?.value || "",

                    tarikh:
                    document.getElementById(
                        "kewpa19Pemeriksa2Tarikh"
                    )?.value || "",

                    cap:
                    document.getElementById(
                        "kewpa19Pemeriksa2Cap"
                    )?.value || ""

                }

            };

        break;

    }

}

/* ==========================================
   RESTORE CURRENT STEP
========================================== */

function restoreKewpa19Step(){

    const setInputValue = (
        id,
        value
    )=>{

        const element =
        document.getElementById(id);

        if(element){

            element.value =
            value || "";

        }

    };

    switch(kewpa19CurrentStep){

        case 1:

            setInputValue(
                "kewpa19Jabatan",
                kewpa19State.jabatan.nama
            );

            setInputValue(
                "kewpa19Alamat",
                kewpa19State.jabatan.alamat
            );

        break;

        case 2:

            setInputValue(
                "kewpa19NoSiri",
                kewpa19State.aset.noSiri
            );

            setInputValue(
                "kewpa19Kodifikasi",
                kewpa19State.aset.kodifikasi
            );

            setInputValue(
                "kewpa19JenisJenamaModel",
                kewpa19State.aset.jenisJenamaModel
            );

            setInputValue(
                "kewpa19NoChassis",
                kewpa19State.aset.noChassis
            );

            setInputValue(
                "kewpa19NoEnjin",
                kewpa19State.aset.noEnjin
            );

            setInputValue(
                "kewpa19NoPendaftaran",
                kewpa19State.aset.noPendaftaran
            );

            setInputValue(
                "kewpa19TarikhPerolehan",
                kewpa19State.aset.tarikhPerolehan
            );

            setInputValue(
                "kewpa19NilaiPerolehan",
                kewpa19State.aset.nilaiPerolehan
            );

        break;

        case 3:

            setInputValue(
                "kewpa19Jarak",
                kewpa19State.penilaian.jarak
            );

            setInputValue(
                "kewpa19TempohPenggunaan",
                kewpa19State.penilaian.tempohPenggunaan
            );

            setInputValue(
                "kewpa19Prestasi",
                kewpa19State.penilaian.prestasi
            );

            setInputValue(
                "kewpa19KosTerdahulu",
                kewpa19State.penilaian.kosTerdahulu
            );

            setInputValue(
                "kewpa19NilaiSemasa",
                kewpa19State.penilaian.nilaiSemasa
            );

            setInputValue(
                "kewpa19KosSemasa",
                kewpa19State.penilaian.kosSemasa
            );

            setInputValue(
                "kewpa19NilaiSelepasBaiki",
                kewpa19State.penilaian.nilaiSelepasBaiki
            );

            setInputValue(
                "kewpa19UsiaGuna",
                kewpa19State.penilaian.usiaGuna
            );

        break;

        case 4:

            const penambahbaikan =
            kewpa19State.laporan.penambahbaikan || [];

            const pemeriksaan =
            kewpa19State.laporan.pemeriksaan || [];

            setInputValue(
                "kewpa19TambahBaik1",
                penambahbaikan[0]
            );

            setInputValue(
                "kewpa19TambahBaik2",
                penambahbaikan[1]
            );

            setInputValue(
                "kewpa19TambahBaik3",
                penambahbaikan[2]
            );

            setInputValue(
                "kewpa19Laporan1",
                pemeriksaan[0]
            );

            setInputValue(
                "kewpa19Laporan2",
                pemeriksaan[1]
            );

            setInputValue(
                "kewpa19Laporan3",
                pemeriksaan[2]
            );

        break;

        case 5:

            setInputValue(
                "kewpa19Pemeriksa1Nama",
                kewpa19State.pemeriksa.pertama?.nama
            );

            setInputValue(
                "kewpa19Pemeriksa1Jawatan",
                kewpa19State.pemeriksa.pertama?.jawatan
            );

            setInputValue(
                "kewpa19Pemeriksa1Tarikh",
                kewpa19State.pemeriksa.pertama?.tarikh
            );

            setInputValue(
                "kewpa19Pemeriksa1Cap",
                kewpa19State.pemeriksa.pertama?.cap
            );

            setInputValue(
                "kewpa19Pemeriksa2Nama",
                kewpa19State.pemeriksa.kedua?.nama
            );

            setInputValue(
                "kewpa19Pemeriksa2Jawatan",
                kewpa19State.pemeriksa.kedua?.jawatan
            );

            setInputValue(
                "kewpa19Pemeriksa2Tarikh",
                kewpa19State.pemeriksa.kedua?.tarikh
            );

            setInputValue(
                "kewpa19Pemeriksa2Cap",
                kewpa19State.pemeriksa.kedua?.cap
            );

        break;

    }

}

/* ==========================================
   NEXT / PREVIOUS
========================================== */

function nextKewpa19Step(){

    saveKewpa19CurrentStep();

    if(
        kewpa19CurrentStep <
        kewpa19TotalStep
    ){

        kewpa19CurrentStep++;

        updateKewpa19Wizard();

    }

}

function previousKewpa19Step(){

    saveKewpa19CurrentStep();

    if(kewpa19CurrentStep > 1){

        kewpa19CurrentStep--;

        updateKewpa19Wizard();

    }

}

/* ==========================================
   GENERATE KEW.PA-19 BORANG NUMBER
========================================== */

async function generateKewpa19BorangNo(){

    const year =
    new Date().getFullYear();

    const counterReference =
    db
    .collection("counters")
    .doc(`kewpa19-${year}`);


    const borangNo =
    await db.runTransaction(
        async transaction=>{

            const counterSnapshot =
            await transaction.get(
                counterReference
            );

            let nextNumber = 1;

            if(counterSnapshot.exists){

                nextNumber =
                Number(
                    counterSnapshot
                    .data()
                    .lastNumber || 0
                ) + 1;

            }


            transaction.set(
                counterReference,
                {

                    formType:
                    "KEW.PA-19",

                    year:
                    year,

                    lastNumber:
                    nextNumber,

                    updatedAt:
                    firebase.firestore
                    .FieldValue
                    .serverTimestamp()

                },
                {
                    merge: true
                }
            );


            return (
                `KEWPA19-${year}-` +
                String(nextNumber)
                .padStart(4,"0")
            );

        }
    );


    return borangNo;

}

/* ==========================================
   SAVE KEW.PA-19 TO FIRESTORE
========================================== */

async function saveKewpa19ToFirestore(){

    const saveButton =
    document.getElementById("saveKewpa19Btn");

    try{

        saveKewpa19CurrentStep();

        const user =
        firebase.auth().currentUser;

        if(!user){

            alert(
                "Sesi pengguna tidak dijumpai. Sila log masuk semula."
            );

            return;

        }

        if(!kewpa19State.jabatan.nama.trim()){

            alert(
                "Sila lengkapkan nama Kementerian atau Jabatan."
            );

            kewpa19CurrentStep = 1;

            updateKewpa19Wizard();

            return;

        }

        if(!kewpa19State.aset.noSiri.trim()){

            alert(
                "Sila lengkapkan No. Siri Pendaftaran Aset."
            );

            kewpa19CurrentStep = 2;

            updateKewpa19Wizard();

            return;

        }

        if(saveButton){

            saveButton.disabled = true;

            saveButton.innerHTML =
            "⏳ Sedang Menyimpan...";

        }

        const recordData = {

            formType: "KEW.PA-19",

            formTitle:
            "Perakuan Pelupusan (PEP) Aset Alih Kerajaan",

            jabatan: {
                ...kewpa19State.jabatan
            },

            aset: {
                ...kewpa19State.aset
            },

            penilaian: {
                ...kewpa19State.penilaian
            },

            laporan: {

                penambahbaikan: [
                    ...(
                        kewpa19State.laporan
                        .penambahbaikan || []
                    )
                ],

                pemeriksaan: [
                    ...(
                        kewpa19State.laporan
                        .pemeriksaan || []
                    )
                ]

            },

            pemeriksa: {

                pertama: {
                    ...(
                        kewpa19State.pemeriksa
                        .pertama || {}
                    )
                },

                kedua: {
                    ...(
                        kewpa19State.pemeriksa
                        .kedua || {}
                    )
                }

            },

            createdBy: user.uid,

            createdByEmail:
            user.email || "",

            updatedAt:
            firebase.firestore
            .FieldValue
            .serverTimestamp()

        };

        /* ================= EDIT EXISTING ================= */

        if(
            window.kewpa19EditMode === true &&
            window.kewpa19RecordId
        ){

            await db
            .collection("kewpa19")
            .doc(window.kewpa19RecordId)
            .update({

                ...recordData,

                updatedAt:
                firebase.firestore
                .FieldValue
                .serverTimestamp()

            });

            alert(
                "Rekod KEW.PA-19 berjaya dikemas kini."
            );

        }

       /* ================= CREATE NEW ================= */

else{

    const borangNo =
    await generateKewpa19BorangNo();

    await db
    .collection("kewpa19")
    .doc(borangNo)
    .set({

        ...recordData,

        borangNo:
        borangNo,

        createdAt:
        firebase.firestore
        .FieldValue
        .serverTimestamp()

    });

    window.kewpa19RecordId =
    borangNo;

    window.kewpa19EditMode = true;

    alert(

        "✅ Rekod KEW.PA-19 berjaya disimpan.\n\n" +

        "No. Borang : " +

        borangNo

    );

}

        console.log(
            "KEW.PA-19 berjaya disimpan:",
            window.kewpa19RecordId
        );

    }catch(error){

        console.error(
            "Ralat menyimpan KEW.PA-19:",
            error
        );

        alert(
            "Rekod gagal disimpan. Sila semak sambungan internet atau Firestore Rules."
        );

    }finally{

        if(saveButton){

            saveButton.disabled = false;

            saveButton.innerHTML =
            "💾 Simpan KEW.PA-19";

        }

    }

}

/* ==========================================
   EDIT KEW.PA-19 RECORD
========================================== */

async function editKewpa19Record(recordId){

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

        /*
        ==========================================
        SET EDIT MODE
        ==========================================
        */

        window.kewpa19EditMode = true;

        window.kewpa19RecordId =
        recordId;

        /*
        ==========================================
        MASUKKAN DATA KE DALAM STATE
        ==========================================
        */

        kewpa19State.jabatan = {

            nama:
            data.jabatan?.nama || "",

            alamat:
            data.jabatan?.alamat || ""

        };

        kewpa19State.aset = {

            noSiri:
            data.aset?.noSiri || "",

            kodifikasi:
            data.aset?.kodifikasi || "",

            jenisJenamaModel:
            data.aset?.jenisJenamaModel || "",

            noChassis:
            data.aset?.noChassis || "",

            noEnjin:
            data.aset?.noEnjin || "",

            noPendaftaran:
            data.aset?.noPendaftaran || "",

            tarikhPerolehan:
            data.aset?.tarikhPerolehan || "",

            nilaiPerolehan:
            data.aset?.nilaiPerolehan || ""

        };

        kewpa19State.penilaian = {

            jarak:
            data.penilaian?.jarak || "",

            tempohPenggunaan:
            data.penilaian?.tempohPenggunaan || "",

            prestasi:
            data.penilaian?.prestasi || "",

            kosTerdahulu:
            data.penilaian?.kosTerdahulu || "",

            nilaiSemasa:
            data.penilaian?.nilaiSemasa || "",

            kosSemasa:
            data.penilaian?.kosSemasa || "",

            nilaiSelepasBaiki:
            data.penilaian?.nilaiSelepasBaiki || "",

            usiaGuna:
            data.penilaian?.usiaGuna || ""

        };

        kewpa19State.laporan = {

            penambahbaikan:
            Array.isArray(
                data.laporan?.penambahbaikan
            )
            ? [
                ...data.laporan.penambahbaikan
              ]
            : ["","",""],

            pemeriksaan:
            Array.isArray(
                data.laporan?.pemeriksaan
            )
            ? [
                ...data.laporan.pemeriksaan
              ]
            : ["","",""]

        };

        kewpa19State.pemeriksa = {

            pertama: {

                nama:
                data.pemeriksa?.pertama?.nama || "",

                jawatan:
                data.pemeriksa?.pertama?.jawatan || "",

                tarikh:
                data.pemeriksa?.pertama?.tarikh || "",

                cap:
                data.pemeriksa?.pertama?.cap || ""

            },

            kedua: {

                nama:
                data.pemeriksa?.kedua?.nama || "",

                jawatan:
                data.pemeriksa?.kedua?.jawatan || "",

                tarikh:
                data.pemeriksa?.kedua?.tarikh || "",

                cap:
                data.pemeriksa?.kedua?.cap || ""

            }

        };

        /*
        ==========================================
        BUKA BORANG
        ==========================================
        */

        await loadForm("kewpa19");

        /*
        ==========================================
        MULAKAN PADA LANGKAH 1
        ==========================================
        */

        kewpa19CurrentStep = 1;

        updateKewpa19Wizard();

        console.log(
            "Mod edit KEW.PA-19:",
            recordId
        );

    }catch(error){

        console.error(
            "Ralat membuka edit KEW.PA-19:",
            error
        );

        alert(
            "Rekod KEW.PA-19 gagal dibuka untuk dikemas kini."
        );

    }

}

function populateKewpa19Print(){

    const data =
    window.currentPrintKewpa19;

    if(!data) return;

    const formatTarikhKewpa19 = (value)=>{

    if(!value) return "";

    const date = new Date(value);

    if(Number.isNaN(date.getTime())){

        return value;

    }

    return date.toLocaleDateString(
        "ms-MY",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

};

const formatWangKewpa19 = (value)=>{

    if(
        value === undefined ||
        value === null ||
        value === ""
    ){

        return "";

    }

    const number =
    Number(
        String(value)
        .replace(/RM/gi,"")
        .replace(/,/g,"")
        .trim()
    );

    if(Number.isNaN(number)){

        return value;

    }

    return number.toLocaleString(
        "ms-MY",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

};

    const set = (id,value)=>{

        const el =
        document.getElementById(id);

        if(el){

            el.innerHTML = value || "";

        }

    };

    /* ================= JABATAN ================= */

    set(
        "printKewpa19Jabatan",
        data.jabatan?.nama
    );

    set(
        "printKewpa19Alamat",
        data.jabatan?.alamat
    );

    /* ================= ASET ================= */

    set(
        "printKewpa19NoSiri",
        data.aset?.noSiri
    );

    set(
        "printKewpa19Kodifikasi",
        data.aset?.kodifikasi
    );

    set(
        "printKewpa19JenisJenamaModel",
        data.aset?.jenisJenamaModel
    );

    set(
        "printKewpa19NoChassis",
        data.aset?.noChassis
    );

    set(
        "printKewpa19NoEnjin",
        data.aset?.noEnjin
    );

    set(
        "printKewpa19NoPendaftaran",
        data.aset?.noPendaftaran
    );

    set(
        "printKewpa19TarikhPerolehan",
        formatTarikhKewpa19(
            data.aset?.tarikhPerolehan
        )
    );

    set(
        "printKewpa19NilaiPerolehan",
        formatWangKewpa19(
            data.aset?.nilaiPerolehan
        )
    );

    /* ================= PENILAIAN ================= */

    set(
        "printKewpa19JarakTempoh",
        `${data.penilaian?.jarak || ""} / ${data.penilaian?.tempohPenggunaan || ""}`
    );

    set(
        "printKewpa19Prestasi",
        data.penilaian?.prestasi
    );

    set(
        "printKewpa19KosTerdahulu",
        data.penilaian?.kosTerdahulu
    );

    set(
        "printKewpa19NilaiSemasa",
        data.penilaian?.nilaiSemasa
    );

    set(
        "printKewpa19KosSemasa",
        data.penilaian?.kosSemasa
    );

    set(
        "printKewpa19NilaiSelepasBaiki",
        data.penilaian?.nilaiSelepasBaiki
    );

    set(
        "printKewpa19UsiaGuna",
        data.penilaian?.usiaGuna
    );

    /* ================= PENAMBAHBAIKAN ================= */

    set(
        "printKewpa19TambahBaik1",
        data.laporan?.penambahbaikan?.[0]
    );

    set(
        "printKewpa19TambahBaik2",
        data.laporan?.penambahbaikan?.[1]
    );

    set(
        "printKewpa19TambahBaik3",
        data.laporan?.penambahbaikan?.[2]
    );

    /* ================= LAPORAN ================= */

    set(
        "printKewpa19Laporan1",
        data.laporan?.pemeriksaan?.[0]
    );

    set(
        "printKewpa19Laporan2",
        data.laporan?.pemeriksaan?.[1]
    );

    set(
        "printKewpa19Laporan3",
        data.laporan?.pemeriksaan?.[2]
    );

    /* ================= PEMERIKSA 1 ================= */

    set(
        "printKewpa19Pemeriksa1Nama",
        data.pemeriksa?.pertama?.nama
    );

    set(
        "printKewpa19Pemeriksa1Jawatan",
        data.pemeriksa?.pertama?.jawatan
    );

    set(
        "printKewpa19Pemeriksa1Tarikh",
        formatTarikhKewpa19(
            data.pemeriksa?.pertama?.tarikh
        )
    );

    set(
        "printKewpa19Pemeriksa1Cap",
        data.pemeriksa?.pertama?.cap
    );

    /* ================= PEMERIKSA 2 ================= */

    set(
        "printKewpa19Pemeriksa2Nama",
        data.pemeriksa?.kedua?.nama
    );

    set(
        "printKewpa19Pemeriksa2Jawatan",
        data.pemeriksa?.kedua?.jawatan
    );

    set(
        "printKewpa19Pemeriksa2Tarikh",
        formatTarikhKewpa19(
            data.pemeriksa?.kedua?.tarikh
        )
    );  

    set(
        "printKewpa19Pemeriksa2Cap",
        data.pemeriksa?.kedua?.cap
    );

}

/* ==========================================
   PRINT KEW.PA-19
========================================== */

async function printKewpa19Record(recordId){

    try{

        const doc =
        await db
        .collection("kewpa19")
        .doc(recordId)
        .get();

        if(!doc.exists){

            alert("Rekod tidak dijumpai.");

            return;

        }

        window.currentPrintKewpa19 =
        doc.data();

        await loadForm("kewpa19-print");

        setTimeout(()=>{

            populateKewpa19Print();

        },200);

    }

    catch(error){

        console.error(error);

        alert("Gagal membuka paparan cetakan.");

    }

}

/* ==========================================
   BUTTON EVENTS
========================================== */

document.addEventListener(
    "click",
    event=>{

        if(
            event.target.id ===
            "kewpa19NextBtn"
        ){

            nextKewpa19Step();

        }

        if(
            event.target.id ===
            "kewpa19PrevBtn"
        ){

            previousKewpa19Step();

        }

        if(
            event.target.id ===
            "saveKewpa19Btn"
        ){

            saveKewpa19ToFirestore();

        }

    }
);