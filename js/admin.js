/* ==========================================
   ADMIN DASHBOARD
========================================== */

async function loadAdminDashboard(){

    try{

        /* ================= USERS ================= */

        const users =
        await db.collection("users").get();

        document.getElementById(
            "totalUsers"
        ).textContent =
        users.size;

        /* ================= FORMS ================= */

        const forms =
        await db.collection("forms").get();

        const kewpa3 =
        await db.collection("kewpa3").get();

        const kewpa19 =
        await db.collection("kewpa19").get();

        const totalForms =

            forms.size +

            kewpa3.size +

            kewpa19.size;

        document.getElementById(
            "totalForms"
        ).textContent =
        totalForms;

    }

    catch(error){

        console.error(error);

    }

}

async function loadAdminUsers(){

    try{

        const snapshot =
        await db
        .collection("users")
        .orderBy("createdAt","desc")
        .get();

        const table =
        document.getElementById("userTable");

        if(!table) return;

        table.innerHTML = "";

        let totalUsers = 0;
        let totalAdmin = 0;
        let totalTeacher = 0;
        let totalActive = 0;

        snapshot.forEach(doc=>{

            const user =
            doc.data();

            totalUsers++;

if(user.role === "admin"){

    totalAdmin++;

}
else{

    totalTeacher++;

}

/* Buat masa ini semua pengguna dalam Firestore
   dianggap aktif */

totalActive++;

            let roleBadge =
            `
            <span
            class="px-3 py-1 rounded-full
            bg-slate-700
            text-slate-300">

                User

            </span>
            `;

            if(user.role==="admin"){

                roleBadge =
                `
                <span
                class="px-3 py-1 rounded-full
                bg-amber-500/20
                text-amber-400
                font-bold">

                    👑 Admin

                </span>
                `;

            }

            const loginDate =
            user.lastLogin
            ? user.lastLogin.toDate().toLocaleString("ms-MY")
            : "-";

            table.innerHTML += `

<tr class="border-t border-slate-800">

    <td class="p-4 text-white">

        ${user.nama || "-"}

    </td>

    <td class="p-4 text-slate-300">

        ${user.email || "-"}

    </td>

    <td class="p-4 text-center">

        ${roleBadge}

    </td>

    <td class="p-4 text-center text-slate-400">

        ${loginDate}

    </td>

</tr>

`;

        });

        const totalUserElement =
document.getElementById("totalUserCount");

if(totalUserElement){

    totalUserElement.textContent =
    totalUsers;

}

const totalAdminElement =
document.getElementById("totalAdminCount");

if(totalAdminElement){

    totalAdminElement.textContent =
    totalAdmin;

}

const totalTeacherElement =
document.getElementById("totalTeacherCount");

if(totalTeacherElement){

    totalTeacherElement.textContent =
    totalTeacher;

}

const totalActiveElement =
document.getElementById("activeUserCount");

if(totalActiveElement){

    totalActiveElement.textContent =
    totalActive;

}

    }

    catch(error){

        console.error(error);

    }

}

