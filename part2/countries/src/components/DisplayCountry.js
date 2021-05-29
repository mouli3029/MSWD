import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherData from './WeatherData';

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
              <WeatherData weather={weather}/>
             
        </div>
    )
  }
export default DisplayCountry;