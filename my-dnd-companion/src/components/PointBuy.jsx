import React, { useState, createContext, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Statmods from './Statmods';
import Button from 'react-bootstrap/esm/Button';

// export const StatDataContext = useContext({attributes: {}, setAttributes: () => { }})

const PointBuy = () => {

  const [pointTotal, setPointTotal] = useState(27)
  // const [currentPoints, setCurrentPoints] = useState(27)
  const [attributes, setAttributes] = useState({
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
  })



  const handlePoints = (attrName, newValue) => {
    const currentValue = attributes[attrName];
    const parsedNewValue = parseInt(newValue); // Ensure newValue is an integer

    console.log(`currentValue: ${currentValue}, New Value: ${parsedNewValue}`)
    let newPointTotal = pointTotal;
  if(parsedNewValue > currentValue){
    if (parsedNewValue >= 14 && parsedNewValue <= 15) {
      newPointTotal -= 2;
    } else {
      newPointTotal -= 1;
    }
  } else if(parsedNewValue < currentValue){
    return
  }
  
    if (newPointTotal >= 0 && newPointTotal <= 27) {
      setAttributes({ ...attributes, [attrName]: parsedNewValue });
      setPointTotal(newPointTotal);
    } else {
      setAttributes({ ...attributes, [attrName]: currentValue });
    }
  };

  const handleReset = () => {
    setAttributes({
      str: 8,
      dex: 8,
      con: 8,
      wis: 8,
      int: 8,
      cha: 8
    })
    setPointTotal(27)
    
  }

  return (
    <div className='point-selector'>
    <Form.Group className="stat-Form">
        <Form.Label>STR</Form.Label>
        <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={15} value={attributes.str} onChange={(e) => handlePoints('str', e.target.value)}></Form.Control>
        <Form.Label>DEX</Form.Label>
        <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={15} value={attributes.dex} onChange={(e) => handlePoints('dex', e.target.value)}></Form.Control>
        <Form.Label>CON</Form.Label>
        <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={15} value={attributes.con} onChange={(e) => handlePoints('con', e.target.value)}></Form.Control>
        <Form.Label>WIS</Form.Label>
        <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={15} value={attributes.wis} onChange={(e) => handlePoints('wis', e.target.value)}></Form.Control>
        <Form.Label>INT</Form.Label>
        <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={15} value={attributes.int} onChange={(e) => handlePoints('int', e.target.value)}></Form.Control>
        <Form.Label>CHA</Form.Label>
        <Form.Control className="solo-stats" type="number" placeholder='8' min={8} max={15} value={attributes.cha} onChange={(e) => handlePoints('cha', e.target.value)}></Form.Control>
      </Form.Group>
      <p className="total-points">Total Points: {pointTotal}/27</p>
      <Button type='button' onClick={handleReset} >Reset</Button>
    </div>
  )
}

export default PointBuy