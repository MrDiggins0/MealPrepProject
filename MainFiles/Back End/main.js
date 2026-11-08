import { supabase } from "./supabaseClient.js";

// Check whether the user is logged in
async function checkLogin() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
        window.location.replace("login.html");
        return;
    }

    // Get the logged-in user's profile
    const { data: profile, error: profileError } = await supabase
        .from("Profiles")
        .select("Username")
        .eq("id", data.session.user.id)
        .single();

    if (profileError) {
        console.error("Could not retrieve username:", profileError.message);
        return;
    }

    // Display the username
    const welcomeHeading = document.getElementById("welcome-heading");

    if (welcomeHeading) {
        welcomeHeading.textContent = `Welcome, ${profile.Username}!`;
    }
}

// Log out
async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Logout failed:", error.message);
        return;
    }

    window.location.replace("login.html");
}

// Connect logout button
const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", logout);
}

checkLogin();