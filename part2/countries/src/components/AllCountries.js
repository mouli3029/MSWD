import React, { useEffect, useState } from 'react';
import DisplayCountry from './DisplayCountry';

const AllCountries = ({search,countries}) => {
    const [displayCountries,setDisplayCountries] = useState([])
    const [country,setCountry] = useState();
  
    console.log("Rendering AllCountries... ------> ");
  
    useEffect(()=>{
      let filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));
      setDisplayCountries(filteredCountries);
      console.log('Searching changing .. ----> ',search);
      if(filteredCountries.length == 1){
        setCountry(filteredCountries[0]);
      }
      else{
        setCountry()
      }
    },[search])
  
    const handleShowCountry= (e,country) => {
      e.preventDefault();
      setCountry(country);
    }
  
    return (
      <div>
        {displayCountries.length === 0 && <p> No results found </p>}
        {displayCountries.length > 10 &&
           <p> Too many matches specify another filter </p>}
        {displayCountries.length < 10 &&  displayCountries.length !== 1 &&
          displayCountries.map((country,index)=>
           <p key={index}>
            {country.name}
             <button onClick={(e)=> handleShowCountry(e,country)}>show</button>
            </p>)
        }
        {country && <DisplayCountry country={country}/>}
  
      </div>
    )
  }

export default AllCountries;