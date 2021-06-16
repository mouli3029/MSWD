import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    id
    bookCount
  }
}
`

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $bornTo: Int!) {  
  editAuthor(
    name: $name,
    setBornTo: $bornTo
  ) {
    name
    id
    born
    bookCount
  }
}
`

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  const [bornTo, setBornTo] = useState(0)

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR)

  if (!props.show) {
    return null
  }
  var authors = []

  const submit = (event) => {
    event.preventDefault()
    console.log('update author...')
    updateAuthor({  variables: { name, bornTo } })
    setName('')
    setBornTo(0)
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  authors = result.data.allAuthors

  return (
    <div>
      
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              Name
            </th>
            <th>
              Born
            </th>
            <th>
              Book Count
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2> Set birthyear </h2>
      <form onSubmit={submit}>
        <div>
        Name
        <select value = {name} onChange={({ target }) => setName(target.value)}>
        {authors.map(a =>
          <option value={a.name}>{a.name}</option>
        )}
        </select>
        </div>
        <div>
          BornTo
          <input
            type='number'
            value={bornTo}
            onChange={({ target }) => setBornTo(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
