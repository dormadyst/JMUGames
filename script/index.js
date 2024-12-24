const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
document.ge
toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
});

// API Stuff Below
async function fetchWeatherData() {
	
	const url = 'https://api.weatherstack.com/current?access_key=00ed8b88ad60b83590a05dc70297f18e&query=22801';

	const options = {
		method: 'GET'
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();

		const location = result.location.name;
        const temperatureC = result.current.temperature;
        const temperature = (temperatureC * 1.8) + 32;
        const weatherDescription = result.current.weather_descriptions[0];
        const windSpeed = result.current.wind_speed;
        const humidity = result.current.humidity;

        const element = document.getElementById("weather");
        element.innerHTML = `
            <h2>Weather in ${location}</h2>
            <p>Temperature: ${temperature}°F</p>
            <p>Condition: ${weatherDescription}</p>
            <p>Wind Speed: ${windSpeed} km/h</p>
            <p>Humidity: ${humidity}%</p>
        `;
	} catch (error) {
		console.error(error);
	}
}

fetchWeatherData();

// Feedback clear form function
document.getElementById('clear-data').addEventListener('click', () => {
    //  Clear all input fields
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.querySelectorAll('textarea').forEach(input => input.value = '');
    
    });
