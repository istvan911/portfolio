console.log('running...');
document.getElementById("year").textContent = new Date().getFullYear();

function updateStatus() {
  const dot = document.getElementById('status-dot');
  const now = new Date();

  // CET = UTC+1 (vagy nyáron UTC+2)
  const utcHour = now.getUTCHours();
  const isDST = now.getTimezoneOffset() === -120; // nyári időszámítás
  const cetHour = (utcHour + (isDST ? 2 : 1)) % 24;

  if (cetHour >= 8 && cetHour <18) {
    dot.classList.add('online');
    dot.classList.remove('offline');
  } else {
    dot.classList.add('offline');
    dot.classList.remove('online');
  }
}

// futtatás betöltéskor és percenként
updateStatus();
setInterval(updateStatus, 60000);