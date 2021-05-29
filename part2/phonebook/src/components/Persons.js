import React from 'react'

const Persons = ({persons,search,handleDelete}) => {
    return (
        <>
        {
            persons.length > 0 ? 
             persons.filter(person=> person.name.toLowerCase().includes(search.toLowerCase()))
             .map(person => <p key={person.id}> {person.name} {person.number} <button onClick={(e)=>handleDelete(e,person)}> delete </button> </p>
             )
             : 
             <p>No entries</p>
          }
        </>
    )
}

export default Persons
