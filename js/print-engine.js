/* ==========================================
   PTIS DIGITAL FORM
   PRINT ENGINE V1
========================================== */

/* ================= OPEN PRINT ================= */

async function openPrint(form,data){

    window.currentPrintData = data;

    await loadPrintTemplate(

        `${form}-print.html`

    );

    setTimeout(()=>{

        loadPrintData();

    },150);

}

/* ================= LOAD TEMPLATE ================= */

async function loadPrintTemplate(file){

    try{

        const response =
        await fetch(`forms/${file}`);

        const html =
        await response.text();

        document
        .getElementById("content")
        .innerHTML = html;

    }

    catch(error){

        console.error(error);

    }

}

/* ================= LOAD PRINT DATA ================= */

function loadPrintData(){

    const data =
    window.currentPrintData;

    if(!data) return;

    // ================= HEADER =================

    setValue(
        "printFormNo",
        data.id
    );

    // ================= PEMOHON =================

    setValue(
        "printNama",
        data.pemohon?.nama
    );

    setValue(
        "printTelefon",
        data.pemohon?.telefon
    );

    setValue(
        "printJawatan",
        data.pemohon?.jawatan
    );

    setValue(
        "printBahagian",
        data.pemohon?.bahagian
    );

    // ================= PERMOHONAN =================

    setValue(
        "printTujuan",
        data.permohonan?.tujuan
    );

    setValue(
        "printTempat",
        data.permohonan?.tempat
    );

    setValue(
        "printTarikhPinjam",
        data.permohonan?.tarikhPinjam
    );

    setValue(
        "printTarikhPulang",
        data.permohonan?.tarikhPulang
    );

    // ================= PEGAWAI =================

    setValue(
        "printNamaPengeluar",
        data.pegawai?.namaPengeluar
    );

    setValue(
        "printNamaPeminjam",
        data.pemohon?.nama
    );

    setValue(
        "printJawatanPeminjam",
        data.pemohon?.jawatan
    );

    setValue(
        "printTarikhPinjamSign",
        formatPrintDate(
        data.permohonan?.tarikhPinjam
        )
    );

    setValue(
        "printNamaPelulus",
        data.pegawai?.namaPelulus
    );

    setValue(
        "printJawatanPelulus",
        data.pegawai?.jawatanPelulus
    );

    // ================= ASET =================

    loadAssetTable(
        data.aset || [],
        data.permohonan?.tarikhPinjam || "",
        data.permohonan?.tarikhPulang || ""
    );

}

/* ================= LOAD ASSET ================= */

function loadAssetTable(aset, tarikhPinjam, tarikhPulang) {

    for (let i = 1; i <= 6; i++) {

        setValue(`assetSiri${i}`, "");

        setValue(`assetNama${i}`, "");

    }

    aset.slice(0, 6).forEach((item, index) => {

        const row = index + 1;

        let siri = item.noSiri || "";

/* Jika terlalu panjang */

if(siri.length > 18){

    const index =
    siri.indexOf("/",12);

    if(index !== -1){

        siri =
        siri.substring(0,index+1)
        +
        "<br>"
        +
        siri.substring(index+1);

    }

}

document.getElementById(
`assetSiri${row}`
).innerHTML = siri;

        setValue(
            `assetNama${row}`,
            item.keterangan || ""
        );

    });

    setValue(
        "printTarikhPinjam",
        formatPrintDate(tarikhPinjam)
    );

    setValue(
        "printTarikhPulang",
        formatPrintDate(tarikhPulang)
    );

}

/* ================= SET VALUE ================= */

function setValue(id,value){

    const el =
    document.getElementById(id);

    if(el){

        el.innerHTML =
        (value || "")
        .replace(/\n/g," ");

    }

}

/* ================= FORMAT DATE ================= */

function formatPrintDate(value) {

    if (!value) return "";

    const parts = value.split("-");

    if (parts.length !== 3) return value;

    return `${parts[2]}/${parts[1]}/${parts[0]}`;

}

/* ================= PRINT NOW ================= */

function printNow() {

    window.print();

}