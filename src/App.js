import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import Note from './containers/Note/Note';
import Main from './containers/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { getThemeFromStorage } from './store/actions/app';
import Auth from './containers/Auth/Auth';
import { autoLogin } from './store/actions/auth';

function App() {
  const dispatch = useDispatch()
  const darkTheme = useSelector(state => state.app.darkTheme)
  const token = useSelector(state => state.auth.token)
  
  useEffect(() => {
    dispatch(getThemeFromStorage())
    dispatch(autoLogin())
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
        {token ? null : <Route path='/auth' component={Auth} />}
        <Route path='/' exact component={Main} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App
