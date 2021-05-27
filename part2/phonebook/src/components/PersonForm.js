import React from 'react'

const PersonForm = ({setNewName,newName,setNewNum,newNum,handleNameSubmit}) => {
    return (
        <form>
        <div>
          name: <input type="text" onChange={e => setNewName(e.target.value)} value={newName}/>
        </div>
        <div>
          number: <input type="text" onChange={e=> setNewNum(e.target.value)} value={newNum} />
        </div>
        <div>
          <button type="submit" onClick={handleNameSubmit}>add</button>
        </div>
      </form>
    )
}

export default PersonForm
