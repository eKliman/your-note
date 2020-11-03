import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import Note from './containers/Note/Note';
import Main from './containers/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesFromStorage } from './store/actions/noteList';
import { getThemeFromStorage } from './store/actions/app';

function App() {
  const dispatch = useDispatch()
  const darkTheme = useSelector(state => state.app.darkTheme)
  
  useEffect(() => {
    dispatch(getNotesFromStorage())
    dispatch(getThemeFromStorage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cls = ['app']
  if (darkTheme) {
    cls.push('dark')
  }

  return (
    <div className={cls.join(' ')}>
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
