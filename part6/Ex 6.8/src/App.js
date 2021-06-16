import React, { useState, useEffect } from 'react'

const App = (props) => {

  var anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch({
      type: 'INCREMENT',
      id: id
    }) }

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    props.store.dispatch({
    	type: 'ADDITION',
    	content: content
    })
    event.target.note.value = ''
  }

  const AnecdoteList = () => {
  	return (
  		<div> 
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
  		</div>
  	)
  }

  const AnecdoteForm = () => {
  	return (
  		<div>
  			<h2>create new</h2>
      		<form onSubmit={addNote}>
        		<div><input name = "note" /></div>
        		<button type = "submit">create</button>
      		</form>
  		</div>
  	)
  }

    //console.log ("app.js - anecdotes: ", anecdotes)

    anecdotes.sort((a, b) => (a.votes <= b.votes) ? 1 : -1)

  return (
    <div>
    <h2>Anecdotes</h2>
    <AnecdoteList />
    <AnecdoteForm />
    </div>
  )

}

export default App