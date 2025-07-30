 // Set countdown target date (4 days from now)
 const countdownDate = new Date().getTime() + (4 * 24 * 60 * 60 * 1000) + (13 * 60 * 60 * 1000) + (34 * 60 * 1000) + (56 * 1000);

 const updateTimer = () => {
   const now = new Date().getTime();
   const distance = countdownDate - now;

   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

   document.getElementById('days').innerText = String(days).padStart(2, '0');
   document.getElementById('hours').innerText = String(hours).padStart(2, '0');
   document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
   document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
 };

 setInterval(updateTimer, 1000);
 updateTimer();