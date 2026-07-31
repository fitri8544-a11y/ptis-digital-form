/* ===========================================================
   PTIS DIGITAL FORMS
   KNOWLEDGE CENTER
   MODULE NAVIGATION
=========================================================== */

function renderModuleNavigation(config){

    const container =
    document.getElementById(
        "moduleNavigation"
    );

    if(!container) return;

    const previous =
    config.previous || null;

    const next =
    config.next || null;

    const theme =
    config.theme || "cyan";

    const colors={

        blue:{
            border:"border-blue-500/20",
            bg:"bg-blue-500/10",
            text:"text-blue-300",
            hover:"hover:border-blue-400"
        },

        cyan:{
            border:"border-cyan-500/20",
            bg:"bg-cyan-500/10",
            text:"text-cyan-300",
            hover:"hover:border-cyan-400"
        },

        emerald:{
            border:"border-emerald-500/20",
            bg:"bg-emerald-500/10",
            text:"text-emerald-300",
            hover:"hover:border-emerald-400"
        },

        amber:{
            border:"border-amber-500/20",
            bg:"bg-amber-500/10",
            text:"text-amber-300",
            hover:"hover:border-amber-400"
        },

        orange:{
            border:"border-orange-500/20",
            bg:"bg-orange-500/10",
            text:"text-orange-300",
            hover:"hover:border-orange-400"
        },

        red:{
            border:"border-red-500/20",
            bg:"bg-red-500/10",
            text:"text-red-300",
            hover:"hover:border-red-400"
        }

    };

    const c =
    colors[theme] ||
    colors.cyan;

    container.innerHTML = `

<section class="mt-14">

<div class="grid lg:grid-cols-3 gap-6">

${previous ? previousCard(previous,c) : firstCard(c)}

${centerCard(c)}

${next ? nextCard(next,c) : lastCard(c)}

</div>

</section>

`;

}

/* ===========================================================
   FIRST MODULE
=========================================================== */

function firstCard(c){

return `

<div
class="
rounded-3xl
border
${c.border}
bg-slate-900
p-6">

<div
class="
w-14
h-14
rounded-2xl
${c.bg}
${c.text}
flex
items-center
justify-center
text-2xl">

🏠

</div>

<h3
class="
mt-5
text-xl
font-black
text-white">

Knowledge Center

</h3>

<p
class="
mt-2
text-slate-400">

Modul pertama.

</p>

<button

onclick="loadPage('guides')"

class="
mt-6
w-full
py-3
rounded-xl
${c.bg}
${c.text}
font-bold">

Kembali

</button>

</div>

`;

}

/* ===========================================================
   PREVIOUS
=========================================================== */

function previousCard(item,c){

return `

<div
class="
rounded-3xl
border
border-slate-700
bg-slate-900
p-6
transition
hover:-translate-y-1
${c.hover}">

<p
class="
text-xs
uppercase
tracking-[0.2em]
text-slate-500">

MODUL SEBELUM

</p>

<h3
class="
mt-5
text-xl
font-black
text-white">

${item.title}

</h3>

<p
class="
mt-2
text-slate-400">

${item.subtitle}

</p>

<button

onclick="loadKnowledge('${item.file}')"

class="
mt-6
w-full
py-3
rounded-xl
border
${c.border}
${c.text}
font-bold">

<i class="fa-solid fa-arrow-left mr-2"></i>

Buka Modul

</button>

</div>

`;

}

/* ===========================================================
   CENTER
=========================================================== */

function centerCard(c){

return `

<div
class="
rounded-3xl
border
${c.border}
bg-gradient-to-br
from-slate-900
to-slate-950
p-6
text-center">

<div
class="
w-20
h-20
mx-auto
rounded-3xl
${c.bg}
flex
items-center
justify-center
text-5xl">

📘

</div>

<h3
class="
mt-6
text-2xl
font-black
text-white">

Knowledge Center

</h3>

<p
class="
mt-3
text-slate-400">

Kembali ke senarai modul.

</p>

<button

onclick="loadPage('guides')"

class="
mt-8
w-full
py-3
rounded-xl
bg-cyan-600
text-white
font-black">

Buka Knowledge Center

</button>

</div>

`;

}

/* ===========================================================
   NEXT
=========================================================== */

function nextCard(item,c){

return `

<div
class="
rounded-3xl
border
border-slate-700
bg-slate-900
p-6
transition
hover:-translate-y-1
${c.hover}">

<p
class="
text-xs
uppercase
tracking-[0.2em]
text-slate-500">

MODUL SETERUSNYA

</p>

<h3
class="
mt-5
text-xl
font-black
text-white">

${item.title}

</h3>

<p
class="
mt-2
text-slate-400">

${item.subtitle}

</p>

<button

onclick="loadKnowledge('${item.file}')"

class="
mt-6
w-full
py-3
rounded-xl
${c.bg}
${c.text}
font-bold">

Buka Modul

<i class="fa-solid fa-arrow-right ml-2"></i>

</button>

</div>

`;

}

/* ===========================================================
   LAST MODULE
=========================================================== */

function lastCard(c){

return `

<div
class="
rounded-3xl
border
${c.border}
bg-slate-900
p-6">

<div
class="
w-14
h-14
rounded-2xl
${c.bg}
${c.text}
flex
items-center
justify-center
text-2xl">

🏆

</div>

<h3
class="
mt-5
text-xl
font-black
text-white">

Tahniah

</h3>

<p
class="
mt-2
text-slate-400">

Anda telah menamatkan semua modul.

</p>

<button

onclick="loadPage('guides')"

class="
mt-6
w-full
py-3
rounded-xl
${c.bg}
${c.text}
font-bold">

Knowledge Center

</button>

</div>

`;

}