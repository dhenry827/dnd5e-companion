import React, { useState, createContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../stylesheets/Characters.css'
import CharacterCreator from './CharacterCreator';

export const CharacterDataContext = createContext();



const Characters = () => {

    const [userCharacter, setUserCharacter] = useState([])
    const [characters, setCharacters] = useState([])
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [level, setLevel] = useState(0)
    const [race, setRace] = useState('')
    const [size, setSize] = useState('')
    const [speed, setSpeed] = useState(0)
    const [proficiences, setProficiencies] = useState([])
    const [traits, setTraits] = useState([])

    const handleCharacter = () => setCharacter({
        name: name,
        level: level,
        race: race,
        size: size,
        speed: speed,
        traits: traits,
        proficiences: proficiences
    })


    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleDelete = (index) => {
        const updatedCharacters = characters.filter((_, i) => i !== index);
        setCharacters(updatedCharacters);
    }

    return (
        <CharacterDataContext.Provider value={{ characters, setCharacters, handleClose }}>
            <div id='characterPageCont'>
                <div id='controlsCont'>
                    <Button variant='primary' id='newCharacterButton' className='charMngBtn' onClick={handleShow}>
                        + New
                    </Button>
                </div>
                <div id='characterCont'>
                    {characters && characters.map((character, index) => (
                     
                        <button className='charCard' key={index}>
                            <div className='charInfo' >
                                <p>{character.name}</p>
                                <p>{character.race}</p>
                                <p>{character.class} Lvl. {character.lvl}</p>
                                <p>{character.alignment}</p>
                            <Button
                                variant='danger'
                                className='charDelBtn'
                                onClick={() => handleDelete(index)}
                            >
                                Delete
                            </Button>
                            </div>
                        </button>
                     

                    ))}
                </div>
                <Modal show={show} onHide={handleClose}>
                    <CharacterCreator />
                </Modal>
            </div>
        </CharacterDataContext.Provider>
    )
}

export default Characters