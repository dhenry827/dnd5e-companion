import React, { useState } from 'react'

const PointBuy = () => {
  const [pointTotal, setPointTotal] = useState('max points')

  const handlePointTotal = (e) => {
    if(pointTotal <= 0){
      return
    }
    if (value >= 8 && value < 14 ){
      setPointTotal(pointTotal - 1)
    } 
    if (value >= 14 && value <= 15 ){
      setPointTotal(pointTotal - 2)
    } 
  }

  return (
    <div>
      <form onSubmit={'#'}>
        <div>
          <label>STR</label>
          <input type="number" min={'min stat value'} max={'max stat value'} value={str} onChange={'#'} />
        </div>
        <div>
          <label>DEX</label>
          <input type="number" min={'min stat value'} max={'max stat value'} value={dex} onChange={'#'} />
        </div>
        <div>
          <label>CON</label>
          <input type="number" min={'min stat value'} max={'max stat value'} value={con} onChange={'#'} />
        </div>
        <div>
          <label>WIS</label>
          <input type="number" min={'min stat value'} max={'max stat value'} value={wis} onChange={'#'} />
        </div>
        <div>
          <label>INT</label>
          <input type="number" min={'min stat value'} max={'max stat value'} value={int} onChange={'#'} />
        </div>
        <div>
          <label>CHA</label>
          <input type="number" min={'min stat value'} max={'max stat value'} value={cha} onChange={'#'} />
        </div>
          <button type='submit'></button>
       <p>Total Points: {pointTotal}/maxPoints</p>
      </form>
    </div>
  )
}

export default PointBuy