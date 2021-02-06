import { createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import axios from 'axios'

import Welcome from './components/Welcome'
import Game from './components/game/Game'
import GameSetup from './components/game/GameSetup'
import GameOver from './components/game/GameOver'
import Stats from './components/Stats'

export const UserContext = createContext()

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token == null){
        localStorage.setItem("auth-token", "")
        token = ""
      }

      const tokenResponse = await axios.post(
        '/api/users/tokenIsValid', 
        null, 
        {headers: {"auth-token": token}}
      )

      console.log(tokenResponse.data)
      if(tokenResponse.data){
        const userResponse = await axios.get('/api/users/profile',
          {headers: {'auth-token': token}}
        )
        setUserData({
          token: token,
          user: userResponse.data
        })
      }
    }
    isLoggedIn()
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Container>        
            <Route path='/' exact component={Welcome} />
            <Route path='/game' component={Game} />
            <Route path='/gamesetup' component={GameSetup} />
            <Route path='/gameover' component={GameOver} />
            <Route path='/stats' component={Stats} />
        </Container>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
