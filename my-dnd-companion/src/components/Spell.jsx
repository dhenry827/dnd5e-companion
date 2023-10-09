import React, { useState, useEffect } from 'react'

const Spell = (props) => {

    const [spell, setSpell] = useState({})
    const [spellSchool, setSpellSchool] = useState({})
    const [description, setDescription] = useState([])

    

    const spellFetch = async (url) => {
        
        const response = await fetch(`https://www.dnd5eapi.co${url}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        console.log(data)
        setSpell(data) 
        setSpellSchool(data.school) 
        setDescription(data.desc) 
       
    }

    useEffect(() => {
        spellFetch(props.url)
      },[])

  return (
    <div>
        <h3>{spell.name} ({spellSchool.name})</h3>
        <p>Casting time: {spell.casting_time}</p>
        <p>Range: {spell.range}</p>

        {description.map((desc, index) => {
            return(
                <p key={index}>{desc}</p>
            )
        })}
    </div>
  )
}

export default Spell