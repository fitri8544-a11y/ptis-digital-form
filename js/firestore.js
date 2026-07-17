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
   LOAD MY RECORDS
========================================== */

async function loadMyRecords(){

    const table =
    document.getElementById("recordTable");

    if(!table) return;

    table.innerHTML = `

        <tr>

            <td
            colspan="5"
            class="py-10 text-center text-slate-400">

                Memuatkan data...

            </td>

        </tr>

    `;

    try{

        const currentUser =
        auth.currentUser;

        if(!currentUser){

            table.innerHTML = `

                <tr>

                    <td
                    colspan="5"
                    class="py-10 text-center text-red-300">

                        Sesi pengguna tidak dijumpai.
                        Sila log masuk semula.

                    </td>

                </tr>

            `;

            return;

        }

        const email =
        currentUser.email;

        /*
        ==========================================
        AMBIL REKOD KEW.PA-9 DAN KEW.PA-19
        ==========================================
        */

        const [
            kewpa9Snapshot,
            kewpa19Snapshot
        ] = await Promise.all([

            db
            .collection("forms")
            .where(
                "user.email",
                "==",
                email
            )
            .get(),

            db
            .collection("kewpa19")
            .where(
                "createdByEmail",
                "==",
                email
            )
            .get()

        ]);

        const records = [];

        /* ================= KEW.PA-9 ================= */

        kewpa9Snapshot.forEach(doc=>{

            const data =
            doc.data();

            records.push({

                id: doc.id,

                collection:
                "forms",

                formType:
                data.formType ||
                "KEW.PA-9",

                status:
                data.status ||
                "Pending",

                createdAt:
                data.createdAt || null,

                data: data

            });

        });

        /* ================= KEW.PA-19 ================= */

        kewpa19Snapshot.forEach(doc=>{

            const data =
            doc.data();

            records.push({

                id: doc.id,

                collection:
                "kewpa19",

                formType:
                data.formType ||
                "KEW.PA-19",

                status:
                data.status ||
                "DRAF",

                createdAt:
                data.createdAt || null,

                data: data

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

        table.innerHTML = "";

        let total = 0;
        let pending = 0;
        let approved = 0;
        let rejected = 0;

        records.forEach(record=>{

            total++;

            const normalizedStatus =
            String(
                record.status || ""
            ).toUpperCase();

            if(
                normalizedStatus === "PENDING" ||
                normalizedStatus === "DRAF"
            ){

                pending++;

            }

            if(
                normalizedStatus === "APPROVED" ||
                normalizedStatus === "DILULUSKAN"
            ){

                approved++;

            }

            if(
                normalizedStatus === "REJECTED" ||
                normalizedStatus === "DITOLAK"
            ){

                rejected++;

            }

            const displayDate =
            formatRecordDate(
                record.createdAt
            );

            const statusBadge =
            getRecordStatusBadge(
                record.status
            );

            const canEdit =
            normalizedStatus === "PENDING" ||
            normalizedStatus === "DRAF";

            table.innerHTML += `

                <tr
                class="
                border-b
                border-slate-800
                hover:bg-white/[0.02]
                transition">

                    <!-- NO. REKOD -->

                    <td class="py-4 font-bold">

                        ${escapeRecordHTML(record.id)}

                    </td>

                    <!-- JENIS BORANG -->

                    <td class="py-4">

                        <div class="font-bold text-white">

                            ${escapeRecordHTML(record.formType)}

                        </div>

                        <div class="text-xs text-slate-500 mt-1">

                            ${
                                record.collection === "kewpa19"
                                ? "Perakuan Pelupusan Aset"
                                : "Permohonan Pergerakan / Pinjaman Aset"
                            }

                        </div>

                    </td>

                    <!-- TARIKH -->

                    <td class="py-4">

                        ${displayDate}

                    </td>

                    <!-- STATUS -->

                    <td class="py-4">

                        ${statusBadge}

                    </td>

                    <!-- TINDAKAN -->

                    <td class="py-4">

                        <div
                        class="
                        flex
                        flex-wrap
                        items-center
                        gap-3">

                            <button
                            type="button"
                            class="
                            text-cyan-400
                            hover:text-cyan-300
                            font-semibold"
                            onclick="
                            viewMyRecord(
                                '${record.collection}',
                                '${record.id}'
                            )">

                                👁 Lihat

                            </button>

                            ${
                                canEdit
                                ? `

                                <button
                                type="button"
                                class="
                                text-amber-400
                                hover:text-amber-300
                                font-semibold"
                                onclick="
                                editMyRecord(
                                    '${record.collection}',
                                    '${record.id}'
                                )">

                                    ✏️ Edit

                                </button>

                                `
                                : ""
                            }

                            <button
                            type="button"
                            class="
                            text-green-400
                            hover:text-green-300
                            font-semibold"
                            onclick="
                            printMyRecord(
                                '${record.collection}',
                                '${record.id}'
                            )">

                                🖨️ Cetak

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

        if(total === 0){

            table.innerHTML = `

                <tr>

                    <td
                    colspan="5"
                    class="py-10 text-center text-slate-400">

                        Tiada rekod borang ditemui.

                    </td>

                </tr>

            `;

        }

        setRecordCount(
            "totalForms",
            total
        );

        setRecordCount(
            "pendingForms",
            pending
        );

        setRecordCount(
            "approvedForms",
            approved
        );

        setRecordCount(
            "rejectedForms",
            rejected
        );

    }catch(error){

        console.error(
            "Ralat loadMyRecords:",
            error
        );

        table.innerHTML = `

            <tr>

                <td
                colspan="5"
                class="py-10 text-center text-red-300">

                    Rekod gagal dimuatkan.
                    Sila cuba semula.

                </td>

            </tr>

        `;

    }

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
        status || "DRAF"
    ).toUpperCase();

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

    if(normalizedStatus === "PENDING"){

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

    if(collectionName === "forms"){

        if(
            typeof viewRecord ===
            "function"
        ){

            viewRecord(recordId);

        }

        return;

    }

    if(collectionName === "kewpa19"){

        await viewKewpa19Record(
            recordId
        );

    }

}


/* ================= EDIT ================= */

async function editMyRecord(
    collectionName,
    recordId
){

    if(collectionName === "forms"){

        if(
            typeof editRecord ===
            "function"
        ){

            editRecord(recordId);

        }

        return;

    }

    if(collectionName === "kewpa19"){

        await editKewpa19Record(
            recordId
        );

    }

}


/* ================= PRINT ================= */

async function printMyRecord(
    collectionName,
    recordId
){

    if(collectionName === "forms"){

        printRecord(recordId);

        return;

    }

    if(collectionName === "kewpa19"){

        printKewpa19Record(recordId);

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