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

    return (
        <CharacterDataContext.Provider value={{characters, setCharacters, handleClose}}>
            <div id='characterPageCont'>
                <div id='controlsCont'>
                    <Button variant='primary' id='newCharacterButton' className='charMngBtn' onClick={handleShow}>
                        + New
                    </Button>
                    <Button variant='danger' id='newCharacterButton' className='charMngBtn'>
                        Delete
                    </Button>
                </div>
                <div id='characterCont'>
                    {characters && characters.map((character, index) => (
                        <div className='charCard' key={index}>
                            <p>{character.name}</p>
                            <p>{character.race}</p>
                            <p>{character.class} Lvl. {character.lvl}</p>
                            <p>{character.alignment}</p>
                        </div>
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