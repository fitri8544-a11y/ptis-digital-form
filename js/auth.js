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

        const user =
        result.user;

        console.log(
            "User Login:",
            user.uid,
            user.email
        );


        /* ================= USER REFERENCE ================= */

        const userRef =
        db
        .collection("users")
        .doc(user.uid);


        /* ================= CHECK EXISTING USER ================= */

        const userDoc =
        await userRef.get();


        /* ================= NEW USER ================= */

        if(!userDoc.exists){

            await userRef.set({

                uid:
                user.uid,

                nama:
                user.displayName || "",

                email:
                user.email || "",

                photoURL:
                user.photoURL || "",

                role:
                "user",

                createdAt:
                firebase.firestore.FieldValue.serverTimestamp(),

                lastLogin:
                firebase.firestore.FieldValue.serverTimestamp(),

                lastSeen:
                firebase.firestore.FieldValue.serverTimestamp(),

                status:
                "online"

            });

            console.log(
                "Pengguna baru disimpan ke Firestore"
            );

        }


        /* ================= EXISTING USER ================= */

        else{

            await userRef.set({

                uid:
                user.uid,

                nama:
                user.displayName || "",

                email:
                user.email || "",

                photoURL:
                user.photoURL || "",

                lastLogin:
                firebase.firestore.FieldValue.serverTimestamp(),

                lastSeen:
                firebase.firestore.FieldValue.serverTimestamp(),

                status:
                "online"

            },{
                merge:true
            });

            console.log(
                "Data pengguna dikemaskini"
            );

        }


        /* ================= LOGIN SUCCESS ================= */

        console.log(
            "Google Sign-In selesai"
        );

    }

    catch(error){

        console.error(
            "Google Login Error:",
            error
        );

        alert(
            "Log masuk Google tidak berjaya."
        );

    }

}

/* ================= LOGOUT ================= */

async function logout(){

    try{

        const user =
        auth.currentUser;

        /* ================= UPDATE STATUS ================= */

        if(user){

            await db
            .collection("users")
            .doc(user.uid)
            .set({

                status:
                "offline",

                lastSeen:
                firebase.firestore.FieldValue.serverTimestamp()

            },{
                merge:true
            });

        }


        /* ================= FIREBASE LOGOUT ================= */

        await auth.signOut();


        console.log(
            "User logout successfully"
        );

    }

    catch(error){

        console.error(
            "Logout Error:",
            error
        );

        alert(
            "Log keluar tidak berjaya."
        );

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