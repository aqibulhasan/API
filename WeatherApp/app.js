let appId = "83128201437d845c9f69f89dd8e0fbff";
let unit = "imperial";

let searchMethod;
const search = document.querySelector("#searchBtn");
const input = document.querySelector("#searchInput");

//serachMethod
function getsearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    searchTerm.length === 4 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  ) {
    searchMethod = "zip";
  } else {
    searchMethod = "q";
  }
}

function searhWeather(searchTerm) {
  getsearchMethod(searchTerm);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${unit}`
  )
    .then((res) => res.json())
    .then((result) => {
      init(result);
    });
}

function init(resultFromServer) {
  let counter = true;
  let covertAbleValue;
  console.log(resultFromServer);
  //setting background
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = `url('clear.jpg')`;
      break;

    case "Clouds":
      document.body.style.backgroundImage = `url('cloudy.jpg')`;
      break;

    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = `url('rain.jpg')`;
      break;

    case "Thunderstrom":
      document.body.style.backgroundImage = `url('stromy.jpg')`;
      break;

    case "Snow":
      document.body.style.backgroundImage = `url('snow.jpg')`;
      break;

    default:
      break;
  }
  //working with data from API and setting the data for show

  let weatherDescriptionHeader = document.querySelector(
    "#weatherDescriptionHeader"
  );
  let temperatureElement = document.querySelector("#temperature");
  let windspeedElement = document.querySelector("#windSpeed");
  let humidityELement = document.querySelector("#humidity");
  let cityHeader = document.querySelector("#cityHeader");
  let weatherIcon = document.querySelector("#documentIconImg");

  let weatherIconFromApi = resultFromServer.weather[0].icon; //icon
  weatherIcon.src = ` http://openweathermap.org/img/wn/${weatherIconFromApi}.png`;

  let resultDescription = resultFromServer.weather[0].description; //weather description
  weatherDescriptionHeader.innerText = `${resultDescription
    .charAt(0)
    .toUpperCase()}${resultDescription.slice(1)}`;

  let city = resultFromServer.name; //name of city
  cityHeader.innerText = city;

  let temperature = Math.floor(resultFromServer.main.temp); //temperature
  temperatureElement.innerHTML = temperature + "&#176;" + "<span>F</span>";

  temperatureElement.addEventListener("click", function (e) {
    const value = Number.parseInt(temperature);
    if (counter) {
      covertAbleValue = FtoC(value);
      temperatureElement.innerHTML =
        covertAbleValue + "&#176;" + "<span>C</span>";
      counter = false;
    } else {
      covertAbleValue = CtoF(covertAbleValue);
      temperatureElement.innerHTML =
        covertAbleValue + "&#176;" + "<span>F</span>";
      counter = true;
    }
  });

  let humidity = resultFromServer.main.humidity; //humidity
  humidityELement.innerHTML = `Humidity levels at ${humidity}%`;

  let windspeed = resultFromServer.wind.speed; //wind speed
  windspeedElement.innerHTML = `Winds at ${Math.floor(windspeed)} m/s`;

  //calling setposition function
  setPositionForWeatherInfo();
}

//converting to c=>f and f=>c
function FtoC(temperature) {
  let celcius = Math.floor(((temperature - 32) * 5) / 9);
  return celcius;
}

function CtoF(temperature) {
  let farenheight = Math.floor((temperature * 9) / 5 + 32) + 1;
  return farenheight;
}
//setting the position weather container

function setPositionForWeatherInfo() {
  let weatherContainer = document.querySelector("#weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;
  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.5}px)`;
  weatherContainer.style.visibility = "visible";
}
//serach option
search.addEventListener("click", (e) => {
  const searchTerm = input.value;
  if (searchTerm) {
    searhWeather(searchTerm);
  }
  input.value = " ";
});
