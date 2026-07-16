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
            <td colspan="5"
            class="py-10 text-center text-slate-400">

                Memuatkan data...

            </td>
        </tr>
    `;

    try{

        const email =
        auth.currentUser.email;

        const snapshot =
        await db
        .collection("forms")
        .where("user.email","==",email)
        .orderBy("createdAt","desc")
        .get();

        table.innerHTML = "";

        let total = 0;
        let pending = 0;
        let approved = 0;
        let rejected = 0;

        snapshot.forEach(doc=>{

            total++;

             const data = doc.data();

            const formNumber = doc.id;

            if(data.status==="Pending") pending++;

            if(data.status==="Approved") approved++;

            if(data.status==="Rejected") rejected++;

            table.innerHTML += `

            <tr class="border-b border-slate-800">

                <td class="py-4 font-bold">

                    ${formNumber}

                </td>

                <td>

                    ${data.formType}

                </td>

                <td>

                    ${
                        data.createdAt
                        ? data.createdAt
                          .toDate()
                          .toLocaleDateString("ms-MY")
                        : "-"
                    }

                </td>

                <td class="space-x-3">

    <button
    class="text-cyan-400 hover:text-cyan-300 font-semibold"
    onclick="viewRecord('${doc.id}')">

        👁 Lihat

    </button>

    ${
        data.status==="Pending"
        ?

        `<button
        class="text-amber-400 hover:text-amber-300 font-semibold"
        onclick="editRecord('${doc.id}')">

            ✏️ Edit

        </button>`

        :

        ""
    }

    <button
    class="text-green-400 hover:text-green-300 font-semibold"
    onclick="printRecord('${doc.id}')">

        🖨️ Cetak

    </button>

</td>

            </tr>

            `;

        });

        if(total===0){

            table.innerHTML=`

            <tr>

                <td colspan="5"
                class="py-10 text-center text-slate-400">

                    Tiada rekod permohonan.

                </td>

            </tr>

            `;

        }

        document.getElementById("totalForms").textContent =
        total;

        document.getElementById("pendingForms").textContent =
        pending;

        document.getElementById("approvedForms").textContent =
        approved;

        document.getElementById("rejectedForms").textContent =
        rejected;

    }

    catch(error){

        console.error(error);

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