/* ==========================================
   PTIS DIGITAL FORMS
   ADMIN ANALYTICS
========================================== */

async function loadAdminAnalytics(){

    try{

        // ================= COLLECTIONS =================

        const [
            usersSnapshot,
            formSnapshot,
            kewpa3Snapshot,
            kewpa19Snapshot

        ] = await Promise.all([

            db.collection("users").get(),

            db.collection("forms").get(),

            db.collection("kewpa3").get(),

            db.collection("kewpa19").get()

        ]);

        // ================= TOTAL =================

        const totalUsers =
        usersSnapshot.size;

        const totalKewpa9 =
        formSnapshot.size;

        const totalKewpa3 =
        kewpa3Snapshot.size;

        const totalKewpa19 =
        kewpa19Snapshot.size;

        const totalRecords =
        totalKewpa9 +
        totalKewpa3 +
        totalKewpa19;

        // ================= ANALYTICS =================

        const schools =
        new Set();

        let todayCount = 0;

        let monthCount = 0;

        const today =
        new Date();

        const todayDate =
        today.toDateString();

        const currentMonth =
        today.getMonth();

        const currentYear =
        today.getFullYear();

        const allRecords = [

            ...formSnapshot.docs,

            ...kewpa3Snapshot.docs,

            ...kewpa19Snapshot.docs

        ];

        allRecords.forEach(doc=>{

            const data =
            doc.data();

            // ================= SEKOLAH =================

            const bahagian =

                data.pemohon?.bahagian ||

                data.bahagian ||

                data.sekolah ||

                data.namaSekolah ||

                data.maklumat?.sekolah ||

                "";

            if(bahagian){

                schools.add(bahagian);

            }

            // ================= TARIKH =================

            if(data.createdAt){

                const date =
                data.createdAt.toDate();

                if(

                    date.toDateString() ===

                    todayDate

                ){

                    todayCount++;

                }

                if(

                    date.getMonth() === currentMonth &&

                    date.getFullYear() === currentYear

                ){

                    monthCount++;

                }

            }

        });

        // ================= UPDATE KPI =================

        setValue(

            "analyticsTotalRecords",

            totalRecords

        );

        setValue(

            "analyticsTotalUsers",

            totalUsers

        );

        setValue(

            "analyticsKewpa9",

            totalKewpa9

        );

        setValue(

            "analyticsKewpa3",

            totalKewpa3

        );

        setValue(

            "analyticsKewpa19",

            totalKewpa19

        );

        setValue(

            "analyticsSchool",

            schools.size

        );

        setValue(

            "analyticsToday",

            todayCount

        );

        setValue(

            "analyticsMonth",

            monthCount

        );

    }

    catch(error){

        console.error(

            "Analytics Error:",

            error

        );

    }

}

/* ================= SET VALUE ================= */

function setValue(id,value){

    const element =

    document.getElementById(id);

    if(element){

        element.textContent = value;

    }

}