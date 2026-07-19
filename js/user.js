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

        avatarElement.textContent =
        initials || "U";

    }

}