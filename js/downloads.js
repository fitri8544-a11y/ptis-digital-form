/* ==========================================
   DOWNLOAD CENTER
========================================== */

async function loadDownloads(){

    try{

        const container =
        document.getElementById(
            "downloadList"
        );

        if(!container) return;

        container.innerHTML = "";

        const snapshot =
        await db
        .collection("downloads")
        .orderBy("nama")
        .get();

        if(snapshot.empty){

            container.innerHTML = `

            <div
            class="
            col-span-full
            rounded-3xl
            border
            border-dashed
            border-slate-700
            p-10
            text-center">

                <div
                class="
                text-5xl">

                    📂

                </div>

                <h3
                class="
                mt-4
                text-xl
                font-bold
                text-white">

                    Tiada Fail

                </h3>

                <p
                class="
                mt-2
                text-slate-400">

                    Tiada fail dimuat naik.

                </p>

            </div>

            `;

            return;

        }

        document.getElementById(
            "jumlahDownload"
        ).textContent =
        snapshot.size;
        
        snapshot.forEach(doc=>{

            const data =
            doc.data();

            container.innerHTML += `

<div
class="
rounded-3xl
border
border-slate-800
bg-slate-900
p-6
transition
hover:-translate-y-1
hover:border-cyan-500/30">

    <div
    class="
    flex
    items-center
    justify-between">

        <div
        class="
        w-14
        h-14
        rounded-2xl
        bg-cyan-500/10
        text-cyan-300
        flex
        items-center
        justify-center
        text-3xl">

            📄

        </div>

        <span
        class="
        px-3
        py-1
        rounded-full
        bg-green-500/10
        text-green-300
        text-xs
        font-bold">

            TERKINI

        </span>

    </div>

    <h2
    class="
    mt-6
    text-xl
    font-black
    text-white">

        ${data.nama || "-"}

    </h2>

    <p
    class="
    mt-2
    text-slate-400">

        ${data.penerangan || "-"}

    </p>

    <div
    class="
    mt-6
    space-y-2
    text-sm">

        <div>

            <span class="text-slate-500">

                Versi :

            </span>

            <span class="text-white">

                ${data.versi || "-"}

            </span>

        </div>

        <div>

            <span class="text-slate-500">

                Format :

            </span>

            <span class="text-white">

                ${data.format || "-"}

            </span>

        </div>

    </div>

    <button

    onclick="window.open('${data.url}','_blank')"

    class="
    mt-8
    w-full
    py-3
    rounded-2xl
    bg-cyan-600
    hover:bg-cyan-500
    text-white
    font-bold
    transition">

        <i class="fa-solid fa-download mr-2"></i>

        Muat Turun

    </button>

</div>

`;

        });

    }

    catch(error){

        console.error(error);

    }

}