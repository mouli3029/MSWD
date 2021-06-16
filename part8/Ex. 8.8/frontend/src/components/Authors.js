import React from 'react'
import { gql, useQuery } from '@apollo/client'

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

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  var authors = []

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

    </div>
  )
}

export default Authors
