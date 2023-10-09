import React, { useState, useEffect, useContext, createContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import RaceFetch from './RaceFetch';
import ClassFetch from './RaceFetch';



export const RaceContext = createContext('')
export const RaceDataContext = createContext({ raceData: {}, setRaceData: () => { } }); // Define RaceDataContext

export const ClassContext = createContext('')
export const ClassDataContext = createContext({ classData: {}, setClassData: () => { } });

const CharacterCreator = () => {
    
    
    const [progress, setProgress] = useState(0)



    const [raceOptions, setRaceOptions] = useState([]) //state used to hold fetched race options for character building
    const [selectedRace, setSelectedRace] = useState(''); //state to hold the current race selected by the user. Is sent to the RaceFetch component to fetch data based on the users chosen race.
    const [raceData, setRaceData] = useState({ //state to hold the race information fetched from the RaceFetch component
        name: '',
        speed: '',
        abilityBonuses: [],
        size: '',
        languages: [],
        traits: [],
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
    };

    const [classOptions, setClassOptions] = useState([])
    const [selectedClass, setSelectedClass] = useState('');
    const [classData, setClassData] = useState({
        name: '',
        hitDie: 0,
        proficiencies: [],
        proficiencyChoices: [],
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
};

useEffect(() => {
    handleRacesFetch()
    handleClassesFetch()
}, [])

return (
    <div>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Character Creator
                    {/* <ProgressBar now={progress} /> */}
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>

                <Form.Group className="mb-3" >
                    <Form.Label>Race</Form.Label>
                    <Form.Select type="select" placeholder="Race" onChange={(e) => handleRaceSelect(e.target.value)} >
                        {raceOptions.map((raceOption, index) => (
                            <option key={index}>{raceOption.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <div>
                    <h3>Size: {raceData.size}</h3>
                    <h3>Speed: {raceData.speed}</h3>
                </div>

                {/* <div>
                        <h4>Proficiencies</h4>
                        <ul>
                        {raceData.proficiencies.map((proficiency, index) => (
                                <li key={index}>{proficiency.name}</li>
                             ))}
                        </ul>
                    </div> */}

                <div>
                    <h4>Traits</h4>
                    <ul>
                        {raceData.traits.map((trait, index) => (
                            <li key={index}>{trait.index}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4>Languages</h4>
                    <ul>
                        {raceData.languages.map((language, index) => (
                            <li key={index}>{language.index}</li>
                        ))}
                    </ul>
                </div>

                <Form.Group className="mb-3" >
                    <Form.Label>Class</Form.Label>
                    <Form.Select type="select" placeholder="Class" onChange={(e) => handleClassSelect(e.target.value)} >
                        {classOptions.map((classOption, index) => (
                            <option key={index}>{classOption.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <div>
                    <h3>Hit Die: d{classData.hitDie}</h3>

                    <h3>Proficiencies</h3>
                    <ul>
                        {classData.startingEquipment.map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul>

                    <h3>Spellcasting</h3>
                </div>

            </Modal.Body>
            <Modal.Footer>
                {/* <Button type='button'>Back</Button>
                    <Button type='button'>Next</Button> */}
                {/* <Button variant="primary" type="submit">
                        Submit
                    </Button> */}
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