import React from 'react'
import '../components/Characters.css'

const UserCharacters = () => {
  return (
    <div className='characterSlide'>
      <p className='charAtrribute'>Character Name</p>
      <p className='charAtrribute'>Lvl</p>
      <p className='charAtrribute'>Race</p>
      <p className='charAtrribute'>Class/Subclass</p>
      <p className='charAtrribute'>Exp</p>
    </div>
  )
}

export default UserCharacters