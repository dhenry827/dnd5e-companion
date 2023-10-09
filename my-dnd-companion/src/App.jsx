import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Banner from './components/Banner'
import NavBar from './components/NavBar'

import Home from './routes/Home'
import Footer from './components/Footer'
import Glossary_Ability_Scores from './components/Glossary_Ability_Scores'
import Glossary_Races from './components/Glossary_Races'
import Glossary_Classes from './components/Glossary_Classes'
import Glossary_Spells from './components/Glossary_Spells'
import Glossary_Features from './components/Glossary_Features'
import Glossary_Skills from './components/Glossary_Skills'
import Glossary_Traits from './components/Glossary_Traits'
import Characters from './components/Characters'


function App() {


  return (
    <>
      <div id='page'>
        <Banner />
        <NavBar />
        <div id='content'>


          <Routes>
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
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
