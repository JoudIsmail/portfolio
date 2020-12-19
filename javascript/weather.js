const api = {
  key: "b055a1194b794d796e3643212da455c7",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  var weatherStr = weather_el.innerText;

  switch(weatherStr){
    case "Snow":
      document.body.style.backgroundImage = "url('./images/snow.jpg')";
      break;
    case "Clear":
      document.body.style.backgroundImage = "url('./images/sunny.jpg')";
      break;
    case "Drizzle":
      document.body.style.backgroundImage = "url('./images/drizzle.jpg')";
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = "url('./images/thunderstorm.jpg')";
      break;
    case "Clouds":
      document.body.style.backgroundImage = "url('./images/clouds.jpg')";
      break;
    case "Rain":
      document.body.style.backgroundImage = "url('./images/rain.jpg')";
      break;
    case "Mist":
      document.body.style.backgroundImage = "url('./images/mist.jpg')";
      break; 
  }

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}