import React, { useState, useEffect, useContext } from 'react'
import { CharacterDataContext } from '../App'
import StatBlock from './CharacterSheet/StatBlock'
import CharacterInfo from './CharacterSheet/CharacterInfo'


const CharacterSheet = () => {

    const { characters, setCharacters } = useContext(CharacterDataContext)


  return (
    <div id='characterSheet'>
      <CharacterInfo/>
      <StatBlock />
    </div>
  )
}

export default CharacterSheet