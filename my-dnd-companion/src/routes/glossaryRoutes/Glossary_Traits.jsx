import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const Glossary_Traits = () => {
    const { trait: traitName } = useParams()

    const [traitData, setTraitData] = useState([])
    const [raceData, setRaceData] = useState([])

    const traitDataFetch = async () => {
      const response = await fetch(`https://www.dnd5eapi.co/api/traits/${traitName}`, {
          method: "GET",
          headers: {
              "Accept": "application/json"
          }
      })

      const data = await response.json()

      console.log(data)

      setTraitData(data)
      setRaceData(data.races)

  }

  useEffect(() => {
      traitDataFetch()
  },[])

  return (
    <div className='glossary'>
      <h3>{traitData.name}</h3>
      <p>{traitData.desc}</p>
      <h4>Races</h4>
      <ul>
        {raceData.map((race, index) => {
          return(
            <li key={index}>
              {race.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Glossary_Traits