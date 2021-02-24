import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import Create from './components/Create'
import Home from './components/Home'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/blogs/:id" component={BlogDetails} />
            <Route path="*" component={NotFound} />
            {/*
              <Route path="/test"><Home /></Route>
            */}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
