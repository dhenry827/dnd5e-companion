import React, { useState, useEffect } from 'react'
import '../stylesheets/Glossary.css'

const Ability = (props) => {

    const [ability, setAbility] = useState({}) //initializes a state to hold the data for each ability
    const [description, setDescription] =useState([]) //initializes a state to hold the data for ability descriptions 
    const [skills, setSkills] =useState([]) //initializes a state to hold the data for each skill
    

    const abilityScoreFetch = async (url) => {//initializes a function that takes url as a parameter
        
        const response = await fetch(`https://www.dnd5eapi.co${url}`, { //using string interpolation, the endpoint for each ability fetched from glossaryABility
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        // console.log(data)
        setAbility(data) //sets ability state to represent data
        setDescription(data.desc)
        setSkills(data.skills)
    }

    useEffect(() => { //useEffect calls abilityScoreFetch function on initialization so that ability data is immediately available to users
        abilityScoreFetch(props.url) //calling 'props.url' to pass in url passed from glossaryAbility parent component
    },[])

  return (
    <div>
        <div>
            <h3>{ability.full_name} ({ability.name})</h3> 
            {description.map((desc, index) => { {/* maps through the description array to make a produce a tag with the fetched description */}
                return(
                    <p key={index}>{desc}</p> 
                )
                })}

           <p>Skills that rely on {ability.full_name}: 
                {skills.map((skill, index) => { {/* maps through skills array to list skills fetched from the api */}
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