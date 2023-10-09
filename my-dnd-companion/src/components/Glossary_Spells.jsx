import React, { useState, useEffect } from 'react'
import Spell from './Spell'

const Glossary_Spells = () => {
  const [spellName, setSpellName] = useState([])

    const spellNameFetch = async () => {
        const response = await fetch('https://www.dnd5eapi.co/api/spells', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        console.log(data)

        setSpellName(data.results)
    }

    useEffect(() => {
        spellNameFetch()
    },[])
    
  return (
    <div className='glossary'>
      {spellName.map((spell, index) => {
        return(
          <p key={index}>
            <Spell url={spell.url}/>
          </p>
        )
      })}
    </div>
  )
}

export default Glossary_Spells