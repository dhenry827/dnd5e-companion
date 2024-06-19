import React, { useState, createContext, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../stylesheets/Characters.css';
import CharacterCreator from './CharacterCreator';
import { Link } from 'react-router-dom';
import { CharacterDataContext, UserDataContext } from '../App';

// Context to manage the state of the character creation modal (show/hide)
export const ModalViewContext = createContext(); 

const Characters = () => {
    const { characters, setCharacters } = useContext(CharacterDataContext);

    // State for contolling view of character creation modal. false = modal hidden
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true) ;
    const handleClose = () => setShow(false);

    // Function to enable character deletion
    const handleDelete = (index) => { 
        const updatedCharacters = characters.filter((_, i) => i !== index);
        setCharacters(updatedCharacters);
    }

    useEffect(() => {
        // Log the 'characters' array for debugging purposes
        console.log(characters);
    },[characters]);

    return (
            <div id='characterPageCont'>
                <div id='controlsCont'>
                   {/* Button to open the character creation modal */}
                    <Button variant='primary' id='newCharacterButton' className='charMngBtn' onClick={handleShow}>
                        + New
                    </Button>
                </div>

                <div id='characterCont'>
               {/* Create a clickable card for each character in the 'characters' array */}
                    {characters.map((character, index) => ( 
                        <div key={index} style={{display: 'flex'}}>
                        <Link to={`/Characters/${index}`}  className='charCard'  >
                            <Button className='charCard'>
                            <div className='charInfo' >
                                <p>{character.name}</p>
                                {character.race.subrace_name.length > 0 ?
                                <p>{character.race.subrace_name}</p> :
                                <p>{character.race.name}</p>}
                                <p>{character.classes[0].name} Lvl. {character.classes[0].level}</p>
                                <p>{character.alignment}</p>
                                </div>
                            </Button>
                         </Link> 

                            {/* Enables character deletion based on character 'index' */}
                            <Button
                                variant='danger'
                                className='charDelBtn'
                                onClick={() => handleDelete(index)}
                                style={{zIndex: '1000'}}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>

                <ModalViewContext.Provider value={handleClose}>
                <Modal show={show} onHide={handleClose}>
                    <CharacterCreator />
                </Modal>
                </ModalViewContext.Provider>
            </div>
    );
};

export default Characters;