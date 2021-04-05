import './App.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserProfile from './pages/UserProfile'
import EditUser from './pages/EditUser';
import {Link, Switch, Route} from 'react-router-dom'
import React, {useState} from 'react'

function App() {
  const [userId, setUserid] = useState('')
  return (
    <div className="App">
      <Switch>
      <Route path='/' exact render={()=><Login setUserid={setUserid}/>} />
      <Route path='/signup' exact render={()=><SignUp setUserid={setUserid}/>} />
      <Route path='/user' exact render={()=><UserProfile userId={userId}/>} />
      <Route path='/edituser' render={()=><EditUser  userId={userId}/>}/>
      </Switch>
    </div> 
  );
}

export default App;
