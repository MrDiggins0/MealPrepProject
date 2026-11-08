import { supabase } from "./supabaseClient.js";

// Login and registration sections
const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");
const message = document.getElementById("message");

// Switch to registration
document.getElementById("show-register").addEventListener("click", () => {
    loginSection.hidden = true;
    registerSection.hidden = false;
    message.textContent = "";
});

// Switch to login
document.getElementById("show-login").addEventListener("click", () => {
    registerSection.hidden = true;
    loginSection.hidden = false;
    message.textContent = "";
});

// Convert username into an internal email
function usernameToEmail(username) {
    return username.trim().toLowerCase() + "@mealmate.invalid";
}

// Register account
document.getElementById("signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value;

    message.textContent = "Creating account...";

    const { data, error } = await supabase.auth.signUp({
        email: usernameToEmail(username),
        password: password
    });

    if (error) {
        message.textContent = error.message;
        return;
    }

    if (!data.session) {
        message.textContent = "Account created, but email confirmation is required.";
        return;
    }

    const { error: profileError } = await supabase
        .from("Profiles")
        .insert({
            id: data.user.id,
            Username: username
        });

    if (profileError) {
        message.textContent = "Profile error: " + profileError.message;
        return;
    }

    window.location.href = "front.html";
});

// Login
document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    message.textContent = "Logging in...";

    const { error } = await supabase.auth.signInWithPassword({
        email: usernameToEmail(username),
        password: password
    });

    if (error) {
        message.textContent = error.message;
        return;
    }

    window.location.href = "front.html";
});