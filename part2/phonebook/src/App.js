import React, { useState,useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from '../src/services/persons'

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [newName, setNewName ] = useState('');
  const [newNum,setNewNum] = useState('');
  const [search,setSearch] = useState('');
  
  const {getAll,create,deleteEntry} = personService;

  // ADD
  const handleNameSubmit = (e) => {
    e.preventDefault();
    const isAdd = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    if(isAdd.length > 0){
      return alert(`${newName} is already added to phonebook`);
    }
    const newEntry = {name : newName,number : newNum}

    create(newEntry)
    .then((newPerson)=>{
      // console.log(response.data);
      setPersons(persons => [...persons,newPerson])
    })

    setNewName('')
    setNewNum('')
  }
  
  // DELETE
  const handleDelete = (e,person) => {
    const id = person.id;
    e.preventDefault();
    let canDelete = window.confirm(`Delete ${person.name}`);
    if(canDelete){
      deleteEntry(id)
      .then(() => setPersons(persons.filter(person=> person.id !== id)))
      .catch(err=> console.log(err))
    }
  }

  // GET
  useEffect(() => {
    getAll()
    .then(persons => {
      setPersons(persons)
    })
    .catch((e)=> console.log(e))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearch={setSearch} search={search}/>
      <h3>add a new</h3>
      <PersonForm setNewName={setNewName} setNewNum={setNewNum} newName={newName} newNum={newNum} handleNameSubmit={handleNameSubmit} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} handleDelete={handleDelete}/>
{/*       {persons.map(person => <p key={person.name}>{person.name}  {person.number}</p>)} */}
    </div>
  )
}

export default App
