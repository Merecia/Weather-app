import { useState } from 'react';
import axios from 'axios';
import style from './App.module.scss';
import WeatherCard from './components/WeatherCard/WeatherCard';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherInCities, setWeatherInCities] = useState([]);

  const changeHandler = event => {
    setCity(event.target.value);
  }

  const loadWeatherData = () => {
    axios.get(`http://localhost:5000/weather/${city}`)
      .then(response => {
        setWeatherInCities(response.data)
      });
  }

  const keyPressHandler = event => {
    if (city !== '' && event.code === 'Enter') {
      loadWeatherData();
    }
  }

  const renderCardList = () => {
    return weatherInCities.map(weatherInCity => renderCard(weatherInCity))
  };

  const renderCard = weatherInCity => (
    <WeatherCard
      icon={weatherInCity.icon}
      city={weatherInCity.city}
      country={weatherInCity.country}
      description={weatherInCity.description}
      feels_like={weatherInCity.feels_like}
      temp_min={weatherInCity.temp_min}
      temp_max={weatherInCity.temp_max}
      wind_speed={weatherInCity.wind_speed}
      clouds_percent={weatherInCity.clouds_percent}
      pressure={weatherInCity.pressure}
    />
  );

  return (
    <div className={style.App}>
      <header className={style.Header}>
        <SearchBar
          placeholder="Search location..."
          value={city}
          onChange={changeHandler}
          onKeyDown={keyPressHandler}
        />
      </header>
      <main className={style.Content}>
        {renderCardList()}
      </main>
    </div>
  );
}

export default App;
