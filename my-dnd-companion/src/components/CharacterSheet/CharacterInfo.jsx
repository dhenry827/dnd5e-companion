import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CharacterDataContext } from '../../App'
import '../../stylesheets/characterSheet.css'
import StatBlock from './StatBlock.jsx'

const CharacterInfo = () => {
  const { characters, setCharacters } = useContext(CharacterDataContext)

  const [charImg, setCharImg] = useState({ selectedFile: null, preview: null })

  const onCharImgSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      setCharImg({ selectedFile: file, preview })
    }
  }

  let { currentChar } = useParams()
  currentChar = { ...characters[currentChar] }

const currentCharClasses = currentChar.classes.map((className, index) => (
  <p key={index}>{className.name} Lvl. {className.level}</p>
))

  useEffect(() => {
    console.log(characters)
    console.log('Current Character:', currentChar)
  }, [])

  return (
    <>
      <div id='infoBlock'>
        <div id='imageBlock'>
          Name: {currentChar.name}
          {currentChar.race.subrace_name.length > 0 ?
                                <p>{currentChar.race.subrace_name}</p> :
                                <p>{currentChar.race.name}</p>}
          {currentCharClasses}

          {charImg && charImg.preview ?
            <>
              <img src={charImg.preview} alt='Character' height='400px' width='200px'></img>
            </> :
            <>
              <input type='file' onChange={onCharImgSelect}></input>
              <button onClick={() => { }}>Upload</button>
            </>
          }
        </div>

        <div id='charInfo'>
          <div className='info'>
            <p><b>Alignment:</b> {currentChar.alignment}</p>
          </div>
          <div className='info'>
            <p><b>Background:</b> {currentChar.background}</p>
          </div>
          {/* <div className='info'>
          <p>{currentChar.exp}</p>
          <p>Experience Points</p>
        </div> */}
          <div className='info'>
            <b>Ideals:</b>
            <p>{currentChar.ideals}</p>
          </div>
          <div className='info'>
            <b>Bonds:</b>
            <p>{currentChar.bonds}</p>
          </div>
          <div className='info'>
            <b>Flaws:</b>
            <p>{currentChar.flaws}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default CharacterInfo