import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from '../../hoc/layout/layout'

import UserDetails from '../pages/userDetails/userDetails'
import Register from '../pages/register/register'
import Rate from '../pages/rate/rate'

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/user' component={UserDetails} />
            <Route path='/register' component={Register} />
            <Route path='/' component={Rate} />
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App
