import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
//import { BrowserRouter } from 'react-router-dom'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer)

const renderApp = () => {
  ReactDOM.render(<Provider store = {store}> <App store = {store} /> </Provider>, document.getElementById('root'))
  console.log ("rendering last line")
}

renderApp()
store.subscribe(renderApp)