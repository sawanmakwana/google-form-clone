import './App.css'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import FormList from 'pages/form-list'
import FormResponse from 'pages/form-response'
import FormCreate from 'pages/form-create'
import {Provider} from 'react-redux'
import store from 'redux/store'
import persistor from 'redux/persistStore'
import {PersistGate} from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={FormList} />
            <Route path="/create" component={FormCreate} />
            <Route path="/view/:id" component={FormResponse} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
