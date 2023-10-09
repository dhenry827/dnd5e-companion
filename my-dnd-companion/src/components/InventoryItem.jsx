import React from 'react'

const InventoryItem = (props) => {
  return (
    <div>
      <h4>{props.name}</h4>
      <p>{props.rarity} {item.price}</p>
      <p>{props.description}</p>
      <p>{props.requiresAttuenment ? 'requires attunement' : null}</p>
    </div>
  )
}

export default InventoryItem