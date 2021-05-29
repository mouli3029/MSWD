import React, { useState,useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('');
  const [isAdded,setIsAdded] = useState(false);
  const [newNum,setNewNum] = useState('');
  const [search,setSearch] = useState('');
  
  const handleNameSubmit = (e) => {
    e.preventDefault();
    const isAdd = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    setIsAdded(isAdd)
  
    if(isAdded){
      return alert(`${newName} is already added to phonebook`);
    }
    const newEntry = {name : newName,number : newNum}

    axios.post('http://localhost:3001/persons',newEntry)
    .then((response)=>{
      // console.log(response.data);
      setPersons(persons => [...persons,response.data])
    })

    setNewName('')
    setNewNum('')
    setIsAdded(false)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      // console.log(response.data)
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearch={setSearch} search={search}/>
      <h3>add a new</h3>
      <PersonForm setNewName={setNewName} setNewNum={setNewNum} newName={newName} newNum={newNum} handleNameSubmit={handleNameSubmit} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search}/>
{/*       {persons.map(person => <p key={person.name}>{person.name}  {person.number}</p>)} */}
    </div>
  )
}

export default App
