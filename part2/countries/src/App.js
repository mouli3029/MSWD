import React, { useEffect, useState } from 'react';
import axios from 'axios';

const  App = () => {
  const [countries,setCountries] = useState([]);
  const [search,setSearch] = useState('');

  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all')
    .then((response)=>{
      console.log(response.data)
      setCountries(response.data);
    })
    .catch((error)=> {
      console.log(error)
    })
  },[])

  const displayCountries = countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <div>
      <form>
        find countries <input type="text" onChange={(e)=> setSearch(e.target.value)} value={search}/>
        {displayCountries.length === 1 && 
         <div>
           <h1>{displayCountries[0].name}</h1>
           <p>
             capital {displayCountries[0].capital} 
           </p>
           <p>population {displayCountries[0].population}</p>
           <div>
             <h3> languages </h3>
             <ul>
               {displayCountries[0].languages.map((languge,index)=> <li key={index}>{languge.name}</li> )}
             </ul>
             <img src={displayCountries[0].flag} width="100px"/>
           </div>
         </div>
        }
        {displayCountries.length === 0 && <p> No results found </p>}
        {displayCountries.length > 10 &&
         <p> Too many matches specify another filter </p>}
        
        {displayCountries.length < 10 &&  displayCountries.length !== 1 &&
        displayCountries.map((country,index)=> <p key={index}>{country.name}</p>)}

      </form>
    </div>
  );
}

export default App;
