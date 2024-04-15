import React, { useState, useEffect, useContext, createContext } from 'react'
import { RaceDataContext, ClassDataContext } from './CharacterCreator'

const { raceData, setRaceData } = useContext(RaceDataContext);
const { classData, setClassData } = useContext(ClassDataContext);

const NewCharacterData = () => {

const {newCharacter, setNewCharacter} = useState({
    name: '',
    race: '',
    // subrace: '',
    class: '',
    lvl: 1,
    exp: 0,
    size: '',
    speed: 0,
    ability_scores: [],
    ability_bonuses: [],
    ideals: '',
    bonds: '',
    flaws: '',
    languages: [],
    traits: [],
    equipment: [],

})

const addRace = (raceData) => {
    setNewCharacter({...newCharacter, 
        race: raceData.name,
        size: raceData.size,
        speed: raceData.speed,
        proficiencies: [raceData.proficiencies],
        traits: raceData.traits
     })
     console.log(newCharacter)
}

const addClass = (classData) => {
    setNewCharacter({...newCharacter, 
        class: classData.name,
        hitDie: classData.hitDie,
        proficiencies: [...proficiencies, classData.proficiencies],
        equipment: classData.startingEquipment,
        // spellCastingAbility: classData.spellCastingAbility,
     })
     console.log(newCharacter)
}

const addStats = () => {
    setNewCharacter({...newCharacter,
        // ability_scores: 
    })
    console.log(newCharacter)
}

const addDetails = () => {
    setNewCharacter({...newCharacter,
    
    })
    console.log(newCharacter)
}

  return (
    null
  )
}

export default NewCharacterData