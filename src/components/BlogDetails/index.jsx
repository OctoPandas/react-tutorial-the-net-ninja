import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { getBlogs } from '../../utils/mock'

const BlogDetails = () => {
  const set = blogs => setBlog(blogs.find(({ id: bId }) => bId === id))

  const { id } = useParams()
  const [blog, setBlog] = useState()
  const [loading, error] = useFetch(getBlogs, set)
  const history = useHistory()

  if (loading) return 'loading'
  if (error) return error.message
  if (!blog) return 'Not Found'

  // The `id` should be existence in URL to delete the one
  const onDelete = () => {
    fetch('https://httpbin.org/delete', {
      method: 'DELETE'
    }).then(() => {
      history.push('/')
    })
  }

  return (
    <div className="blog-details">
      <article>
        <h2>{blog.title}</h2>
        <p>Written by {blog.author}</p>
        <div>{blog.body}</div>
        <button onClick={onDelete}>Delete</button>
      </article>
    </div>
  )
}
export default BlogDetails
