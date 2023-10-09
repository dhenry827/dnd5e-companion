import React, { useState, useEffect } from 'react'

const Stats = () => {
    const [hp, setHp] = useState(Number)
    const [maxHp, setMaxHp] = useState(Number)
    const [str, setStr] = useState(Number)
    const [dex, setDex] = useState(Number)
    const [con, setCon] = useState(Number)
    const [wis, setWis] = useState(Number)
    const [int, setInt] = useState(Number)
    const [cha, setCha] = useState(Number)
    

    const handleMaxHP = async () => { 
        reponse = 'data fetch'
        data = 'data fetch to json'

        setMaxHp('fetched data')
    }

    const handleStr = async () => { //repeat for other stats
        let strMod = 0
        reponse = 'data fetch'
        data = 'data fetch to json'

        setStr('fetched data')

        if('conditional statement to determine strength mod'){
            strMod = interval
        }
    }

    useEffect(() => {
        handleMaxHP()
        handleStr()
    },[])
    
  return (
    <> 
    {/* These divs should be stacked on top of one another, while the elements inside should read sideways */}
    <div> {/* disiplays the current hp and the buttons to change the stat of hp */}{/* display: flex */}
        <button>-10</button> {/* buttons should all influence state of hp */}
        <button>-5</button>
        <button>-1</button>
        0
        <input value={hp}/> {/* type number or range */}
        maxHp
        <button>+1</button>
        <button>+5</button>
        <button>+10</button>
    </div>
    <div>

    </div>
    <div> {/* displays stats, modifiers and roll buttons for checks/saves */}
        <ul>
            <li> {/* display: inline or float */}
                <input />str {/* type: number */}
                <p>mod</p> {/* value of mod should change whenever value of stat reaches certain interval  */}
                <button>roll</button> {/* buttons should have a way to target and grab the value of asocciated stat and mod */}
            </li> 
            <li>
                <input />dex
                <p>mod</p>
                <button>roll</button>
            </li>
            <li>
                <input />con
                <p>mod</p>
                <button>roll</button>
            </li>
            <li>
                <input />wis
                <p>mod</p>
                <button>roll</button>
            </li>
            <li>
                <input />int
                <p>mod</p>
                <button>roll</button>
            </li>
            <li>
                <input />cha
                <p>mod</p>
                <button>roll</button>
            </li>
        </ul>
    </div>
  </>
  )
}

export default Stats