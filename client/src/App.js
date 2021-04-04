import './App.css';
import Landing from './pages/Landing'
import UserProfile from './pages/UserProfile'
import {Link, Switch, Route} from 'react-router-dom'
import React, {useState} from 'react'

function App() {
  const [userId, setUserid] = useState('')
  return (
    <div className="App">
      <Switch>
      <Route path='/' exact render={()=><Landing setUserid={setUserid}/>} />
      <Route path='/user' exact render={()=><UserProfile userId={userId}/>} />
      </Switch>
    </div> 
  );
}

export default App;
