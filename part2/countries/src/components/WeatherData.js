import React from 'react'

const WeatherData = ({weather}) => {
    const {location,current} = weather;
    return (
        <>
           {current !== undefined ?
               <div>
               <h3>Weather in {location.name}</h3>
               <p> <strong>temperature: </strong>
               {current.temperature} Celcius</p>
               <img src={current.weather_icons[0]}/>
               <p><strong>wind: </strong> {current.wind_speed} direction {current.wind_dir}</p>
               </div>
                :
                <p>No Weather data for this country</p>
              }
        </>
    )

}
export default WeatherData;