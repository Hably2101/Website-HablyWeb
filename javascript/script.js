const users = JSON.parse(localStorage.getItem("users")) || [];

// Handler Login
document.getElementById("loginButton").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        window.location.href = "homepage.html"; // Arahkan ke homepage tanpa alert
    } else {
        alert("Username atau password salah!"); // Opsional: tetap bisa menampilkan alert jika login gagal
    }
});


// Create account handler
document.getElementById("createAccountForm").addEventListener("submit", e => {
    e.preventDefault();
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (users.some(u => u.username === newUsername)) {
        alert("Username sudah terdaftar!");
    } else {
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Akun berhasil dibuat!");
        closeModal("createAccountModal");
    }
});

// Forgot password handler
document.getElementById("forgotPasswordForm").addEventListener("submit", e => {
    e.preventDefault();
    const forgotUsername = document.getElementById("forgotUsername").value.trim();

    const user = users.find(u => u.username === forgotUsername);
    const result = user ? `Password Anda: ${user.password}` : "Username tidak ditemukan!";
    document.getElementById("recoveredPassword").textContent = result;
});

// Function to open modal and hide login form
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const loginForm = document.getElementById("loginForm");
    modal.style.display = "flex";
    loginForm.classList.add("hidden"); // Hide login form
    const background = modal.getAttribute("data-background");
    if (background) {
        modal.style.backgroundImage = `url(${background})`;
    }
}

// Function to close modal and show login form
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const loginForm = document.getElementById("loginForm");
    modal.style.display = "none";
    modal.style.backgroundImage = "";
    loginForm.classList.remove("hidden"); // Show login form
}
