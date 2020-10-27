import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import Note from './containers/Note/Note';
import Main from './containers/Main/Main';

function App() {
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route path='/note/:id' component={Note} />
        <Route path='/note' component={Note} />
        <Route path='/' exact component={Main} />
      </Switch>
    </div>
  );
}

export default App
