/* ==========================================================================
   PT PESAKA LOKA KIRANA - MAIN JAVASCRIPT
   Fungsi: Mengatur interaksi user, animasi UI, dan koneksi API (Frontend)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {

    // ---------------------------------------------------------
    // 1. EFEK BAYANGAN NAVBAR
    // Memberikan bayangan saat halaman digulir ke bawah
    // ---------------------------------------------------------
    const navbar = document.querySelector('.navbar-modern');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
            }
        });
    }

    // ---------------------------------------------------------
    // 2. ANIMASI LOADING (PRELOADER)
    // Menghilangkan layar loading setelah semua aset web dimuat
    // ---------------------------------------------------------
    window.addEventListener('load', function() {
        setTimeout(function() {
            const veil = document.getElementById('veil');
            if (veil) {
                veil.classList.add('done');
            }
        }, 600);
    });

    // ---------------------------------------------------------
    // 3. TITIK NAVIGASI KANAN (SCROLL SPY)
    // Deteksi section mana yang sedang dilihat user
    // ---------------------------------------------------------
    const sections = document.querySelectorAll("section[id]");
    const navDots = document.querySelectorAll(".dot-link");

    if (navDots.length > 0) {
        window.addEventListener("scroll", () => {
            let current = "";
            
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute("id");
                }
            });

            navDots.forEach((dot) => {
                dot.classList.remove("active");
                if (dot.getAttribute("href").includes(current)) {
                    dot.classList.add("active");
                }
            });
        });
    }

    // ---------------------------------------------------------
    // 4. WIDGET TRACKING KONTAINER (INTEGRASI API)
    // ---------------------------------------------------------
    const btnTrack = document.getElementById("btnTrack");
    const inputContainer = document.getElementById("inputContainer");
    const showContainerNumber = document.getElementById("showContainerNumber");
    
    const trackingModalEl = document.getElementById('trackingModal');
    let statusBadge, trackingSpinner, infoText;
    
    if (trackingModalEl) {
        statusBadge = trackingModalEl.querySelector('h4');
        trackingSpinner = trackingModalEl.querySelector('.spinner-grow');
        infoText = trackingModalEl.querySelector('.p-3.rounded-3 p');
    }

    const jalankanPencarian = async function() {
        const noKontainer = inputContainer.value.trim().toUpperCase();
        
        if (noKontainer === "") {
            alert("Silakan masukkan Nomor Kontainer atau B/L terlebih dahulu.");
            return;
        }

        const trackingModal = new bootstrap.Modal(trackingModalEl);
        trackingModal.show();

        if (showContainerNumber) showContainerNumber.innerText = noKontainer;
        if (statusBadge) statusBadge.innerText = "LOADING...";
        if (trackingSpinner) trackingSpinner.style.display = "inline-block";
        if (infoText) infoText.innerHTML = "<i class='bi bi-info-circle-fill text-gold me-1'></i> Sedang menyinkronkan data dengan server...";

        // SIMULASI SEMENTARA (Akan berjalan sebelum API backend dibuat)
        setTimeout(() => {
            if (trackingSpinner) trackingSpinner.style.display = "none";
            if (statusBadge) statusBadge.innerText = "ARRIVED";
            if (infoText) infoText.innerHTML = "<i class='bi bi-info-circle-fill text-gold me-1'></i> Kontainer telah tiba di fasilitas TPS Pesaka. Untuk melihat rincian dokumen (B/L, HBL), silakan login ke portal.";
        }, 2000);
    };

    if (btnTrack && inputContainer) {
        btnTrack.addEventListener("click", function(e) {
            e.preventDefault();
            jalankanPencarian();
        });

        inputContainer.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                jalankanPencarian();
            }
        });
    }

    // ---------------------------------------------------------
    // 5. POP-UP PERSETUJUAN COOKIES
    // ---------------------------------------------------------
    const cookiePopup = document.getElementById("cookiePopup");
    const btnAcceptCookies = document.getElementById("btnAcceptCookies");

    if (cookiePopup && btnAcceptCookies) {
        if (!localStorage.getItem("pesakaCookiesAccepted")) {
            setTimeout(() => {
                cookiePopup.classList.add("show");
            }, 2500);
        }

        btnAcceptCookies.addEventListener("click", function() {
            cookiePopup.classList.remove("show");
            localStorage.setItem("pesakaCookiesAccepted", "true");
        });
    }

    // ---------------------------------------------------------
    // 6. TOMBOL KEMBALI KE ATAS (BACK TO TOP)
    // ---------------------------------------------------------
    const backToTopBtn = document.getElementById("backToTop");
    
    if (backToTopBtn) {
        // Deteksi guliran layar
        window.addEventListener("scroll", function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show"); 
            } else {
                backToTopBtn.classList.remove("show"); 
            }
        });

        // Aksi saat tombol diklik
        backToTopBtn.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

}); // <-- TUTUP KURUNG UTAMA ADA DI SINI