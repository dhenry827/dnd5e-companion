import React, { useState, useEffect, useContext, createContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import RaceFetch from './RaceFetch';
import ClassFetch from './ClassFetch';
import PointBuy from './PointBuy';
import { CharacterDataContext } from '../App';
import { ModalViewContext } from './Characters';




export const RaceContext = createContext(''); // Defines a context for Race
export const RaceDataContext = createContext({ raceData: {}, setRaceData: () => { } }); // Defines a context for RaceData

export const ClassContext = createContext(''); //Defines a context for Class
export const ClassDataContext = createContext({ classData: {}, setClassData: () => { } }); // Defines a context for ClassData

export const AttributeDataContext = createContext();

const CharacterCreator = () => {

    // const { users, setUsers } = useContext(UserDataContext)
    const { characters, setCharacters } = useContext(CharacterDataContext);
    const handleClose = useContext(ModalViewContext);

    const [newCharacter, setNewCharacter] = useState({
        name: '',
        alignment: '',
        race: {
            name: '',
            subrace_name: ''
        },
        classes: [],
        exp: 0,
        size: '',
        speed: 0,
        death_saves: {
            successes: [false, false, false],
            failures: [false, false, false]
        },
        ability_scores: {
            str: 8,
            strMod: -1,
            dex: 8,
            dexMod: -1,
            con: 8,
            conMod: -1,
            wis: 8,
            wisMod: -1,
            int: 8,
            intMod: -1,
            cha: 8,
            chaMod: -1
        },
        ability_bonuses: [],
        ideals: '',
        bonds: '',
        flaws: '',
        background: '',
        languages: [],
        equipment: [],
    });

    const [progress, setProgress] = useState(0); // Initializes progress state to manage progression of form progressbar and next button
    const handleForwardsProgress = () => { // Creates a function to control the progress state
        if (progress === 100) {  // Prevents progress state from exceeding 100
            return
        }
        setProgress(progress + 25);
    };

    const handleBackwardsProgress = () => { // Initializes progress state to manage regression of form progressbar and back button
        if (progress === 0) { // Prevents progress state from being less than 0
            return
        }
        setProgress(progress - 25);
    };


    const [raceOptions, setRaceOptions] = useState([]) //state used to hold fetched race options for character building
    const [selectedRace, setSelectedRace] = useState(''); //state to hold the current race selected by the user. Is sent to the RaceFetch component to fetch data based on the users chosen race.
    const [selectedSubrace, setSelectedSubrace] = useState(''); //state to hold the current race selected by the user. Is sent to the RaceFetch component to fetch data based on the users chosen race.
    const [raceData, setRaceData] = useState({ //state to hold the race information fetched from the RaceFetch component
        name: '',
        subrace: [],
        size: '',
        speed: 0,
        abilityBonuses: [],
        proficiencies: [],
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
        };

    };

    const handleRaceSelect = (selectedRace) => {
        setSelectedRace(selectedRace.toLowerCase());
        console.log(typeof (selectedRace))
    };

    const handleSubraceSelect = (selectedSubrace) => {
        setSelectedSubrace(selectedSubrace.toLowerCase());
        console.log(typeof (selectedSubrace))
    };

    const addRace = (raceData) => {
        if (raceData.proficiencies && raceData.traits) {
            setNewCharacter({
                ...newCharacter,
                race: {
                    name: raceData.name,
                    subrace_name: raceData.subrace_name
                },
                size: raceData.size,
                speed: raceData.speed,
                proficiencies: [raceData.proficiencies],
                traits: [raceData.traits],

            })
        } else if (!raceData.proficiencies && raceData.traits) {
            setNewCharacter({
                ...newCharacter,
                race: {
                    name: raceData.name,
                    subrace_name: raceData.subrace_name
                },
                size: raceData.size,
                speed: raceData.speed,
                proficiencies: [],
                traits: raceData.traits,
            })
        } else if (raceData.proficiencies && !raceData.traits) {
            setNewCharacter({
                ...newCharacter,
                race: {
                    name: raceData.name,
                    subrace_name: raceData.subrace_name
                },
                size: raceData.size,
                speed: raceData.speed,
                proficiencies: [raceData.proficiencies],
                traits: [],
            })
        } else {
            setNewCharacter({
                ...newCharacter,
                race: {
                    name: raceData.name,
                    subrace_name: raceData.subrace_name
                },
                size: raceData.size,
                speed: raceData.speed,
                proficiencies: [],
                traits: [],
            })
        };
    };

    const [classOptions, setClassOptions] = useState([])
    const [selectedClass, setSelectedClass] = useState('');
    const [classData, setClassData] = useState({
        name: '',
        hitDie: 0,
        proficiencies: [],
        proficiencyOptions: 0,
        proficiencyChoices: [],
        startingEquipment: [],
        startEquipOptions: 0,
        startEquipChoices: [],
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
        };

    };

    const handleClassSelect = (selectedClass) => {
        setSelectedClass(selectedClass.toLowerCase())
    };

    const addClass = (classData) => {
        setNewCharacter(prevState => ({
            ...prevState,
            classes: [
                ...prevState.classes,
                {
                    name: classData.name,
                    level: 1,
                    hitDie: classData.hitDie,
                    equipment: classData.startingEquipment,
                    // spellCastingAbility: classData.spellCastingAbility,
                }
            ],
            proficiencies: [
                ...prevState.proficiencies,
                ...classData.proficiencies
            ],
        }));
        console.log(newCharacter);
    };

    const addClassProficiency = (skill) => {
        setNewCharacter(prevState => ({
            ...prevState,
            proficiencies: [
                ...prevState.proficiencies, skill
            ]
        }));
        console.log(newCharacter);
    };

    const [statMethod, setStatMethod] = useState('');

    const handleStatMethod = (selectedMethod) => {
        setStatMethod(selectedMethod);
        console.log(selectedMethod);
    };

    const handleName = (charName) => {
        const allowedCharacters = /^[a-zA-Z0-9\s]*$/;

        // Filter out unwanted characters
        charName = charName.split('').filter(char => allowedCharacters.test(char)).join('');


        setNewCharacter({ ...newCharacter, name: charName });
    };

    const handleAlignment = (charAlign) => {
        setNewCharacter({ ...newCharacter, alignment: charAlign });
    };

    const handleBonds = (charBonds) => {
        const allowedCharacters = /^[a-zA-Z0-9\s.,?!-]*$/;

        charBonds = charBonds.split('').filter(char => allowedCharacters.test(char)).join('');

        setNewCharacter({ ...newCharacter, bonds: charBonds });
    };

    const handleFlaws = (charFlaws) => {
        const allowedCharacters = /^[a-zA-Z0-9\s.,?!-]*$/;

        charFlaws = charFlaws.split('').filter(char => allowedCharacters.test(char)).join('');

        setNewCharacter({ ...newCharacter, flaws: charFlaws });
    };

    const handleIdeals = (charIdeals) => {
        const allowedCharacters = /^[a-zA-Z0-9\s.,?!-]*$/;

        charIdeals = charIdeals.split('').filter(char => allowedCharacters.test(char)).join('');

        setNewCharacter({ ...newCharacter, ideals: charIdeals });
    };

    const handleBackground = (charBackground) => {
        setNewCharacter({ ...newCharacter, background: charBackground })
    }

    const raceList = raceOptions.map((raceOption, index) => (
        <option key={index} value={raceOption.index}>{raceOption.name}</option>
    ));

    const subRaceList = raceData.subrace.map((subraces, index) => (
        <option key={index} value={subraces.index}>{subraces.name}</option>
    ));

    const classList = classOptions.map((classOption, index) => (
        <option key={index} value={classOption.index}>{classOption.name}</option>
    ));

    const handleSubmit = (e) => {
        e.preventDefault()

        setCharacters([...characters, newCharacter]);
        console.log(newCharacter, "at submission");
        handleClose();
    };

    useEffect(() => {
        handleRacesFetch();
        handleClassesFetch();
    }, [newCharacter, selectedRace, selectedSubrace, selectedClass]);

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
                            <h5>Race Selection</h5>
                            <Form.Group id="raceSelection" className="mb-3" >

                                {/* <Form.Label>Race</Form.Label> */}
                                <Form.Select type="select" value={selectedRace} onChange={(e) => handleRaceSelect(e.target.value)} required>
                                    <option value='none' hidden>Select a Race (Required)</option>
                                    {raceList}
                                </Form.Select>
                                {!selectedRace ? null : (
                                    <>
                                        <div>
                                            {raceData.subrace.length > 0 ? (
                                                <>
                                                    {/* <Form.Label>Subrace</Form.Label> */}
                                                    <Form.Select type="select" placeholder="Subrace" value={selectedSubrace} onChange={(e) => handleSubraceSelect(e.target.value)} required>
                                                        <option value='none' hidden>Select a Subrace (Optional)</option>
                                                        {subRaceList}
                                                    </Form.Select>
                                                </>
                                            ) : null}
                                        </div>
                                        <div>
                                            <h3>Size: {raceData.size}</h3>
                                            <h3>Speed: {raceData.speed}</h3>
                                        </div>

                                        <div>
                                            <h4>Ability Bonuses</h4>
                                            <ul>
                                                {raceData.abilityBonuses.map((ability, index) => (
                                                    <li key={index}>{ability.ability_score.name}: +{ability.bonus}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4>Proficiencies</h4>
                                            <ul>
                                                {raceData.proficiencies ?
                                                    <>
                                                        {
                                                            raceData.proficiencies.map((proficiency, index) => (
                                                                <li key={index}>{proficiency.name}</li>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    <li>None</li>
                                                }

                                            </ul>
                                        </div>

                                        <div>
                                            <h4>Traits</h4>
                                            <ul>
                                                {raceData.traits.map((trait, index) => (
                                                    <li key={index}>{trait.name}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4>Languages</h4>
                                            <ul>
                                                {raceData.languages.map((language, index) => (
                                                    <li key={index}>{language.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </Form.Group>
                        </>
                    ) : null}


                    {progress === 25 ? (
                        <>
                            <h5>Class Selection</h5>
                            <Form.Group id="classSelection" className="mb-3" >
                                <Form.Label>Class</Form.Label>
                                <Form.Select type="select" placeholder="Class" value={selectedClass} onChange={(e) => handleClassSelect(e.target.value)} required>
                                    <option value='none' hidden>Select a Class (Required)</option>
                                    {classList}
                                </Form.Select>
                                {!selectedClass ? null : (
                                    <>
                                        {classData.spellCastingAbility === null ?
                                            (
                                                <div>
                                                    <h3>Hit Die: d{classData.hitDie}</h3>


                                                    <h3>Proficiencies</h3>
                                                    <ul>
                                                        {classData.proficiencies.map((item, index) => (
                                                            <li key={index}>{item.name}</li>
                                                        ))}
                                                    </ul>


                                                    <p>Choose {classData.proficiencyOptions}</p>

                                                    <h3>Starting Equipment</h3>
                                                    <ul>
                                                        {classData.startingEquipment.map((item, index) => (
                                                            <li key={index}>{item.equipment.name} x {item.quantity}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div>
                                                    <h3>Hit Die: d{classData.hitDie}</h3>


                                                    <h3>Proficiencies</h3>
                                                    <ul>
                                                        {classData.proficiencies.map((item, index) => (
                                                            <li key={index}>{item.name}</li>
                                                        ))}
                                                    </ul>

                                                    <>
                                                        <Form.Label>Choose {classData.proficiencyOptions} from:</Form.Label>
                                                        {classData.proficiencyChoices.map((choice, index) => (
                                                            <Form.Check
                                                                key={index}
                                                                type="checkbox"
                                                                label={choice.item.name}
                                                                onChange={() => { addClassProficiency(choice.item) }}
                                                            />
                                                        ))}
                                                    </>


                                                    <h3>Starting Equipment</h3>
                                                    <ul>
                                                        {classData.startingEquipment.map((item, index) => (
                                                            <li key={index}>{item.equipment.name} x {item.quantity}</li>
                                                        ))}
                                                    </ul>


                                                    <>
                                                        <Form.Label>Choose {classData.startEquipOptions} from:</Form.Label>
                                                        {classData.startEquipChoices.map((choice, index) => (
                                                            <span key={index}><br />
                                                                {choice.desc}
                                                                {/* {choice.options[index].option_type === "counted_reference" ? (
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        label={choice.options[index].count}
                                                                    />
                                                                ) : (
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        label={1}
                                                                    />
                                                                )} */}

                                                            </span>
                                                        ))}
                                                    </>


                                                    <h3>Spellcasting</h3>
                                                    Spellcasting Ability: {classData.spellCastingAbility}
                                                    {/* <ul>
                                                        {classData.spellCastingAbilityDesc.map((desc, index) => (
                                                            <li key={index}>{desc.name}</li>
                                                        ))}
                                                        </ul> */}
                                                </div>
                                            )}
                                    </>
                                )}
                            </Form.Group>

                        </>
                    ) : null}


                    <AttributeDataContext.Provider value={{ newCharacter, setNewCharacter }}>
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

                    </AttributeDataContext.Provider>
                    {progress === 75 ?
                        (
                            <>
                                <h5>Character Details</h5>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' value={newCharacter.name} placeholder='Enter Character Name (Required)' onChange={(e) => handleName(e.target.value)} required></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Alignment</Form.Label>
                                    <Form.Select value={newCharacter.alignment} onChange={(e) => handleAlignment(e.target.value)} required>
                                        <option value='none' hidden>Select an Alignment (Required)</option>
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
                                    <Form.Control type='text' as="textarea" rows={3} value={newCharacter.ideals} placeholder='Enter your characters ideals... (Optional)' onChange={(e) => handleIdeals(e.target.value)} required></Form.Control>
                                    <Form.Label>Bonds</Form.Label>
                                    <Form.Control type='text' as="textarea" rows={3} value={newCharacter.bonds} placeholder='Enter your characters bonds... (Optional)' onChange={(e) => handleBonds(e.target.value)} required></Form.Control>
                                    <Form.Label>Flaws</Form.Label>
                                    <Form.Control type='text' as="textarea" rows={3} value={newCharacter.flaws} placeholder='Enter your characters flaws... (Optional)' onChange={(e) => handleFlaws(e.target.value)} required></Form.Control>
                                    <Form.Label>Background</Form.Label>
                                    <Form.Select value={newCharacter.background} onChange={(e) => handleBackground(e.target.value)} required>
                                        <option value='none' hidden>Select a Background (Required)</option>
                                        <option>Acolyte</option>
                                    </Form.Select>
                                </Form.Group>
                            </>
                        ) : null}

                    {progress === 100 ?
                        (
                            <>
                                <h3>Review Your Character</h3>
                                <>
                                    <p><b>Name: </b>{newCharacter.name}</p>
                                    <p><b>Race: </b>{newCharacter.race.subrace_name.length > 0 ?
                                        <>{newCharacter.race.subrace_name}</> :
                                        <>{newCharacter.race.name}</>
                                    }</p>
                                    <p><b>Class: </b>{newCharacter.classes[0].name} Lvl. {newCharacter.classes[0].level}</p>
                                    <p><b>Alignment: </b>{newCharacter.alignment}</p>
                                    <p><b>Ideals: </b>{newCharacter.ideals}</p>
                                    <p><b>Bonds: </b>{newCharacter.bonds}</p>
                                    <p><b>Flaws: </b>{newCharacter.flaws}</p>
                                    <p><b>Background: </b>{newCharacter.background}</p>
                                </>
                                <>
                                    <p>Strength: {newCharacter.ability_scores.str}</p>
                                    <p>Dexterity: {newCharacter.ability_scores.dex}</p>
                                    <p>Constitution: {newCharacter.ability_scores.con}</p>
                                    <p>Charisma: {newCharacter.ability_scores.cha}</p>
                                    <p>Intelligence: {newCharacter.ability_scores.int}</p>
                                    <p>Wisdom: {newCharacter.ability_scores.wis}</p>
                                </>

                                {/* <>
                                    <b>Proficiencies:</b>
                                    
                                </> */}
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
                        ) : progress === 0 ? (
                            <>
                                <Button type='button' onClick={() => { addRace(raceData); handleForwardsProgress() }} disabled={!selectedRace}>Next</Button>
                            </>
                        ) : progress === 25 ? (
                            <>
                                <Button type='button' onClick={() => { addClass(classData); handleForwardsProgress() }} disabled={!selectedClass}>Next</Button>
                            </>
                        ) : progress === 50 ? (
                            <>
                                <Button type='button' onClick={() => { handleForwardsProgress() }}>Next</Button>
                            </>
                        ) : progress === 75 ? (
                            <>
                                <Button type='button' onClick={() => { handleForwardsProgress() }} disabled={newCharacter.name === '' || newCharacter.alignment === '' || newCharacter.background === ''}>Next</Button>
                            </>
                        ) :
                            <>
                                <Button type='button' onClick={handleForwardsProgress}>Next</Button>
                            </>
                    }

                </Modal.Footer>
            </Form>

            <RaceContext.Provider value={{ selectedRace, selectedSubrace, setSelectedSubrace }}>
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
    );
};

export default CharacterCreator;