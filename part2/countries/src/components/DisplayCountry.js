import React from 'react';

const DisplayCountry = ({country}) => {
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
        </div>
    )
  }

export default DisplayCountry;