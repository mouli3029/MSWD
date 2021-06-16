import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
    expect(component.container).not.toHaveTextContent('React patterns')
  })

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'testUser',
      token: 'qwerty12345',
      name: 'John Doe'
    }
    localStorage.setItem('LoggedBloglistUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)


    await waitForElement(() => component.container.querySelector('.blog'))

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(3)
    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent('Go To Statement Considered Harmful')
    expect(component.container).toHaveTextContent('Canonical string reduction')
  })
})
