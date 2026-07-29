/* ==========================================
   PTIS DIGITAL FORM
   Google Authentication
========================================== */

const provider =
new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({

    prompt:"select_account"

});

/* ================= LOGIN ================= */

async function googleLogin(){

    console.log("googleLogin() dipanggil");

    try{

        const result =
        await auth.signInWithPopup(provider);

        const user = result.user;

        console.log("User Login:", user.uid, user.email);

/* ===========================
   CREATE USER PROFILE
=========================== */

const userRef =
db.collection("users")
.doc(user.uid);

const doc =
await userRef.get();

if(!doc.exists){

    await userRef.set({

        uid : user.uid,

        nama :
        user.displayName || "",

        email :
        user.email || "",

        photoURL :
        user.photoURL || "",

        role :
        "user",

        createdAt :
        firebase.firestore.FieldValue.serverTimestamp(),

        lastLogin :
        firebase.firestore.FieldValue.serverTimestamp()

    });

}
else{

    await userRef.update({

        lastLogin :
        firebase.firestore.FieldValue.serverTimestamp(),

        photoURL :
        user.photoURL || ""

    });

}

console.log("Login Success");

console.log(user);

    }

    catch(error){

        console.error(error);

        alert(
            "Login gagal.\n\n" +
            error.message
        );

    }

}

/* ================= LOGOUT ================= */

async function logout(){

    try{

        await auth.signOut();

        document.getElementById("content").innerHTML="";

        document.getElementById("sidebar").innerHTML="";

        document.getElementById("topbar").innerHTML="";

        document.getElementById("footer").innerHTML="";

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

/* ================= AUTH STATE ================= */

auth.onAuthStateChanged(async(user)=>{

    if(user){

    /* ==========================
       GET USER ROLE
    ========================== */

    const userDoc =
    await db
    .collection("users")
    .doc(user.uid)
    .get();

    let currentRole = "user";

    if(userDoc.exists){

        currentRole =
        userDoc.data().role || "user";

    }

    /* Simpan maklumat role */

    window.currentUser = user;

    window.currentUserRole = currentRole;

    console.log("Role :", currentRole);

    /* Paparkan layout */

    await loadLayout();

    /* Dashboard */

    await loadPage("dashboard");

    /* Maklumat pengguna */

    setTimeout(()=>{

        if(typeof loadUser==="function"){

            loadUser(user);

        }

    },300);

}

    else{

        // Buang semua komponen dashboard

        const sidebar =
        document.getElementById("sidebar");

        if(sidebar){

            sidebar.innerHTML = "";

        }

        const topbar =
        document.getElementById("topbar");

        if(topbar){

            topbar.innerHTML = "";

        }

        const footer =
        document.getElementById("footer");

        if(footer){

            footer.innerHTML = "";

        }

        // Paparkan login sahaja

        await loadPage("login");

    }

});