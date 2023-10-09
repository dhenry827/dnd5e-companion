import React from 'react'

const StatBlock = () => {
  return (
    <div>
        <div>
            <label>STR</label>
            <input type='number' />
            <p>{strMod}</p>
        </div>
        <div>
            <label>DEX</label>
            <input type='number' />
            <p>{dexMod}</p>
        </div>
        <div>
            <label>CON</label>
            <input type='number' />
            <p>{conMod}</p>
        </div>
        <div>
            <label>WIS</label>
            <input type='number' />
            <p>{wisMod}</p>
        </div>
        <div>
            <label>INT</label>
            <input type='number' />
            <p>{intMod}</p>
        </div>
        <div>
            <label>CHA</label>
            <input type='number' />
            <p>{chaMod}</p>
        </div>
    </div>
  )
}

export default StatBlock