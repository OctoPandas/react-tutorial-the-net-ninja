import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { getBlogs } from '../../utils/mock'
import BlogList from '../BlogList'

const Home = () => {
  const [blogs, setBlogs] = useState()
  const [loading, error] = useFetch(getBlogs, setBlogs)

  const onBlogDelete = targetId => {
    setBlogs(blogs.filter(({ id }) => id !== targetId))
  }

  return (
    <div className="home">
      {
        (() => {
          if (loading) return 'loading...'
          if (error) return error.toString()
          return <BlogList blogs={blogs} headline="All Posts" onDelete={onBlogDelete} />
        })()
      }
    </div>
  )
}

export default Home
