// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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

// Input fields
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Submit button
const submit = document.getElementById("submit");

// Add event listener to the submit button
submit.addEventListener("click", (e) => {
  e.preventDefault();

  // Get values from input fields
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // Validate fields (optional)
  if (!emailValue || !passwordValue) {
    alert("Email and password must not be empty!");
    return;
  }

  // Firebase create user
  createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      // Signed up successfully
      alert("Signup successful!");
      window.location.href = "../client/login.html";
    })
    .catch((error) => {
      // Handle errors
      alert(`Error: ${error.message}`);
    });
});
