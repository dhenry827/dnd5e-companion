import React, { useState, useEffect, useContext, createContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import RaceFetch from './RaceFetch';
import ClassFetch from './ClassFetch';
import PointBuy from './PointBuy';
import { CharacterDataContext } from './Characters';




export const RaceContext = createContext('') // Defines a context for Race
export const RaceDataContext = createContext({ raceData: {}, setRaceData: () => { } }); // Defines a context for RaceData

export const ClassContext = createContext('') //Defines a context for Class
export const ClassDataContext = createContext({ classData: {}, setClassData: () => { } }); // Defines a context for ClassData


const CharacterCreator = () => {

    // const { users, setUsers } = useContext(UserDataContext)

    const [progress, setProgress] = useState(0) // Initializes progress state to manage progression of form progressbar and next button
    const handleForwardsProgress = () => { // Creates a function to control the progress state
        if (progress === 100) {  // Prevents progress state from exceeding 100
            return
        }
        setProgress(progress + 25)
        // console.log(progress)
    }
    const handleBackwardsProgress = () => { // Initializes progress state to manage regression of form progressbar and back button
        if (progress === 0) { // Prevents progress state from being less than 0
            return
        }
        setProgress(progress - 25)
        console.log(progress)
    }

    const [statMethod, setStatMethod] = useState('')

    const handleStatMethod = (selectedMethod) => {
        setStatMethod(selectedMethod);
        console.log(selectedMethod)
    };


    const [raceOptions, setRaceOptions] = useState([]) //state used to hold fetched race options for character building
    const [selectedRace, setSelectedRace] = useState(''); //state to hold the current race selected by the user. Is sent to the RaceFetch component to fetch data based on the users chosen race.
    const [raceData, setRaceData] = useState({ //state to hold the race information fetched from the RaceFetch component
        name: '',
        speed: '',
        abilityBonuses: [],
        proficiencies: [],
        size: '',
        languages: [],
        traits: []
    });


    const handleRacesFetch = async () => {

        //line 40-46 attempts to fecth a list of races from the api.
        try {
            const response = await fetch(`https://www.dnd5eapi.co/api/races`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
            //if the request is successful the data is converted to json and the raceOptions stte is set to the results array of data. 
            if (response.ok) {
                const data = await response.json()

                // console.log(data.results)
                setRaceOptions(data.results)
            } else {
                console.error('Failed to fetch race data');
            }
        } catch (error) { //If an error occurs while fetching the data out catch block will log an error message to the console.
            console.error('Error while fetching race data:', error);
        }

    }

    const handleRaceSelect = (selectedRace) => {
        setSelectedRace(selectedRace.toLowerCase());
        setCharRace(selectedRace)
    };

    const [classOptions, setClassOptions] = useState([])
    const [selectedClass, setSelectedClass] = useState('');
    const [classData, setClassData] = useState({
        name: '',
        hitDie: 0,
        proficiencies: [],
        proficiencyChoices: [],
        proficiencyChoicesNum: 0,
        startingEquipment: [],
        startingEquipmentChoices: [],
        spellCastingAbility: '',
        spellCastingAbilityDesc: []
    });



    const handleClassesFetch = async () => {

        try {
            const response = await fetch(`https://www.dnd5eapi.co/api/classes`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
            if (response.ok) {
                const data = await response.json()

                // console.log(data.results)
                setClassOptions(data.results)
            } else {
                console.error('Fail to fetch class data.')
            }
        } catch (error) {
            console.error('Error while fetching class data:', error);
        }

    }

    const handleClassSelect = (selectedClass) => {
        setSelectedClass(selectedClass.toLowerCase())
        setCharClass(selectedClass)
    };



    const { characters, setCharacters, handleClose } = useContext(CharacterDataContext)


    const handleSubmit = (e) => {
        e.preventDefault()

        const newCharacter = {
            name: charName,
            race: charRace,
            class: charClass,
            lvl: charLvl,
            alignment: charAlign
        }
        setCharacters([...characters, newCharacter])
        console.log(newCharacter, "at submission")
        handleClose()
    }

    // name: '',
    // alignment: '',
    // ideals: '',
    // bonds: '',
    // flaws: '',
    // race: '',
    // size: '',
    // traits: [],
    // languages: [],
    // class: '',
    // proficiencies: [],
    // spellCastingAbility: '',
    // equipment: [],
    // level: 1,
    // experiece: 0


    const [charName, setCharName] = useState('')
    const [charRace, setCharRace] = useState('')
    const [charClass, setCharClass] = useState('')
    const [charLvl, setCharLvl] = useState(1)
    const [charAlign, setCharAlign] = useState('True Neutral')

    const handleName = (e) => {
        setCharName(e)
        // console.log(charName)
    }

    const handleAlignment = (e) => {
        setCharAlign(e)
        // console.log(charAlign)
    }

    const raceList = raceOptions.map((raceOption, index) => (
        <option key={index}>{raceOption.name}</option>
    ))

    const classList = classOptions.map((classOption, index) => (
        <option key={index}>{classOption.name}</option>
    ))

    useEffect(() => {
        handleRacesFetch()
        handleClassesFetch()
    }, [])

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Character Creator
                        <ProgressBar now={progress} label={`${progress}`} />
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>
                    {progress === 0 ? (
                        <>
                            <h5>Select Your Race</h5>
                            <Form.Group id="raceSelection" className="mb-3" >
                                <Form.Label>Race</Form.Label>
                                <Form.Select type="select" placeholder="Race" onChange={(e) => handleRaceSelect(e.target.value)} required>
                                    <option value='none' hidden></option>
                                    {raceList}
                                </Form.Select>
                                {/* {raceData === '' ? null : (
                                    <> */}
                                <div>
                                    <h3>Size: {raceData.size}</h3>
                                    <h3>Speed: {raceData.speed}</h3>
                                </div>

                                <div>
                                    <h4>Proficiencies</h4>
                                    <ul>
                                        {raceData.proficiencies.map((proficiency, index) => (
                                            <li key={index}>{proficiency.name}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    {/* {raceData.traits != null ? (
                                                <> */}
                                    <h4>Traits</h4>
                                    <ul>
                                        {raceData.traits.map((trait, index) => (
                                            <li key={index}>{trait.name}</li>
                                        ))}
                                    </ul>
                                    {/* </>
                                            ) : null} */}
                                </div>

                                <div>
                                    <h4>Languages</h4>
                                    <ul>
                                        {raceData.languages.map((language, index) => (
                                            <li key={index}>{language.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                {/* </>
                                )} */}
                            </Form.Group>
                        </>
                    ) : null}


                    {progress === 25 ? (
                        <>
                            <h5>Select Your Class</h5>
                            <Form.Group id="classSelection" className="mb-3" >
                                <Form.Label>Class</Form.Label>
                                <Form.Select type="select" placeholder="Class" onChange={(e) => handleClassSelect(e.target.value)} >
                                    <option value='none' hidden></option>
                                    {classList}
                                </Form.Select>

                                <div>
                                    <h3>Hit Die: d{classData.hitDie}</h3>


                                    <h3>Proficiencies</h3>
                                    <ul>
                                        {classData.proficiencies.map((item, index) => (
                                            <li key={index}>{item.name}</li>
                                        ))}
                                    </ul>


                                    <h3>Starting Equipment</h3>
                                    <ul>
                                        {classData.startingEquipment.map((item, index) => (
                                            <li key={index}>{item.equipment.name} x {item.quantity}</li>
                                        ))}
                                    </ul>



                                    <h3>Spellcasting</h3>
                                    Spellcasting Ability: {classData.spellCastingAbility}
                                    {/* <ul>
                               {classData.spellCastingAbilityDesc.map((desc, index) => (
                                   <li key={index}>{desc.name}</li>
                                   ))}
                                </ul> */}
                                </div>
                            </Form.Group>

                        </>
                    ) : null}



                    {progress === 50 ?
                        (
                            <>
                                {/* <Form.Group>
                                <Form.Label>Ability Scores</Form.Label>
                                <Form.Select type="select" onChange={(e) => handleStatMethod(e.target.value)}>
                                    <option>Roll Stats</option>
                                    <option>Point Buy</option>
                                    <option>Choose from Preset</option>
                                </Form.Select>
                            </Form.Group> */}
                                <PointBuy />
                            </>
                        )
                        : null}

                    {progress === 75 ?
                        (
                            <>
                                <h5>Character Details</h5>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' placeholder='Enter Character Name' value={charName} onChange={(e) => handleName(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Alignment</Form.Label>
                                    <Form.Select value={charAlign} onChange={(e) => handleAlignment(e.target.value)} required>
                                        <option>Lawful Good</option>
                                        <option>Lawful Neutral</option>
                                        <option>Lawful Evil</option>
                                        <option>Neutral Good</option>
                                        <option>True Neutral</option>
                                        <option>Neutral Evil</option>
                                        <option>Chaotic Good</option>
                                        <option>Chaotic Neutral</option>
                                        <option>Chaotic Evil</option>
                                    </Form.Select>
                                    <Form.Label>Ideals</Form.Label>
                                    <Form.Control type='text' placeholder='Ideals' required></Form.Control>
                                    <Form.Label required>Bonds</Form.Label>
                                    <Form.Control type='text' placeholder='Bonds' required></Form.Control>
                                    <Form.Label>Flaws</Form.Label>
                                    <Form.Control type='text' placeholder='Flaws' required></Form.Control>
                                    <Form.Label>Background</Form.Label>
                                    <Form.Select required>
                                        <option>Acolyte</option>
                                    </Form.Select>
                                </Form.Group>
                            </>
                        ) : null}

                    {progress === 100 ?
                        (
                            <>
                                <h3>Review Your Character</h3>
                                <p><b>Name: </b>{charName}</p>
                                <p><b>Race: </b>{charRace}</p>
                                <p><b>Class: </b>{charClass}</p>
                                <p><b>Lvl: </b>{charLvl}</p>
                                <p><b>Alignment: </b>{charAlign}</p>
                            </>
                        ) : null}

                </Modal.Body>

                <Modal.Footer>

                    {progress === 0 ? (
                        <Button type='button' onClick={handleBackwardsProgress} disabled>Back</Button>
                    ) : (
                        <>
                            <Button type='button' onClick={handleBackwardsProgress}>Back</Button>
                        </>
                    )}

                    {progress != 100 ? (
                        <Button variant="primary" type="submit" disabled>
                            Submit
                        </Button>
                    ) : (

                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    )}

                    {progress === 100 ?
                        (
                            <>
                                <Button type='button' onClick={handleForwardsProgress} disabled>Next</Button>
                            </>
                        ) : (
                            <>
                                <Button type='button' onClick={handleForwardsProgress}>Next</Button>
                            </>
                        )}

                </Modal.Footer>
            </Form>


            <RaceContext.Provider value={selectedRace}>
                <RaceDataContext.Provider value={{ raceData, setRaceData }}>
                    <RaceFetch />
                </RaceDataContext.Provider>
            </RaceContext.Provider>
            <ClassContext.Provider value={selectedClass}>
                <ClassDataContext.Provider value={{ classData, setClassData }}>
                    <ClassFetch />
                </ClassDataContext.Provider>
            </ClassContext.Provider>


        </div>
    )
}

export default CharacterCreator