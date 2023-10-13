import React, {useState, useEffect } from 'react'
import Skill from '../../components/Skill'

const Glossary_Skills = () => {
    const [skillName, setSkillName] = useState([])

    const skillNameFetch = async () => {
        const response = await fetch('https://www.dnd5eapi.co/api/skills', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        // console.log(data)

        setSkillName(data.results)
    }

    useEffect(() => {
        skillNameFetch()
    },[])
    
  return (
    <div className='glossary'>
        <h2>Skills</h2>
        {skillName.map((skill, index) =>{
            return (
                <div key={index}>
                  <Skill url={skill.url}/>  
                </div>
            )
        })}
        
    </div>
  )
}

export default Glossary_Skills