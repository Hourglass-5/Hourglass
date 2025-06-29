import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHEtMKL29DvTfxDb9utrJiIFHPcqj9WHc",
  authDomain: "hourglass-e27f1.firebaseapp.com",
  projectId: "hourglass-e27f1",
  storageBucket: "hourglass-e27f1.firebasestorage.app",
  messagingSenderId: "450410816837",
  appId: "1:450410816837:web:528f072c9cf0d4bf51ca2c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("login-btn").onclick = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("login-btn").hidden = true;
    document.getElementById("timer").hidden = false;
  }
});

let interval;
let timeLeft = 25 * 60;

document.getElementById("start-btn").onclick = () => {
  interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
      const secs = (timeLeft % 60).toString().padStart(2, "0");
      document.getElementById("countdown").textContent = `${mins}:${secs}`;
    } else {
      clearInterval(interval);
      alert("Session complete!");
    }
  }, 1000);
};

document.getElementById("reset-btn").onclick = () => {
  clearInterval(interval);
  timeLeft = 25 * 60;
  document.getElementById("countdown").textContent = "25:00";
};
