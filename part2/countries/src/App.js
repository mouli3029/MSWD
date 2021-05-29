import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllCountries from './components/AllCountries';


const  App = () => {
  const [countries,setCountries] = useState([]);
  const [search,setSearch] = useState('');
  // Fetching 
  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all')
    .then((response)=>{
      setCountries(response.data);
    })
    .catch((error)=> {
      console.log(error)
    })
  },[])

  //let displayCountries = countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <form>
        find countries <input type="text" onChange={(e)=> setSearch(e.target.value)} value={search}/>
        <AllCountries countries={countries} search={search} />
      </form>
    </div>
  );
}

export default App;
