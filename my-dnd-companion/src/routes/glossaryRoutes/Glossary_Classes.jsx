import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Glossary_Classes = () => {
  const { class: className } = useParams()
  const [classData, setClassData] = useState({})
  const [classProficiencies, setClassProficiencies] = useState([])

  const classImage = `../../assets/class_image_${className}.png`

  const classDataFetch = async () => {
    const response = await fetch(`https://www.dnd5eapi.co/api/classes/${className}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })

    const data = await response.json()

    console.log(data)
    setClassData(data)
    setClassProficiencies(data.proficiencies)
}

useEffect(() => {
    classDataFetch()
},[])

  return (
    <div className='glossary'>
      <img src={`../../assets/class_image_${className}.png`}></img>
      <h3>{classData.name}</h3>
      <h5>Hit Die: d{classData.hit_die}</h5>

      <div> 
        Proficiencies: 
        {classProficiencies.map((proficiency, index) => {
                  return(
                      <p key={index}>{proficiency.name}</p> 
                  )
                  })}
      
      </div>           
    </div>
  )
}

export default Glossary_Classes