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
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App