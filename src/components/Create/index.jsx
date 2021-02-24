import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('Mario')
  const [pending, setPending] = useState(false)
  const history = useHistory()

  const onSubmit = e => {
    e.preventDefault()
    const blog = { title, body, author, id: nanoid() }
    setPending(true)
    console.log(blog)

    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    }).then(res => res.json()).then(data => {
      // setPending(false)
      history.push('/')
    })

    // history.go(-1)

  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="">Blog title:</label>
        <input type="text" required onChange={e => setTitle(e.target.value)} />
        <label htmlFor="">Blog body:</label>
        <textarea name="" id="" cols="30" rows="10" required onChange={e => setBody(e.target.value)}></textarea>
        <label htmlFor="">Blog author:</label>
        <select name="" id="" onChange={e => setAuthor(e.target.value)}>
          <option value="Mario">Mario</option>
          <option value="Yoshi">Yoshi</option>
        </select>
        {
          pending ?
            <button disabled>Adding Blog...</button> :
            <button>Add Blog</button>
        }
      </form>
    </div>
  )
}

export default Create
