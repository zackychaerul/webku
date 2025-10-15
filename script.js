/* =======================================================
   🌗 DARK MODE DENGAN PENYIMPANAN LOCALSTORAGE
======================================================= */
const darkBtn = document.getElementById("darkModeBtn");
const body = document.body;

// Jika sebelumnya mode gelap aktif
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  if (darkBtn) darkBtn.textContent = "☀️";
}

// Tombol ubah mode gelap/terang
if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    darkBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    localStorage.setItem(
      "darkMode",
      body.classList.contains("dark-mode") ? "enabled" : "disabled"
    );
  });
}

/* =======================================================
   🍔 MENU HAMBURGER + ANIMASI MASUK BERURUTAN
======================================================= */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("show");

    // Efek muncul satu-satu
    if (navLinks.classList.contains("show")) {
      navLinks.querySelectorAll("li").forEach((link, index) => {
        link.style.animation = `slideFadeIn 0.4s ease forwards ${index * 0.1}s`;
      });
    } else {
      navLinks
        .querySelectorAll("li")
        .forEach((link) => (link.style.animation = ""));
    }
  });

  // Tutup menu otomatis saat klik salah satu link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("show");
      navLinks.querySelectorAll("li").forEach((l) => (l.style.animation = ""));
    });
  });
}

/* =======================================================
   ✨ ANIMASI FADE-IN UNTUK TUGAS & GALERI
======================================================= */
const fadeItems = document.querySelectorAll(
  ".tugas-item, .gallery-container img"
);

function showFadeItems() {
  fadeItems.forEach((item) => {
    if (item.getBoundingClientRect().top < window.innerHeight - 60) {
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showFadeItems);
window.addEventListener("load", showFadeItems);

/* =======================================================
   🔄 TRANSISI HALUS ANTAR-HALAMAN
======================================================= */
document.querySelectorAll("a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href && href.endsWith(".html") && !href.startsWith("#")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    });
  }
});

/* =======================================================
   ⬅️ TOMBOL KEMBALI KE MENU TUGAS
======================================================= */
const backBtn = document.querySelector(".btn-back");
if (backBtn) {
  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "tugas.html";
    }, 300);
  });
}

/* =======================================================
   🧩 TAMBAHAN STYLING ANIMASI DINAMIS
======================================================= */
const style = document.createElement("style");
style.textContent = `
  body.fade-out { opacity: 0; transition: opacity 0.3s ease; }

  @keyframes slideFadeIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .tugas-item.show, .gallery-container img.show {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: all 0.6s ease;
  }
`;
document.head.appendChild(style);

/* =======================================================
   💫 ANIMASI HALUS SAAT HALAMAN SELESAI DIMUAT
======================================================= */
window.addEventListener("load", () => {
  fadeItems.forEach((item, index) => {
    setTimeout(() => item.classList.add("show"), index * 100);
  });
});
