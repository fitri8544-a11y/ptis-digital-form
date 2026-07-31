/* ==========================================
   ADMIN DASHBOARD
========================================== */

async function loadAdminDashboard(){

    try{

        /* ================= USERS ================= */

        const users =
        await db
        .collection("users")
        .get();

        const totalUsersElement =
        document.getElementById(
            "totalUsers"
        );

        if(totalUsersElement){

            totalUsersElement.textContent =
            users.size;

        }


        /* ================= FORMS ================= */

        const forms =
        await db
        .collection("forms")
        .get();

        const kewpa3 =
        await db
        .collection("kewpa3")
        .get();

        const kewpa19 =
        await db
        .collection("kewpa19")
        .get();


        /* ================= TOTAL FORMS ================= */

        const totalForms =

            forms.size +

            kewpa3.size +

            kewpa19.size;


        const totalFormsElement =
        document.getElementById(
            "totalForms"
        );

        if(totalFormsElement){

            totalFormsElement.textContent =
            totalForms;

        }


        /* ================= SEKOLAH BERDAFTAR ================= */

        const sekolahSet =
        new Set();


        function collectSekolah(snapshot){

            snapshot.forEach(doc=>{

                const data =
                doc.data();

                const sekolah =

                    data.sekolah ||

                    data.pemohon?.sekolah ||

                    data.pemohon?.bahagian ||

                    data.bahagian ||

                    data.user?.sekolah ||

                    "";

                if(
                    sekolah &&
                    sekolah.trim() !== ""
                ){

                    sekolahSet.add(
                        sekolah
                        .trim()
                        .toUpperCase()
                    );

                }

            });

        }


        collectSekolah(forms);

        collectSekolah(kewpa3);

        collectSekolah(kewpa19);


        const totalSchoolsElement =
        document.getElementById(
            "totalSchools"
        );

        if(totalSchoolsElement){

            totalSchoolsElement.textContent =
            sekolahSet.size;

        }


        /* ================= ONLINE USERS ================= */

        let onlineUsers = 0;

        const now =
        Date.now();

        const ONLINE_LIMIT =
        5 * 60 * 1000;


        users.forEach(doc=>{

            const user =
            doc.data();

            /*
               Sokong beberapa struktur
               status pengguna
            */

            if(
                user.status === "online" ||
                user.online === true
            ){

                onlineUsers++;

                return;

            }


            /*
               Jika sistem simpan lastSeen
            */

            if(user.lastSeen){

                let lastSeenTime = 0;

                if(
                    typeof user.lastSeen.toDate ===
                    "function"
                ){

                    lastSeenTime =
                    user.lastSeen
                    .toDate()
                    .getTime();

                }

                if(
                    lastSeenTime &&
                    now - lastSeenTime <=
                    ONLINE_LIMIT
                ){

                    onlineUsers++;

                }

            }

        });


        const onlineUsersElement =
        document.getElementById(
            "onlineUsers"
        );

        if(onlineUsersElement){

            onlineUsersElement.textContent =
            onlineUsers;

        }


        /* ================= DEBUG ================= */

        console.log(
            "Admin Dashboard Loaded",
            {
                users:users.size,
                forms:totalForms,
                schools:sekolahSet.size,
                online:onlineUsers
            }
        );

    }

    catch(error){

        console.error(
            "Admin Dashboard Error:",
            error
        );

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

            if(user.role==="admin"){

                totalAdmin++;

            }
            else{

                totalTeacher++;

            }

            totalActive++;

            const loginDate =
            user.lastLogin
            ? user.lastLogin.toDate().toLocaleString("ms-MY")
            : "-";

            let roleBadge =
            `
            <span
            class="
            inline-flex
            items-center
            gap-2
            px-3
            py-1
            rounded-full
            bg-slate-700
            text-slate-300
            text-sm
            font-semibold">

                👤 User

            </span>
            `;

            if(user.role==="admin"){

                roleBadge =
                `
                <span
                class="
                inline-flex
                items-center
                gap-2
                px-3
                py-1
                rounded-full
                bg-amber-500/20
                text-amber-400
                text-sm
                font-bold">

                    👑 Admin

                </span>
                `;

            }

            /* ================= AVATAR ================= */

            let avatar =
            `
            <div
            class="
            w-12
            h-12
            rounded-full
            bg-cyan-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-lg">

                ${(user.nama || "?")
                .charAt(0)
                .toUpperCase()}

            </div>
            `;

            if(user.photoURL){

                avatar =
                `
                <img

                src="${user.photoURL}"

                class="
                w-12
                h-12
                rounded-full
                object-cover
                border
                border-slate-600">

                `;
            }

            table.innerHTML += `

<tr class="border-t border-slate-800 hover:bg-slate-800/30 transition">

    <!-- AVATAR -->

    <td class="p-4">

        ${avatar}

    </td>

    <!-- NAMA -->

    <td class="p-4">

        <div class="font-semibold text-white">

            ${user.nama || "-"}

        </div>

    </td>

    <!-- EMAIL -->

    <td class="p-4 text-slate-300">

        ${user.email || "-"}

    </td>

    <!-- ROLE -->

    <td class="p-4 text-center">

        ${roleBadge}

    </td>

    <!-- LOGIN -->

    <td class="p-4 text-center text-slate-400">

        ${loginDate}

    </td>

    <!-- ACTION -->

    <td class="p-4">

        <div class="flex justify-center gap-2">

            <button

            class="
            w-10
            h-10
            rounded-xl
            bg-cyan-500/15
            hover:bg-cyan-500/25
            text-cyan-400
            transition"

            title="Lihat">

                👁️

            </button>

            <button

            class="
            w-10
            h-10
            rounded-xl
            bg-amber-500/15
            hover:bg-amber-500/25
            text-amber-400
            transition"

            title="Edit">

                ✏️

            </button>

        </div>

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

