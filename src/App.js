import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import Note from './containers/Note/Note';
import NoteList from './containers/NoteList/NoteList';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/note/:id" component={Note} />
        <Route path="/" exact component={NoteList} />
      </Switch>
    </div>
  );
}

export default App
