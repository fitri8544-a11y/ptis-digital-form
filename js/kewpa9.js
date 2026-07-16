function loadCurrentStep() {

    const container =
    document.getElementById("wizardContent");

    switch(currentStep){

        // ================= STEP 1 =================

        case 1:

        container.innerHTML = `

        <div class="space-y-8">

            <div>

                <h2 class="text-3xl font-black">

                    👤 Maklumat Pemohon

                </h2>

                <p class="text-slate-400 mt-2">

                    Sila lengkapkan maklumat pemohon.

                </p>

            </div>

            <div class="grid md:grid-cols-2 gap-6">

                <div>

                    <label class="form-label">

                        Nama Pemohon

                    </label>

                    <input
                    id="namaPemohon"
                    class="form-input"
                    type="text">

                </div>

                <div>

                    <label class="form-label">

                        Jawatan

                    </label>

                    <input
                    id="jawatan"
                    class="form-input"
                    type="text">

                </div>

                <div>

                    <label class="form-label">

                        Bahagian / Sekolah

                    </label>

                    <input
                    id="bahagian"
                    class="form-input"
                    type="text">

                </div>

                <div>

                    <label class="form-label">

                        No Telefon

                    </label>

                    <input
                    id="telefon"
                    class="form-input"
                    type="text">

                </div>

                <div class="md:col-span-2">

                    <label class="form-label">

                        Emel

                    </label>

                    <input
                    id="email"
                    class="form-input bg-slate-800"
                    type="email"
                    readonly>

                </div>

            </div>

        </div>

        `;

        break;

        // ================= STEP 2 =================

case 2:

container.innerHTML = `

<div class="space-y-8">

    <div>

        <h2 class="text-3xl font-black">

            📄 Maklumat Permohonan

        </h2>

        <p class="text-slate-400 mt-2">

            Maklumat tujuan dan lokasi penggunaan aset.

        </p>

    </div>

    <div class="grid md:grid-cols-2 gap-6">

        <!-- TUJUAN -->

        <div class="md:col-span-2">

            <label class="form-label">

                Tujuan Pergerakan / Pinjaman

            </label>

            <textarea
            id="tujuan"
            class="form-textarea"
            rows="4"
            placeholder="Nyatakan tujuan permohonan..."></textarea>

        </div>

        <!-- TEMPAT -->

        <div class="md:col-span-2">

            <label class="form-label">

                Tempat Digunakan

            </label>

            <input
            id="tempat"
            class="form-input"
            type="text"
            placeholder="Contoh : Makmal Komputer SK Kuala Ketil">

        </div>

        <!-- TARIKH PINJAM -->

        <div>

            <label class="form-label">

                Tarikh Pinjaman

            </label>

            <input
            id="tarikhPinjam"
            class="form-input"
            type="date">

        </div>

        <!-- TARIKH PULANG -->

        <div>

            <label class="form-label">

                Tarikh Dijangka Pulang

            </label>

            <input
            id="tarikhPulang"
            class="form-input"
            type="date">

        </div>

    </div>

</div>

`;

break;

         // ================= STEP 3 =================

case 3:

container.innerHTML = `

<div class="space-y-8">

    <div>

        <h2 class="text-3xl font-black">

            💻 Senarai Aset

        </h2>

        <p class="text-slate-400 mt-2">

            Tambahkan semua aset yang ingin dipinjam atau dipindahkan.

        </p>

    </div>

    <div class="flex justify-end">

        <button
        id="addAssetBtn"
        type="button"
        class="btn-primary">

            ➕ Tambah Aset

        </button>

    </div>

    <div
    id="assetContainer"
    class="space-y-4">

    </div>

</div>

`;

setTimeout(()=>{

    restoreAssetList();

},100);

break;       

        // ================= STEP 4 =================

case 4:

container.innerHTML = `

<div class="space-y-8">

    <div>

        <h2 class="text-3xl font-black">

            👨‍💼 Maklumat Pegawai

        </h2>

        <p class="text-slate-400 mt-2">

            Maklumat pegawai yang mengeluarkan aset dan pegawai yang meluluskan permohonan.

        </p>

    </div>

    <!-- Pegawai Pengeluar -->

    <div class="asset-card">

        <h3 class="text-xl font-bold mb-6">

            📦 Pegawai Pengeluar

        </h3>

        <div class="grid md:grid-cols-2 gap-6">

            <div>

                <label class="form-label">

                    Nama Pegawai Pengeluar

                </label>

                <input
                id="namaPengeluar"
                class="form-input"
                type="text">

            </div>

            <div>

                <label class="form-label">

                    Jawatan

                </label>

                <input
                id="jawatanPengeluar"
                class="form-input"
                type="text">

            </div>

        </div>

    </div>

    <!-- Pegawai Pelulus -->

    <div class="asset-card">

        <h3 class="text-xl font-bold mb-6">

            ✅ Pegawai Pelulus

        </h3>

        <div class="grid md:grid-cols-2 gap-6">

            <div>

                <label class="form-label">

                    Nama Pegawai Pelulus

                </label>

                <input
                id="namaPelulus"
                class="form-input"
                type="text">

            </div>

            <div>

                <label class="form-label">

                    Jawatan

                </label>

                <input
                id="jawatanPelulus"
                class="form-input"
                type="text">

            </div>

        </div>

    </div>

</div>

`;

break;

        // ================= STEP 5 =================

case 5:

container.innerHTML = `

<div class="space-y-8">

    <div>

        <h2 class="text-3xl font-black">

            ✅ Semakan Permohonan

        </h2>

        <p class="text-slate-400 mt-2">

            Sila semak semua maklumat sebelum permohonan disimpan.

        </p>

    </div>

    <!-- Maklumat Pemohon -->

    <div class="review-card">

        <h3 class="review-title">

            👤 Maklumat Pemohon

        </h3>

        <div id="reviewPemohon">

            Maklumat akan dipaparkan di sini.

        </div>

    </div>

    <!-- Maklumat Permohonan -->

    <div class="review-card">

        <h3 class="review-title">

            📄 Maklumat Permohonan

        </h3>

        <div id="reviewPermohonan">

            Maklumat akan dipaparkan di sini.

        </div>

    </div>

    <!-- Senarai Aset -->

    <div class="review-card">

        <h3 class="review-title">

            💻 Senarai Aset

        </h3>

        <div id="reviewAsset">

            Senarai aset akan dipaparkan di sini.

        </div>

    </div>

    <!-- Pegawai -->

    <div class="review-card">

        <h3 class="review-title">

            👨‍💼 Maklumat Pegawai

        </h3>

        <div id="reviewPegawai">

            Maklumat pegawai akan dipaparkan di sini.

        </div>

    </div>

    <!-- BUTTON -->

    <div class="flex flex-wrap gap-4 justify-end">

        <button
        id="editBtn"
        type="button"
        class="btn-secondary">

            ✏️ Kembali & Edit

        </button>

        <button
        id="saveBtn"
        type="button"
        class="btn-success">

            💾 Simpan Permohonan

        </button>

        <button
        id="printBtn"
        type="button"
        class="btn-primary">

            🖨️ Cetak Borang

        </button>

    </div>

</div>

`;

break;
    }

}

