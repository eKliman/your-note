import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import Note from './containers/Note/Note';
import Main from './containers/Main/Main';
import { useDispatch } from 'react-redux';
import { getNotesFromStorage } from './store/actions/noteList';

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getNotesFromStorage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
