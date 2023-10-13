import React, { useState, useEffect } from 'react'

const Glossary_Features = () => {

  const [feature, setFeature] = useState({})
  
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
    <div>
      
    </div>
  )
}

export default Glossary_Features