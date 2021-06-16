import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 666,
    user: {
      name: 'John Doe'
    }
  }

  let component
  let likeHandler
  let removeHandler
  const options = { exact: false }

  beforeEach(() => {
    likeHandler = jest.fn()
    removeHandler = jest.fn()
    component = render(<Blog blog={blog} onLike={likeHandler} onRemove={removeHandler} showRemove={false} />)
  })

  test('initially shows only title and author', () => {
    component.debug()
    const { getByText } = component
    getByText(`${blog.title} ${blog.author}`)
    const detailsDiv = getByText(`added by ${blog.user.name}`, options)
    expect(detailsDiv).toHaveStyle('display: none')
  })

  test('on click shows expanded details', () => {
    const { getByText  } = component
    const clickable = getByText(`${blog.title} ${blog.author}`)
    fireEvent.click(clickable)
    expect(likeHandler).toHaveBeenCalledTimes(0)
    expect(removeHandler).toHaveBeenCalledTimes(0)
    const detailsDiv = getByText(`added by ${blog.user.name}`, options)
    expect(detailsDiv).not.toHaveStyle('display: none')
  })
})
