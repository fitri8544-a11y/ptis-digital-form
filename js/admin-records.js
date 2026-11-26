async function loadAdminRecords(){

    try{

        const table =
        document.getElementById(
            "adminRecordTable"
        );

        if(!table) return;

        table.innerHTML = "";

        /* ================= USER LIST ================= */

const usersSnapshot =
await db
.collection("users")
.get();

const userMap = {};

usersSnapshot.forEach(doc=>{

    const user =
    doc.data();

    if(user.email){

        userMap[
            user.email.toLowerCase()
        ] = user;

    }

});

        const collections = [

            {
                name:"forms",
                label:"KEW.PA-9"
            },

            {
                name:"kewpa3",
                label:"KEW.PA-3"
            },

            {
                name:"kewpa19",
                label:"KEW.PA-19"
            }

        ];

        for(const item of collections){

            const snapshot =
            await db
            .collection(item.name)
            .get();

            snapshot.forEach(doc=>{

                const data =
                doc.data();

                const email =

(

data.createdByEmail ||

data.user?.email ||

""

)

.toLowerCase();

const user =

userMap[email] || {};

                table.innerHTML += `

<tr class="border-t border-slate-800 hover:bg-slate-800/40 transition">

    <td class="p-4">

        ${item.label}

    </td>

    <td class="p-4 font-bold text-cyan-400">

        ${doc.id}

    </td>

    <td class="p-4">

        ${
    user.nama ||

    user.displayName ||

    data.createdByEmail ||

    data.user?.email ||

    "-"
}

    </td>

    <td class="p-4">

        ${
            data.createdAt
            ? data.createdAt
                .toDate()
                .toLocaleDateString("ms-MY")
            : "-"
        }

    </td>

    <td class="p-4">

        <div class="flex justify-center gap-2">

            <button

onclick="adminViewRecord(

'${item.name}',

'${doc.id}'

)"

class="

w-10
h-10
rounded-xl
bg-cyan-500/10
hover:bg-cyan-500/20
text-cyan-400
transition"

title="Lihat">

<i class="fa-solid fa-eye"></i>

</button>

            <button
            type="button"
            onclick="editMyRecord('${item.name}','${doc.id}')"
            class="w-10 h-10 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition"
            title="Edit">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
            type="button"
            onclick="printMyRecord('${item.name}','${doc.id}')"
            class="w-10 h-10 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 transition"
            title="Print">

                <i class="fa-solid fa-print"></i>

            </button>

            <button
            type="button"
            onclick="adminDeleteRecord('${item.name}','${doc.id}',this)"
            class="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
            title="Padam">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

    </td>

</tr>

`;

            });

        }

    }

    catch(error){

        console.error(error);

    }

}

/* ================= ADMIN VIEW ================= */

async function adminViewRecord(

    collection,

    recordId

){

    try{

        const doc =

        await db

        .collection(collection)

        .doc(recordId)

        .get();

        if(!doc.exists){

            alert(

                "Rekod tidak dijumpai."

            );

            return;

        }

        window.currentRecord =

        doc.data();

        window.currentRecord.id =

        recordId;

        /* ================= KEWPA9 ================= */

        if(collection==="forms"){

            await loadForm(

                "kewpa9"

            );

            return;

        }

        /* ================= KEWPA3 ================= */

        if(collection==="kewpa3"){

            await loadForm(

                "kewpa3"

            );

            return;

        }

        /* ================= KEWPA19 ================= */

        if(collection==="kewpa19"){

            await loadForm(

                "kewpa19"

            );

            return;

        }

    }

    catch(error){

        console.error(error);

    }

}
/* Delete the selected admin record and refresh this table. Firestore rules
   remain responsible for enforcing permissions on the server. */
const adminDeletesInProgress = new Set();

async function adminDeleteRecord(collectionName, recordId, button){
    if(window.currentUserRole !== "admin"){
        alert("Hanya pentadbir boleh memadam rekod melalui menu ini.");
        return;
    }
    const labels = {forms:"KEW.PA-9", kewpa3:"KEW.PA-3", kewpa19:"KEW.PA-19"};
    if(!Object.hasOwn(labels, collectionName) || !recordId){
        alert("Rekod yang dipilih tidak sah.");
        return;
    }
    const key = `${collectionName}/${recordId}`;
    if(adminDeletesInProgress.has(key)) return;
    if(!confirm(`PADAM REKOD ${labels[collectionName]}\n\nNo. Rekod: ${recordId}\n\nRekod ini akan dipadam secara kekal. Teruskan?`)) return;

    adminDeletesInProgress.add(key);
    if(button){
        button.disabled = true;
        button.setAttribute("aria-busy", "true");
    }
    try{
        await db.collection(collectionName).doc(recordId).delete();
        alert("Rekod berjaya dipadam.");
        // Avoid replacing another page if the user navigates during the request.
        if(document.getElementById("adminRecordTable")){
            await loadAdminRecords();
        }
    }catch(error){
        console.error("Ralat padam rekod pentadbir:", error);
        alert("Gagal memadam rekod.\n\n" + (error.message || "Sila cuba semula."));
    }finally{
        adminDeletesInProgress.delete(key);
        if(button){
            button.disabled = false;
            button.removeAttribute("aria-busy");
        }
    }
}
