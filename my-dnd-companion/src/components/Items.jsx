import React from 'react'
import InventoryItem from './InventoryItem'

const Items = () => {
  return (
    <div>
      {/* map through inventory array to generate an InventoryItem component for for each itemobject within the inventory. Each item object should pass it's key values as props. This should work similarly for spells. */}
      <InventoryItem name={item.name} rarity={item.rarity} price={item.price} description={item.dec}/>
    </div>
  )
}

export default Items