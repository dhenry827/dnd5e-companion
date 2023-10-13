import React, { useState, useEffect } from 'react'
import Ability from '../../components/Ability'
import '../../stylesheets/Glossary.css'

const Glossary_Ability_Scores = () => {
    const [abilityName, setAbilityName] = useState([])

    const abilityNameFetch = async () => {
        const response = await fetch('https://www.dnd5eapi.co/api/ability-scores', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        console.log(data)

        setAbilityName(data.results)
    }

    useEffect(() => {
        abilityNameFetch()
    },[])

  return (
    <div className='glossary'>
        <h2>Ability Scores</h2>
        {abilityName.map((ability, index) => {
            return (
                <div key={index}>
                  <Ability url={ability.url}/>  
                </div>
            )
        })}
    </div>
  )
}

export default Glossary_Ability_Scores