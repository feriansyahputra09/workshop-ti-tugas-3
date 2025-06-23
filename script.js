const apiKey = "YOUR_API_KEY"; // Ganti dengan API key dari openweathermap.org

document.getElementById("weatherForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("weatherResult");

  // Gunakan backtick (`) agar template literal bisa digunakan di fetch URL
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`)
    .then(response => {
      if (!response.ok) throw new Error("Kota tidak ditemukan");
      return response.json();
    })
    .then(data => {
      const name = data.name;
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;

      result.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
        <p><strong>${temp}°C</strong></p>
        <p>${desc}</p>
      `;
    })
    .catch(error => {
      // Tampilkan error ke pengguna
      result.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});