/* =====================================
   SENARAI ASET
===================================== */

let assetCount = 0;

function tambahAset(){

    assetCount++;

    const container =
    document.getElementById("assetContainer");

    container.insertAdjacentHTML(

        "beforeend",

        `

        <div
        class="asset-card"
        id="asset-${assetCount}">

            <div class="grid lg:grid-cols-12 gap-4">

                <div class="lg:col-span-3">

                    <label class="form-label">

                        No Siri

                    </label>

                    <input
                    class="form-input"
                    type="text">

                </div>

                <div class="lg:col-span-5">

                    <label class="form-label">

                        Keterangan Aset

                    </label>

                    <input
                    class="form-input"
                    type="text">

                </div>

                <div class="lg:col-span-2">

                    <label class="form-label">

                        Kuantiti

                    </label>

                    <input
                    class="form-input"
                    type="number"
                    value="1"
                    min="1">

                </div>

                <div
                class="lg:col-span-2
                flex
                items-end">

                    <button
                    type="button"
                    class="btn-delete"
                    onclick="deleteAsset(${assetCount})">

                        🗑 Padam

                    </button>

                </div>

            </div>

        </div>

        `

    );

}

/* ================= DELETE ================= */

function deleteAsset(id){

    document
    .getElementById(`asset-${id}`)
    ?.remove();

}

