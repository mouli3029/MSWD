import React, { forwardRef, useImperativeHandle } from 'react'
import { useField } from '../hooks'

const AddBlogForm = ({ onAddBlog }, ref) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  useImperativeHandle(ref, () => ({
    resetFields: () => {
      resetTitle()
      resetAuthor()
      resetUrl()
    }
  }))

  return (
    <form onSubmit={e => onAddBlog(e, { title: title.value, author: author.value, url: url.value })}>
      <div>
        title 
        <input {...title} />
      </div>
      <div>
        author 
        <input {...author} />
      </div>
      <div>
        url 
        <input {...url} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default forwardRef(AddBlogForm)
