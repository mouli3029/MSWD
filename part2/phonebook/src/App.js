import React, { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
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
    setPersons(persons.concat({name : newName,number:newNum}))

    setNewName('')
    setNewNum('')
    setIsAdded(false)
  }

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
