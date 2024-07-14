const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const weatherImg = document.querySelector('.weather-img');
const current = document.querySelector('.current');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feels-like');
const range = document.querySelector('.range');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind-speed');
const noLocation = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const pressure = document.querySelector('#pressure');

//Function to fetch the waether details and display it 
async function checkWeather(city) {
	const url = `https://rapidweather.p.rapidapi.com/data/2.5/forecast?q=${city}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '945539597amsh0fd006a18c2ab53p190a47jsn86c4d02339da',
			'x-rapidapi-host': 'rapidweather.p.rapidapi.com'
		}
	};


	try {
		const response = await fetch(url, options);
		const result = await response.json();

		if (result.cod === '404') {
			noLocation.style.display = 'flex';
			weatherBody.style.display = 'none';
			return;
		}

		let unix_sunrise = result.city.sunrise;
		var date = new Date(unix_sunrise * 1000);

		// Hours part from the timestamp
		var hours = date.getHours();
		hours = hours % 12;

		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();

		// Will display time in 10:30:23 format
		var sunRise = hours + ':' + minutes.substr(-2);

		let unix_sunset = result.city.sunset;

		var date = new Date(unix_sunset * 1000);

		// Hours part from the timestamp
		var hours = date.getHours();
		hours = hours % 12;

		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();

		// Will display time in 10:30:23 format
		var sunSet = hours + ':' + minutes.substr(-2);

		weatherBody.style.display = 'flex';
		noLocation.style.display = 'none';
		current.innerHTML = 'Now'
		temperature.innerHTML = `${Math.round(result.list[0].main.temp - 273.15)}<sup>°C</sup>`;
		range.innerHTML = `High ${Math.round(result.list[0].main.temp_max - 273.15)}<sup>°C</sup> &middot Low ${Math.round(result.list[0].main.temp_min - 273.15)}<sup>°C</sup>`;
		feelsLike.innerHTML = `Feels like ${Math.round(result.list[0].main.feels_like - 273.15)}<sup>°C</sup>`;
		description.innerHTML = `${result.list[0].weather[0].description}`;
		humidity.innerHTML = `${result.list[0].main.humidity}%`;
		wind.innerHTML = `${result.list[0].wind.speed}km/h`;
		sunrise.innerHTML = ` ${sunRise} am`;
		sunset.innerHTML = ` ${sunSet} pm`;
		pressure.innerHTML = `${result.list[0].main.pressure} mBar`

		switch (result.list[0].weather[0].main) {
			case 'Clouds': weatherImg.src = 'assets/cloud.png';
				break;
			case 'Clear': weatherImg.src = 'assets/clear.png';
				break;
			case 'Rain': weatherImg.src = 'assets/rain.png';
				break;
			case 'Mist': weatherImg.src = 'assets/mist.png';
				break;
			case 'Snow': weatherImg.src = 'assets/snow.png';
				break;
		}
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}

searchBtn.addEventListener('click', () => {
	checkWeather(inputBox.value);

});
