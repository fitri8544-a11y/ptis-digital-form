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

        const jumlahDownload =
        document.getElementById(
            "jumlahDownload"
        );

        if(jumlahDownload){

            jumlahDownload.textContent =
            snapshot.size;

        }
        
        snapshot.forEach(doc=>{

            const data =
            doc.data();

            console.log(doc.id);
            console.log(data);

            container.innerHTML += `

<div
class="
group
rounded-[30px]
border
border-slate-800
bg-gradient-to-br
from-slate-900
to-slate-950
p-7
transition-all
duration-300
hover:-translate-y-1
hover:border-cyan-500/30
hover:shadow-2xl
hover:shadow-cyan-500/10">

    <!-- HEADER -->

    <div
    class="
    flex
    items-center
    justify-between">

        <div
        class="
        w-16
        h-16
        rounded-3xl
        bg-green-500/10
        flex
        items-center
        justify-center
        text-4xl">

            📗

        </div>

        <span
        class="
        px-3
        py-1
        rounded-full
        bg-cyan-500/10
        text-cyan-300
        text-xs
        font-bold">

            ${data.kategori || "Dokumen"}

        </span>

    </div>

    <!-- TITLE -->

    <h2
    class="
    mt-6
    text-2xl
    font-black
    text-white">

        ${data.nama || "-"}

    </h2>

    <p
    class="
    mt-3
    text-slate-400
    leading-7">

        ${data.penerangan || "-"}

    </p>

    <!-- INFO -->

    <div
    class="
    mt-6
    space-y-3
    text-sm">

        <div
        class="
        flex
        justify-between">

            <span class="text-slate-500">

                Versi

            </span>

            <span class="text-white">

                ${data.versi || "-"}

            </span>

        </div>

        <div
        class="
        flex
        justify-between">

            <span class="text-slate-500">

                Format

            </span>

            <span class="text-white">

                ${data.format || "-"}

            </span>

        </div>

        <div
        class="
        flex
        justify-between">

            <span class="text-slate-500">

                Saiz

            </span>

            <span class="text-white">

                ${data.saiz || "-"}

            </span>

        </div>

        <div
        class="
        flex
        justify-between">

            <span class="text-slate-500">

                Dikemaskini

            </span>

            <span class="text-white">

                ${data.tarikh || "-"}

            </span>

        </div>

    </div>

    <!-- BUTTON -->

    <button

    onclick="window.open('${data.url}','_blank')"

    class="
    mt-8
    w-full
    py-4
    rounded-2xl
    bg-gradient-to-r
    from-cyan-600
    to-blue-600
    hover:from-cyan-500
    hover:to-blue-500
    text-white
    font-bold
    transition">

        <i
        class="
        fa-solid
        fa-download
        mr-2">

        </i>

        Muat Turun Borang

    </button>

</div>

`;

        });

    }

    catch(error){

        console.error(error);

    }

}