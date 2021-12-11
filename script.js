const weather = {
	apiKey: '779555d297d5652be9006bc6e504bd19',
	fetchWeather: function (city) {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.apiKey}`,
		)
			.then((response) => response.json())
			.then((data) => this.displayWeather(data));
	},
	displayWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;

		document.querySelector('.city').innerText = `Weather in ${name}`;
		document.querySelector(
			'.icon',
		).src = `https://openweathermap.org/img/wn/${icon}.png`;
		document.querySelector('.description').innerText = description;
		document.querySelector('.current-temp').innerText = `${Math.floor(temp)}°F`;
		document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
		document.querySelector('.wind').innerText = `Wind Speed: ${speed.toFixed(
			1,
		)} mph`;
		document.querySelector('.weather').classList.remove('loading');
		document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
	},
	search: function () {
		this.fetchWeather(document.querySelector('.search-bar').value);
	},
};

const searchBtn = document.querySelector('.search button');

searchBtn.addEventListener('click', function () {
	weather.search();
});

const searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('keyup', function (e) {
	if (e.key === 'Enter') {
		weather.search();
	}
});
