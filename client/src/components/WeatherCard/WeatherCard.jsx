import React from 'react';
import style from './WeatherCard.module.scss';

const WeatherCard = ({
    icon, city, country, description,
    feels_like, temp_min, temp_max,
    wind_speed, clouds_percent, pressure
}) => {
    return (
        <div className={style.WeatherCard}>
            <div className={style.Header}>
                <div className = {style.Left}>
                    <img
                        src={`http://openweathermap.org/img/w/${icon}.png`}
                        alt="weather"
                    />
                    <span> {description} </span>
                </div>
                <div className = {style.Right}>
                    <span> {city}, {country} </span>
                    <img 
                        src={`http://openweathermap.org/images/flags/${country.toLowerCase()}.png`}
                        alt = 'flag'
                    />
                </div>
            </div>
            <div className={style.Bottom}>
                <p> 
                    <span className = {style.FeelsLike}> {feels_like}°С </span> 
                    temperature from {temp_min}°С to {temp_max}°С 
                </p>
                <p> Wind: {wind_speed} m/s. Clouds: {clouds_percent} %, {pressure} hpa </p>
            </div>
        </div>
    );
}

export default WeatherCard;