document.addEventListener(

    "click",

    e=>{

        if(e.target.id==="addAssetBtn"){

            tambahAset();

        }

    }

);

/* ==========================================
   GET ASSET LIST
========================================== */

function getAssetList(){

    const assets = [];

    document.querySelectorAll(".asset-card").forEach(card=>{

        const input = card.querySelectorAll("input");

        if(input.length >= 3){

            assets.push({

                noSiri: input[0].value,

                keterangan: input[1].value,

                kuantiti: input[2].value

            });

        }

    });

    return assets;

}

/* ==========================================
   RESTORE ASSET LIST
========================================== */

function restoreAssetList(){

    const container =
    document.getElementById("assetContainer");

    if(!container) return;

    container.innerHTML = "";

    assetCount = 0;

    if(formState.aset.length === 0){

        tambahAset();

        return;

    }

    formState.aset.forEach(asset=>{

        tambahAset();

        const card =
        document.getElementById(`asset-${assetCount}`);

        const input =
        card.querySelectorAll("input");

        input[0].value = asset.noSiri || "";

        input[1].value = asset.keterangan || "";

        input[2].value = asset.kuantiti || 1;

    });

}

/* ==========================================
   LOAD EXISTING RECORD
========================================== */

function loadExistingRecord(){

    if(!window.currentRecord) return;

    const data =
    window.currentRecord;

    // STEP 1

    if(document.getElementById("namaPemohon")){

        document.getElementById("namaPemohon").value =
        data.pemohon?.nama || "";

        document.getElementById("jawatan").value =
        data.pemohon?.jawatan || "";

        document.getElementById("bahagian").value =
        data.pemohon?.bahagian || "";

        document.getElementById("telefon").value =
        data.pemohon?.telefon || "";

        document.getElementById("email").value =
        data.pemohon?.email || "";

    }

}

/* ==========================================
   POPULATE FORM
========================================== */

function populateForm(){

    if(!window.currentRecord) return;

    fillPemohon();

    fillPermohonan();

    fillAsset();

    fillPegawai();

}

/* ==========================================
   FILL PEMOHON
========================================== */

function fillPemohon(){

    const data =
    window.currentRecord;

    if(!document.getElementById("namaPemohon")) return;

    document.getElementById("namaPemohon").value =
    data.pemohon?.nama || "";

    document.getElementById("jawatan").value =
    data.pemohon?.jawatan || "";

    document.getElementById("bahagian").value =
    data.pemohon?.bahagian || "";

    document.getElementById("telefon").value =
    data.pemohon?.telefon || "";

    document.getElementById("email").value =
    data.pemohon?.email || "";

}

/* ==========================================
   FILL ASSET
========================================== */

function fillAsset(){

    const data =
    window.currentRecord;

    if(!data?.aset) return;

    const container =
    document.getElementById("assetContainer");

    if(!container) return;

    container.innerHTML = "";

    assetCount = 0;

    data.aset.forEach(asset=>{

        tambahAset();

        const card =
        document.getElementById(`asset-${assetCount}`);

        if(!card) return;

        const input =
        card.querySelectorAll("input");

        input[0].value =
        asset.noSiri || "";

        input[1].value =
        asset.keterangan || "";

        input[2].value =
        asset.kuantiti || 1;

    });

}

/* ==========================================
   FILL PEGAWAI
========================================== */

function fillPegawai(){

    const data =
    window.currentRecord;

    if(!document.getElementById("namaPengeluar")) return;

    document.getElementById("namaPengeluar").value =
    data.pegawai?.namaPengeluar || "";

    document.getElementById("jawatanPengeluar").value =
    data.pegawai?.jawatanPengeluar || "";

    document.getElementById("namaPelulus").value =
    data.pegawai?.namaPelulus || "";

    document.getElementById("jawatanPelulus").value =
    data.pegawai?.jawatanPelulus || "";

}
