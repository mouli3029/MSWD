import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayCountry = ({country}) => {
  const [weather,setWeather] = useState({})
  const key = process.env.REACT_APP_API_KEY;
  const query = country.capital;
  useEffect(()=>{
    axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=${query}`)
    .then((response)=>{
      console.log(response.data);
      setWeather(response.data);
    })
    .catch((e)=> console.log(e))
  },[key,query])
  
    return (
      <div>
            <h1>{country.name}</h1>
            <p>
               capital {country.capital} 
            </p>
             <p>population {country.population}</p>
             <div>
               <h3> languages </h3>
               <ul>
                 { country.languages !==undefined && country.languages.map((languge,index)=> <li key={index}>{languge.name}</li> )}
               </ul>
               <img src={country.flag} width="100px"/>
             </div>
            
               {weather.current !== undefined ?
               <div>
               <h3>Weather in {country.capital}</h3>
               <p> <strong>temperature: </strong>
               {weather.current.temperature} Celcius</p>
               <img src={weather.current.weather_icons[0]}/>
               <p><strong>wind: </strong> {weather.current.wind_speed} direction {weather.current.wind_dir}</p>
               </div>
                :
                <p>No Weather data for this country</p>
              }
             
        </div>
    )
  }
export default DisplayCountry;