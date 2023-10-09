import React, {useState, useEffect} from 'react'

const Race = (props) => {

    const [race, setRace] = useState({})

    const raceFetch = async (url) => {
        
        const response = await fetch(`https://www.dnd5eapi.co${url}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        // console.log(data)
        setRace(data) 
    }

    useEffect(() => {
        raceFetch(props.url)
    },[])

  return (
    <div>
        <h3>{race.name}</h3>
    </div>
  )
}

export default Race