// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI57XayF547meaCl2qwP9iifJCJcEGNRU",
  authDomain: "cakeplus-38d8b.firebaseapp.com",
  projectId: "cakeplus-38d8b",
  storageBucket: "cakeplus-38d8b.firebasestorage.app",
  messagingSenderId: "1072613869327",
  appId: "1:1072613869327:web:a9b6e96ad595a07723207a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en"; // Set default language for auth UI

// Initialize Google Auth provider
const provider = new GoogleAuthProvider();

// Google Sign-In button logic
const googleLogin = document.getElementById("google-signIn");
googleLogin.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Google Sign-In successful
      alert(`Welcome, ${result.user.displayName}!`);
      window.location.href = "../index.html"; // Redirect to home page
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error);
      alert(`Error during Google sign-in: ${error.message}`);
    });
});

// Email and Password Sign-In button logic
const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();

  // Get email and password values from the input fields
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate inputs
  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  // Log the inputs to check their values (for debugging)
  console.log("Email:", email);
  console.log("Password:", password);

  // Sign in with Firebase Authentication
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sign in successful
      alert("Login successful!");
      window.location.href = "../index.html"; // Redirect to the dashboard or home page
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle specific errors
      if (errorCode === "auth/user-not-found") {
        alert("No user found with this email.");
      } else if (errorCode === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        alert(`Error: ${errorMessage}`);
      }
    });
});
