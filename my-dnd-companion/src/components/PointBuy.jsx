import React, { useState, createContext, useContext, useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Statmods from './Statmods';
import { AttributeDataContext } from './CharacterCreator';

// export const StatDataContext = useContext({attributes: {}, setAttributes: () => { }})

const PointBuy = () => {

  const { newCharacter, setNewCharacter } = useContext(AttributeDataContext);

  const [pointTotal, setPointTotal] = useState(27);

  const calculateModifier = (value) => {
    return Math.floor((value - 10) / 2);
  }

  const handlePoints = (attrName, newValue) => {
    const currentValue = newCharacter.ability_scores[attrName];
    const parsedNewValue = parseInt(newValue); // Ensure newValue is an integer

    console.log(`currentValue: ${currentValue}, New Value: ${parsedNewValue}`)
    let newPointTotal = pointTotal;
    if (parsedNewValue > currentValue) {
      if (parsedNewValue >= 14 && parsedNewValue <= 17) {
        newPointTotal -= 2;
      } else {
        newPointTotal -= 1;
      }
    } else if (parsedNewValue < currentValue) {
      return
    }

    if (newPointTotal >= 0 && newPointTotal <= 27) {
      setNewCharacter({
        ...newCharacter,
        ability_scores: {
          ...newCharacter.ability_scores,
          [attrName]: parsedNewValue,
          [`${attrName}Mod`]: calculateModifier(parsedNewValue)
        }
      });
      setPointTotal(newPointTotal);
    }
  };

  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset(true);
  }

  useEffect(() => {
    // Initalizes base ability scores
    const baseAbilityScores = {
      str: 8,
      dex: 8,
      con: 8,
      wis: 8,
      int: 8,
      cha: 8,
    };
  
    // Function to calculate ability scores with bonuses and modifiers
    const calculateAbilityScores = () => {
      
      const abilityScoresWithBonuses = { ...baseAbilityScores };
  
      // Iterate over ability bonuses and update the corresponding ability score
      newCharacter.ability_bonuses.forEach((bonusObj) => {
        const { index } = bonusObj.ability_score;
        const { bonus } = bonusObj;
  
        if (abilityScoresWithBonuses.hasOwnProperty(index)) {
          abilityScoresWithBonuses[index] += bonus;
        }
      });
  
      // Calculates modifiers and add them to the ability scores object
      const abilityScoresWithModifiers = {};
      Object.keys(abilityScoresWithBonuses).forEach((key) => {
        abilityScoresWithModifiers[key] = abilityScoresWithBonuses[key];
        abilityScoresWithModifiers[`${key}Mod`] = calculateModifier(abilityScoresWithBonuses[key]);
      });
  
      return abilityScoresWithModifiers;
    };
  
    // Gets the calculated ability scores with bonuses and modifiers
    const updatedAbilityScores = calculateAbilityScores();
  
    setNewCharacter({
      ...newCharacter,
      ability_scores: updatedAbilityScores
    });
  
    // Resets the point total
    setPointTotal(27);
    
    setReset(false);
  },[reset])

  useEffect(() => {
    console.log('ability scores:', newCharacter.ability_scores);
  }, [])

  return (
    <div className='point-selector'>
      <Form.Group className="stat-Form">
        <Col>
          <Row className='stat-group'>
            <div>
              <Form.Label>Strength</Form.Label>
              <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={17} value={newCharacter.ability_scores.str} onChange={(e) => handlePoints('str', e.target.value)}></Form.Control>
              <p>({newCharacter.ability_scores.strMod})</p>
            </div>
            <div>
              <Form.Label>Dexterity</Form.Label>
              <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={17} value={newCharacter.ability_scores.dex} onChange={(e) => handlePoints('dex', e.target.value)}></Form.Control>
              <p>({newCharacter.ability_scores.dexMod})</p>
            </div>
          </Row>
        </Col>
        <Col>
          <Row className='stat-group'>
            <div>
              <Form.Label>Constitution</Form.Label>
              <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={17} value={newCharacter.ability_scores.con} onChange={(e) => handlePoints('con', e.target.value)}></Form.Control>
              <p>({newCharacter.ability_scores.conMod})</p>
            </div>
            <div>
              <Form.Label>Wisdom</Form.Label>
              <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={17} value={newCharacter.ability_scores.wis} onChange={(e) => handlePoints('wis', e.target.value)}></Form.Control>
              <p>({newCharacter.ability_scores.wisMod})</p>
            </div>
          </Row>
        </Col>
        <Col>
          <Row className='stat-group'>
            <div>
              <Form.Label>Intelligence</Form.Label>
              <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={17} value={newCharacter.ability_scores.int} onChange={(e) => handlePoints('int', e.target.value)}></Form.Control>
              <p>({newCharacter.ability_scores.intMod})</p>
            </div>
            <div>
              <Form.Label>Charisma</Form.Label>
              <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={17} value={newCharacter.ability_scores.cha} onChange={(e) => handlePoints('cha', e.target.value)}></Form.Control>
              <p>({newCharacter.ability_scores.chaMod})</p>
            </div>
          </Row>
        </Col>
      </Form.Group>
      <p className="total-points">Total Points: {pointTotal}/27</p>
      <Button type='button' onClick={handleReset} >Reset</Button>
      {/* <Button type='button' onClick={saveAttr} >Save</Button> */}
    </div>
  )
}

export default PointBuy