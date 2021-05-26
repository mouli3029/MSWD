import React, {Fragment, useEffect, useState} from 'react';

const Anecdote = ({anecdote,votes}) => {
  return(
    <>
      <h3>Anecdote of the day</h3>
      <p>{anecdote} <br/> has {votes} votes</p>
    </>
  )
}

const MostVotedAnecdote = ({mostVoted}) => {
  return(
    <div>
      <h3>Ancedote with most votes</h3>
      <p>{mostVoted}</p>
  </div>
  )
}

const Button = ({text,listener}) => {
  return(
    <button onClick={listener}>
      {text}
    </button>
  )
}
 
const  App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected,setSelected] = useState(0)
  const [points,setPoints] = useState(new Array(6).fill(0))

  
  const nextAncedote = () => {
    const value = Math.round(Math.random() * 5)
    setSelected(value);
  }

  const vote = () => {
   const copy = [...points]
    copy[selected] += 1;
    setPoints(copy) 
  }
  const maxPoints = points.reduce(function (a,b){
    return Math.max(a,b)
  })
  const index = points.indexOf(maxPoints)
  return (
    <div>
      <Anecdote votes={points[selected]} anecdote={anecdotes[selected]} />
      <Button listener={vote} text="vote"/>  
      <Button listener={nextAncedote} text="next ancedote"/>
      <MostVotedAnecdote mostVoted={anecdotes[index]} />
    </div>
  );
}

export default App;
