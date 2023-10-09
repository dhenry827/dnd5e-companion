import React, { useState, useEffect } from 'react'
import './Glossary.css'

const Ability = (props) => {

    const [ability, setAbility] = useState({})
    const [description, setDescription] =useState([])
    const [skills, setSkills] =useState([])
    

    const abilityScoreFetch = async (url) => {
        
        const response = await fetch(`https://www.dnd5eapi.co${url}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        // console.log(data)
        setAbility(data) 
        setDescription(data.desc)
        setSkills(data.skills)
    }

    useEffect(() => {
        abilityScoreFetch(props.url)
    },[])

  return (
    <div>
        <div>
            <h3>{ability.full_name} ({ability.name})</h3>
            {description.map((desc, index) => {
                return(
                    <p key={index}>{desc}</p> 
                )
                })}

           <p>Skills that rely on {ability.full_name}: 
                {skills.map((skill, index) => {
                    return(
                            ` ${skill.name} `
                    )
                })}
            </p>
        </div>

    </div>
  )
}

export default Ability