import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ headline, blogs, onDelete }) => {
  return (
    <div className="blog-list">
      <h2>{headline}</h2>
      {
        blogs.map(({ id, title, author }) => (
          <div className="blog-preview" key={id}>
            <Link to={`/blogs/${id}`}>
              <h2>{title}</h2>
              <p>Written by {author}</p>
            </Link>
            {onDelete && <p><button onClick={() => onDelete?.(id)}>Delete</button></p>}
          </div>
        ))
      }
    </div>
  )
}

export default BlogList
