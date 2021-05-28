import React from 'react'

const Persons = ({persons,search}) => {
    return (
        <>
        {
            persons.length > 0 ? 
             persons.filter(person=> person.name.toLowerCase().includes(search.toLowerCase()))
             .map(person => <p key={person.name}> {person.name} {person.number} </p>
             )
             : 
             <p>No entries</p>
          }
        </>
    )
}

export default Persons
