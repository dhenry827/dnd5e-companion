import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'


const Glossary_Races = () => {
    const { race: raceName } = useParams()
    const [raceData, setRaceData] = useState([])
    const [raceTraits, setRaceTraits] = useState([])

    const raceDataFetch = async () => {
      const response = await fetch(`https://www.dnd5eapi.co/api/races/${raceName}`, {
          method: "GET",
          headers: {
              "Accept": "application/json"
          }
      })

      const data = await response.json()
      
      console.log(data)

      setRaceData(data)
      setRaceTraits(data.traits)
  }

  useEffect(() => {
      raceDataFetch()
  },[raceName]) //raceName is added to dependency array so that whenever Params are changed, the component checks for changes to raceName in order to rerender

  return (
    <div className='glossary'>
      <h3>{raceData.name}</h3>
      <p>{raceData.alignment}</p>
      <p>
        Size: {raceData.size}<br/>
        {raceData.size_description}
      </p>
      <p>Speed: {raceData.speed}<br/>
        {raceData.language_desc}
      </p>
       
       <h4>Traits</h4>
        <ul>
          {raceTraits.map((trait, index) => {
            return(
              <li key={index}>
                <a href={`https://dnd5e-companion.vercel.app/glossary/traits/${trait.index}`}>{trait.name}</a>
              </li>
            )
          })}
        </ul>
    </div>
  )
}

export default Glossary_Races