import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

  } else {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function login() {
    var userEmail = document.getElementById("email_field");
    var userPassword = document.getElementById("password_field");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

}

function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });

}

function createAccount() {
    var userEmail = document.getElementById("email_field");
    var userPassword = document.getElementById("password_field");

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}

export default function Login(){
    return(
    <body>
        <div id="login_div" class = "main_div">
            <h3>Login to your account</h3>
            <input type="email" placeholder="Email..." id="email_field"/>
            <input type="password" placeholder="Email..." id = "password_field"/>
            <button onclick="login()">Login to Account</button>
        </div>
        <div id="user_div" class="loggedin-div">
            <h3>Welcome User</h3>
            <p>You're currently logged in</p>
            <button onclick="logout()">Logout</button>
            <button onclick="createAccount()">Create Account</button>
        </div>
    </body>)
}