window.onload = function() {
  console.log('running...');

  // év beállítása
  document.getElementById("year").textContent = new Date().getFullYear();

  function updateStatus() {
    const dot = document.getElementById('status-dot');
    const now = new Date();

    const utcHour = now.getUTCHours();
    const isDST = now.getTimezoneOffset() === -120;
    const cetHour = (utcHour + (isDST ? 2 : 1)) % 24;

    if (cetHour >= 8 && cetHour < 18) {
      dot.classList.add('online');
      dot.classList.remove('offline');
    } else {
      dot.classList.add('offline');
      dot.classList.remove('online');
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);
};
