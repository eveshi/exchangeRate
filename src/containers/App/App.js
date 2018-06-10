import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from '../../hoc/layout/layout'

import Rate from '../pages/rate/rate'
import classes from './App.css'

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Layout>
          <Route path='/' component={Rate} />
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App
