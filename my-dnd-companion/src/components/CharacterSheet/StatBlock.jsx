import React from 'react'

const StatBlock = () => {
  return (
    <div id='statBlock'>
        <div className='statBox'>
            <label>STR</label>
            <input type='number' />
            <p>{strMod}</p>
        </div>
        <div className='statBox'>
            <label>DEX</label>
            <input type='number' />
            <p>{dexMod}</p>
        </div>
        <div className='statBox'>
            <label>CON</label>
            <input type='number' />
            <p>{conMod}</p>
        </div>
        <div className='statBox'>
            <label>WIS</label>
            <input type='number' />
            <p>{wisMod}</p>
        </div>
        <div className='statBox'>
            <label>INT</label>
            <input type='number' />
            <p>{intMod}</p>
        </div>
        <div className='statBox'>
            <label>CHA</label>
            <input type='number' />
            <p>{chaMod}</p>
        </div>
    </div>
  )
}

export default StatBlock