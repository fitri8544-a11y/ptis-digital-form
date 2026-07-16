/* ==========================================
   USER PROFILE
========================================== */

function loadUser(user){

    if(!user) return;

    const displayName =
    user.displayName || "Pengguna";

    const email =
    user.email || "";

    const initials =
    displayName
    .split(" ")
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

    if(nameElement){

        nameElement.textContent =
        displayName;

    }

    if(roleElement){

        roleElement.textContent =
        email;

    }

    if(avatarElement){

        avatarElement.textContent =
        initials;

    }

}