/* ==========================================
   USER PROFILE
========================================== */

function loadUser(user){

    if(!user) return;

    const displayName =
    (user.displayName || "Pengguna").trim();

    const email =
    user.email || "";

    const initials =
    displayName
    .split(" ")
    .filter(Boolean)
    .map(name=>name[0])
    .join("")
    .substring(0,2)
    .toUpperCase();


    const nameElement =
    document.getElementById("userName");

    const roleElement =
    document.getElementById("userRole");

    const avatarElement =
    document.getElementById("userAvatar");


    /* ================= NAME ================= */

    if(nameElement){

    nameElement.textContent =
    displayName;

    nameElement.title =
    displayName;

    }   


    /* ================= EMAIL ================= */

    if(roleElement){

    roleElement.textContent =
    email;

    roleElement.title =
    email;

    }


    /* ================= AVATAR ================= */

        if(avatarElement){
        avatarElement.textContent = initials || "U";

        if(user.photoURL){
            const photo = document.createElement("img");

            photo.alt = `Gambar profil ${displayName}`;
            photo.referrerPolicy = "no-referrer";
            photo.style.cssText =
                "width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;";

            photo.onerror = ()=>{
                if(photo.parentNode === avatarElement){
                    avatarElement.textContent = initials || "U";
                }
            };

            avatarElement.replaceChildren(photo);
            photo.src = user.photoURL;
        }
    }

}