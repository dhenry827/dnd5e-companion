import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { CharacterDataContext } from '../../App'
import '../../stylesheets/characterSheet.css'
import Button from 'react-bootstrap/Button';

const StatBlock = () => {

    const { characters, setCharacters } = useContext(CharacterDataContext)

    const { currentChar } = useParams()

    // Calculates characters maximum health points based on cumulative hit dice per class level and constitution modifier
    const calcMaxHP = (classArr) => {
        let totalHP = 0
        for (let i = 0; i < classArr.length; i++) {
            totalHP += (classArr[i].hitDie * classArr[i].level)
        }

        totalHP = totalHP + characters[currentChar].ability_scores.conMod

        return totalHP
    }

    const maxHp = calcMaxHP(characters[currentChar].classes) 

    const [currentHp, setCurrentHp] = useState(maxHp)

    const handleHp = (e) => {
        setCurrentHp(e)
    }

    // Ensures that elements within death saves arrays are updated together instead of seperately. Also enables user to be able to update death saves manually or automatically. 
    const handleDeathSaveChange = (type, count, index = null) => {
        setCharacters((prevCharacters) => {
            const updatedCharacters = [...prevCharacters];
            const updatedDeathSaves = updatedCharacters[currentChar].death_saves;

            if (index !== null) { // Logic for manual death save updating
                if (type === 'successes') {
                    updatedDeathSaves.successes = updatedDeathSaves.successes.map((save, i) => i <= index);
                } else if (type === 'failures') {
                    updatedDeathSaves.failures = updatedDeathSaves.failures.map((save, i) => i <= index);
                }
            } else { // Logic for automatic death save updating
                // Add count of successes or failures
                if (type === 'successes') {
                    let currentCount = updatedDeathSaves.successes.filter(Boolean).length;
                    updatedDeathSaves.successes = updatedDeathSaves.successes.map((save, i) => i < currentCount + count);
                } else if (type === 'failures') {
                    let currentCount = updatedDeathSaves.failures.filter(Boolean).length;
                    updatedDeathSaves.failures = updatedDeathSaves.failures.map((save, i) => i < currentCount + count);
                }
            }

            updatedCharacters[currentChar].death_saves = updatedDeathSaves;

            // Checks if character has stabilized 
            if (updatedDeathSaves.successes.every((save) => save === true)) {
                setCurrentHp(1);
            }
            return updatedCharacters;
        });
    };

    // Allows automatic rolls for death saves
    const rollSave = () => {
        let roll = Math.round(1 + Math.random() * 19); // Generates a random number between 1 and 20.
        if (currentHp <= 0) {
            if (roll === 20) { //Checks for critical success
                handleDeathSaveChange('successes', 2); 
            } else if (roll >= 10 && roll < 20) { //Checks for success
                handleDeathSaveChange('successes', 1);
            } else if (roll > 1 && roll < 10) { // Checks for failure
                handleDeathSaveChange('failures', 1);
            } else if (roll === 1) { //Checks for critical failure
                handleDeathSaveChange('failures', 2);
            }
            console.log('Death Save: ' + roll);
        }
    };

    useEffect(() => { // Resets death saves if character has stabilized.
        if (currentHp >= 0) {
            setCharacters((prevCharacters) => {
                const updatedCharacters = [...prevCharacters];
                updatedCharacters[currentChar] = {
                    ...updatedCharacters[currentChar],
                    death_saves: { successes: [false, false, false], failures: [false, false, false] }
                };
                return updatedCharacters;
            });
        }
    }, [currentHp]);

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
                <Form.Control type='number' size='lg' value={currentHp} onChange={(e) => handleHp(e.target.value)} max={maxHp} min='0' />
                Temporary Hitpoints: 0
                Hit Dice: d{characters[currentChar].hitDie}
                Speed: {characters[currentChar].speed}
                AC:
                <div>
                    <span style={{ display: 'flex' }}>
                        Successes:
                        {characters[currentChar].death_saves.successes.map((save, index) => (
                            <Form.Check
                                key={index}
                                type="radio"
                                aria-label={`success radio ${index + 1}`}
                                checked={save}
                                onChange={() => handleDeathSaveChange('successes', 0, index)} // Toggle specific success save
                                disabled={currentHp > 0 || characters[currentChar].death_saves.failures.every((save) => save === true)}
                            />
                        ))}
                    </span>

                    <span style={{ display: 'flex' }}>
                        Failures:
                        {characters[currentChar].death_saves.failures.map((save, index) => (
                            <Form.Check
                                key={index}
                                type="radio"
                                aria-label={`failure radio ${index + 1}`}
                                checked={save}
                                onChange={() => handleDeathSaveChange('failures', 0, index)} // Toggle specific failure save
                                disabled={currentHp > 0 || characters[currentChar].death_saves.failures.every((save) => save === true)}
                            />
                        ))}
                    </span>
                    <Button type='button' onClick={rollSave} disabled={currentHp > 0 || characters[currentChar].death_saves.failures.every((save) => save === true)}>roll save</Button>
                </div>
            </div>
        </div>
    )
}

export default StatBlock