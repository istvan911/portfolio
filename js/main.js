document.addEventListener("DOMContentLoaded", () => {
    
    console.log('running...');

    // --- 1. Év beállítása ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Státusz pötty (Online/Offline) frissítése ---
    function updateStatus() {
        const dot = document.getElementById('status-dot');
        if (!dot) return; // Biztonsági ellenőrzés, ha az elem nem létezik

        const now = new Date();
        const utcHour = now.getUTCHours();
        // A nyári időszámítás (DST) ellenőrzése
        const isDST = now.getTimezoneOffset() === -120;
        // Közép-európai idő (CET/CEST) kiszámítása
        const cetHour = (utcHour + (isDST ? 2 : 1)) % 24;

        // Reggel 8:00 és este 18:00 között 'online', amúgy 'offline'
        if (cetHour >= 8 && cetHour < 18) {
            dot.classList.add('online');
            dot.classList.remove('offline');
        } else {
            dot.classList.add('offline');
            dot.classList.remove('online');
        }
    }

    updateStatus(); // Azonnali futtatás betöltéskor
    setInterval(updateStatus, 60000); // Percenkénti frissítés


    // --- 3. Lépcsőzetes megjelenés (Staggering) előkészítése ---
    const containers = document.querySelectorAll('.card-container, .project-container, .welcome');
    
    containers.forEach(container => {
        const revealElements = container.querySelectorAll('.reveal');
        revealElements.forEach((el, index) => {
            // Minden elem 100 milliszekundummal később indul el
            let delay = index * 100;
            el.style.transitionDelay = `${delay}ms`;
        });
    });


    // --- 4. Intersection Observer (Görgetés figyelő az animációkhoz) ---
    const observerOptions = {
        threshold: 0.1, // Akkor aktiválódik, ha az elem 10%-a látható
        rootMargin: "0px 0px -50px 0px" // Picit hamarabb töltődik be, mielőtt beérne a viewportba
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // Hozzáadjuk az active osztályt a beúszáshoz
                el.classList.add('active');
                
                // Kiszámoljuk, mennyi ideig tart az animáció (600ms CSS + a mi JS delay-ünk)
                const delayStr = el.style.transitionDelay || '0ms';
                const delayMs = parseFloat(delayStr);
                const totalAnimationTime = 600 + delayMs;

                // TRÜKK: Miután befejeződött az animáció, teljesen eltávolítjuk a reveal osztályokat!
                // Így a hover effektjeid tisztán, a saját transition idejükkel fognak működni.
                setTimeout(() => {
                    el.classList.remove('reveal', 'active');
                    el.style.transitionDelay = '0ms';
                }, totalAnimationTime);
                
                // Csak egyszer akarjuk animálni, utána levesszük róla a figyelőt
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    // Rákötjük a figyelőt minden '.reveal' elemre
    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach(el => observer.observe(el));
    
});