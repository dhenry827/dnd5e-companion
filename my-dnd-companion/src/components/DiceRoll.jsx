import React, { useState } from 'react'

const DiceRoll = () => {
    const [advantage, setAdvantage] = useState(false)
    const [disadvantage, setDisadvantage] = useState(false)

    const rollDie = (repeat, faces, statMod) => {
        //roll logic
        if(advantage){
            //roll twice and return high
        }
        if(disadvantage){
            //roll twice and return low
        }
        //return result
    }
  return (
    <div>DiceRoll</div>
  )
}

export default DiceRoll