import React, {useState, useEffect} from 'react'

const Class = (props) => {

    const [class1, setClass1] = useState({})
    const [classDescription, setClassDescription] = useState([])

    const classFetch = async (url) => {
        
        const response = await fetch(`https://www.dnd5eapi.co${url}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        console.log(data)
        setClass1(data) 
        setClassDescription(data.desc)
    }

    useEffect(() => {
        classFetch(props.url)
    },[])

  return (
    <div>
        <h3>{class1.name}</h3>
    </div>
  )
}

export default Class