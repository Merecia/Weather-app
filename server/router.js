const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const router = express.Router();

router.get('/:city', async (request, response) => {
    const city = request.params.city;

    const URL1 = new URL(`
        http://api.openweathermap.org/geo/1.0/direct?
        q=1&limit=2&appid=3
    `);
    URL1.searchParams.set('q', city);
    URL1.searchParams.set('limit', process.env.CITIES_LIMIT);
    URL1.searchParams.set('appid', process.env.API_KEY);

    let responseFromAPI = await fetch(URL1.href);
    const infoAboutCities = await responseFromAPI.json();

    let weatherInCities = [];

    for (const infoAboutCity of infoAboutCities) {
        const URL2 = new URL(`
            https://api.openweathermap.org/data/2.5/weather?
            lat=1&lon=2&appid=3&units=metric
        `);
        URL2.searchParams.set('lat', infoAboutCity.lat);
        URL2.searchParams.set('lon', infoAboutCity.lon);
        URL2.searchParams.set('appid', process.env.API_KEY);

        responseFromAPI = await fetch(URL2.href);
        const weatherInCity = await responseFromAPI.json();
        console.log(weatherInCity.name);
        
        weatherInCities.push({
            icon: weatherInCity.weather[0].icon,
            city: weatherInCity.name,
            country: weatherInCity.sys.country,
            description: weatherInCity.weather[0].description,
            feels_like: weatherInCity.main.feels_like,
            temp_min: weatherInCity.main.temp_min,
            temp_max: weatherInCity.main.temp_max,
            wind_speed: weatherInCity.wind.speed,
            clouds_percent: weatherInCity.clouds.all,
            pressure: weatherInCity.main.pressure
        });
    }

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(weatherInCities);
    response.end();
})

module.exports = router;