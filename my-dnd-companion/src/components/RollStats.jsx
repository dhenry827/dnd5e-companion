import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';

const RollStats = () => {

  function rollDie(repeat, sides, modifier){
    let sum = 0
    if(modifier == null){
        modifier = 0
    }
    for(i = 0; i < repeat; i++){
        const result = Math.round(1 + Math.random() * sides);
        sum += result;
        console.log(result);
    }
    console.log(sum + modifier);
    return sum + modifier;
}


  return (
    <div>
      <Form>
       <Form.Group>
        <Form.Label>STR</Form.Label>
        <Form.Control type="number" placeholder='8' min={8} max={15} onChange={(e) => handlePoints(e.target.value)}></Form.Control>
        <button>Roll</button>
        </Form.Group>
        <Form.Group>
        <Form.Label>DEX</Form.Label>
        <Form.Control type="number" placeholder='8' min={8} max={15} onChange={(e) => handlePoints(e.target.value)}></Form.Control>
        <button>Roll</button>
        </Form.Group>
        <Form.Group>
        <Form.Label>CON</Form.Label>
        <Form.Control type="number" placeholder='8' min={8} max={15} onChange={(e) => handlePoints(e.target.value)}></Form.Control>
        <button>Roll</button>
        </Form.Group>
        <Form.Group>
        <Form.Label>WIS</Form.Label>
        <Form.Control type="number" placeholder='8' min={8} max={15} onChange={(e) => handlePoints(e.target.value)}></Form.Control>
        <button>Roll</button>
        </Form.Group>
        <Form.Group>
        <Form.Label>INT</Form.Label>
        <Form.Control type="number" placeholder='8' min={8} max={15} onChange={(e) => handlePoints(e.target.value)}></Form.Control>
        <button>Roll</button>
        </Form.Group>
        <Form.Group>
        <Form.Label>CON</Form.Label>
        <Form.Control type="number" placeholder='8' min={8} max={15} onChange={(e) => handlePoints(e.target.value)}></Form.Control>
        <button>Roll</button>
      </Form.Group>
      </Form>
    </div>
  );
};

export default RollStats;