import React, { useState, useEffect } from 'react'

const App = (props) => {

  var anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch({
      type: 'INCREMENT',
      id: id
    }) }


    //console.log ("app.js - anecdotes: ", anecdotes)

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

export default App