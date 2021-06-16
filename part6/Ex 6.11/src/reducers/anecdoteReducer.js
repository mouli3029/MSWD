import initialState from './store'
import notification from './store'

const getId = () => {
  return (100000 * Math.random()).toFixed(0)
}

const createNode = (state, content) => {
  const anecdote1 = { content: content, votes: 0, id: getId() }
  state = state.concat(anecdote1)
  //console.log("changed state in reducer function: ", state)
  return state
}

const incrementVote = (state, id) => {
  const anecdote = state.find(p => p.id === id)
  const updatedAnecdotes = { ...anecdote, votes: anecdote.votes+1 }
  notification.notification = "Voted for - " + anecdote.content
  state = state.map(p => p.id === id ? updatedAnecdotes : p)
  //console.log("changed state in reducer function: ", state)
  return state
}

const reducer = (state = initialState.initialState, action) => {
  console.log("test action", action)
  switch (action.type) {
    case 'INCREMENT':
      return incrementVote(state, action.id)
    case 'ADDITION':
      return createNode(state, action.content)
    default: 
      return state
  }
  return state
}

export default reducer