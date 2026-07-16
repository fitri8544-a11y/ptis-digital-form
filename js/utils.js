function updateClock(){

    const now = new Date();

    const dateOptions={

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    };

    const timeOptions={

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit"

    };

    const date=

    now.toLocaleDateString("ms-MY",dateOptions);

    const time=

    now.toLocaleTimeString("ms-MY",timeOptions);

    const dateEl=document.getElementById("currentDate");

    const timeEl=document.getElementById("currentTime");

    if(dateEl) dateEl.innerHTML=date;

    if(timeEl) timeEl.innerHTML=time;

}

function updateClock(){

    const now = new Date();

    const dateOptions={

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    };

    const timeOptions={

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit"

    };

    const date=

    now.toLocaleDateString("ms-MY",dateOptions);

    const time=

    now.toLocaleTimeString("ms-MY",timeOptions);

    const dateEl=document.getElementById("currentDate");

    const timeEl=document.getElementById("currentTime");

    if(dateEl) dateEl.innerHTML=date;

    if(timeEl) timeEl.innerHTML=time;

}