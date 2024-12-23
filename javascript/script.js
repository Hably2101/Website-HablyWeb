document.getElementById("button").addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah form melakukan submit default

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validasi sederhana untuk login
    if (username === "admin" && password === "password123") {
        window.location.href = "homepage.html"; // Arahkan ke homepage.html jika login berhasil
    } else {
        alert("Username atau password salah. Silakan coba lagi! Username : admin dan Password : password123"); // Tampilkan pesan error jika login gagal
    }
});
