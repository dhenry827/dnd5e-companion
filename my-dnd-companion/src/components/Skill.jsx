import React, {useState, useEffect} from 'react'

const Skill = (props) => {
    const [skill, setSkill] = useState({})
    const [ability, setAbility] = useState([])
    const [description, setDescription] = useState([])


    const skillFetch = async (url) => {
        const response = await fetch(`https://www.dnd5eapi.co${url}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        // console.log(data)
        setSkill(data)
        setAbility(data.ability_score)
        setDescription(data.desc)
    }

    useEffect(() => {
        skillFetch(props.url)
    },[])
    
  return (
    <div>
        <h3>{skill.name}</h3>
        <p>Ability Score: {ability.name}</p>
        {description.map((desc, index) => {
            return(
                <p key={index}>{desc}</p>
            )
        })}
        <p></p>

    </div>
  )
}

export default Skill