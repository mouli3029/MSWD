import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(useSelector(state => state))
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(p => p.id === id)
    const updatedAnecdotes = { ...anecdote, votes: anecdote.votes+1 }
    setAnecdotes(anecdotes.map(p => p.id === id ? updatedAnecdotes : p))
    console.log('vote', id, 'updated', updatedAnecdotes)
  }

  const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    //dispatch(createNote(content))
    const anecdote = { content: content, votes: 0, id: generateId() }
    setAnecdotes(anecdotes.concat(anecdote))
  }

  useEffect(() => {
    console.log('effect')
  }, [anecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name = "note" /></div>
        <button type = "submit">create</button>
      </form>
    </div>
  )
}

export default App