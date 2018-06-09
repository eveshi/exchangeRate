import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from '../../hoc/layout/layout'

import Home from '../pages/home/home'
import classes from './App.css'

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Layout>
          <Route path='/home' component={Home} />
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App
