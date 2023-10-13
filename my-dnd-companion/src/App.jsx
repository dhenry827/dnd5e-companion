import { useState, createContext } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Banner from './components/Banner'
import NavBar from './components/NavBar'

import Register from './routes/Register'
import Login from './routes/Login'
import Home from './routes/Home'
import Footer from './components/Footer'
import Glossary_Ability_Scores from './routes/glossaryRoutes/Glossary_Ability_Scores'
import Glossary_Races from './routes/glossaryRoutes/Glossary_Races'
import Glossary_Classes from './routes/glossaryRoutes/Glossary_Classes'
import Glossary_Spells from './routes/glossaryRoutes/Glossary_Spells'
import Glossary_Features from './routes/glossaryRoutes/Glossary_Features'
import Glossary_Skills from './routes/glossaryRoutes/Glossary_Skills'
import Glossary_Traits from './routes/glossaryRoutes/Glossary_Traits'
import Characters from './components/Characters'


export const UserDataContext = createContext() 


function App() {

  const [users, setUsers] = useState([{
    username: 'AgnTurtle',
    email: 'zachnash@gmail.com',
    password: 'ilovebeingaturtle'
    }
  ])

  const [loggedInUser, setLoggedinUser] = useState(null)
  
  const [attributes, setAttributes] = useState({
    str: 8,
    dex: 8,
    con: 8,
    wis: 8,
    int: 8,
    cha: 8
  })
  
  return (
    <>
      <div id='page'>
        {/* <Banner /> */}
        <NavBar />
        <div id='content'>

      <UserDataContext.Provider value={{users, setUsers}}>
          <Routes>
            <Route path='/register' element={<Register />}/> 
            <Route path='/login' element={<Login />}/>
            <Route path='/' element={<Home />} />
            <Route path='/characters' element={<Characters />} />
            <Route path='/characters/:characterName' element={'#'} />
            <Route path='/glossary/classes/:class' element={<Glossary_Classes />} />
            <Route path='/glossary/races/:race' element={<Glossary_Races />} />
            <Route path='/glossary/ability-scores' element={<Glossary_Ability_Scores />} />
            <Route path='/glossary/traits/:trait' element={<Glossary_Traits />} />
            <Route path='/glossary/skills' element={<Glossary_Skills />} />
            <Route path='/glossary/items' element={'#'} />
            <Route path='/glossary/spells' element={<Glossary_Spells />} />
            <Route path='/glossary/features' element={<Glossary_Features />} />
            <Route path='/account' element={'#'} />
          </Routes>
      </UserDataContext.Provider>
        </div>
      <Footer />
      </div>
    </>
  )
}

export default App
