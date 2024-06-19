import React, { useState, useContext, useEffect  } from 'react'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { CharacterDataContext } from '../../App'
import '../../stylesheets/characterSheet.css'

const StatBlock = () => {

    const { characters, setCharacter } = useContext(CharacterDataContext)

    const { currentChar } = useParams()

    const maxHp = (characters[currentChar].hitDie * characters[currentChar].level) + characters[currentChar].ability_scores.conMod

    const [currentHp, setCurrentHp] = useState(maxHp)

    const handleHp = (e) => {
        setCurrentHp(e)
    }

    useEffect(() => {
        console.log(characters)
        console.log('Current Character:', characters[currentChar])
    }, [])

    return (
        <div id='statBlock'>
            <div id='attrBlock'>
                <div className='statBox' style={{ display: 'flex', flexDirection: 'column' }}>
                    <label className='statLabel'>STR</label>
                    <h3>{characters[currentChar].ability_scores.str}</h3>
                    {/* <input type='number' /> */}
                    <p className='modifier'>{characters[currentChar].ability_scores.strMod > 0 ? '+' + characters[currentChar].ability_scores.strMod : characters[currentChar].ability_scores.strMod}</p>
                </div>
                <div className='statBox'>
                    <label className='statLabel'>DEX</label>
                    <h3>{characters[currentChar].ability_scores.dex}</h3>
                    {/* <input type='number' /> */}
                    <p className='modifier'>{characters[currentChar].ability_scores.dexMod > 0 ? '+' + characters[currentChar].ability_scores.dexMod : characters[currentChar].ability_scores.dexMod}</p>
                </div>
                <div className='statBox'>
                    <label className='statLabel'>CON</label>
                    <h3>{characters[currentChar].ability_scores.con}</h3>
                    {/* <input type='number' /> */}
                    <p className='modifier'>{characters[currentChar].ability_scores.conMod > 0 ? '+' + characters[currentChar].ability_scores.conMod : characters[currentChar].ability_scores.conMod}</p>
                </div>
                <div className='statBox'>
                    <label className='statLabel'>WIS</label>
                    <h3>{characters[currentChar].ability_scores.wis}</h3>
                    {/* <input type='number' /> */}
                    <p className='modifier'>{characters[currentChar].ability_scores.wisMod > 0 ? '+' + characters[currentChar].ability_scores.wisMod : characters[currentChar].ability_scores.wisMod}</p>
                </div>
                <div className='statBox'>
                    <label className='statLabel'>INT</label>
                    <h3>{characters[currentChar].ability_scores.int}</h3>
                    {/* <input type='number' /> */}
                    <p className='modifier'>{characters[currentChar].ability_scores.intMod > 0 ? '+' + characters[currentChar].ability_scores.intMod : characters[currentChar].ability_scores.intMod}</p>
                </div>
                <div className='statBox'>
                    <label className='statLabel'>CHA</label>
                    <h3>{characters[currentChar].ability_scores.cha}</h3>
                    {/* <input type='number' /> */}
                    <p className='modifier'>{characters[currentChar].ability_scores.chaMod > 0 ? '+' + characters[currentChar].ability_scores.chaMod : characters[currentChar].ability_scores.chaMod}</p>
                </div>
            </div>
            <div id='survivalStatBlock'>
                Total Hitpoints: {maxHp}
                <Form.Control type='number' size='lg' value={currentHp} onChange={(e) => handleHp(e.target.value)} max={maxHp} min='0'/>
                Temporary Hitpoints: 0
                Hit Dice: d{characters[currentChar].hitDie}
                Speed: {characters[currentChar].speed}
                AC: 
                <div>
                    <span style={{display:'flex'}}>Successess  <Form.Check type="radio" aria-label="radio 1" />  <Form.Check type="radio" aria-label="radio 1" />  <Form.Check type="radio" aria-label="radio 1" /></span>
                    <span style={{display:'flex'}}>Failures  <Form.Check type="radio" aria-label="radio 1" />  <Form.Check type="radio" aria-label="radio 1" />  <Form.Check type="radio" aria-label="radio 1" /></span>
                </div>
            </div>
        </div>
    )
}

export default StatBlock