import React from 'react'


const Statmods = () => {

    function setMod(stat){
        let statMod = Number
    if(stat == 1){
        statMod = -5
    }
    if(stat == 2 || stat == 3){
        statMod = -4
    }
    if(stat == 4 || stat == 5){
        statMod = -3
    }
    if(stat == 6 || stat == 7){
        statMod = -2
    }
    if(stat == 8 || stat == 9){
        statMod = -1
    }
    if(stat == 10 || stat == 11){
        statMod = 0
    }
    if(stat == 12 || stat == 13){
        statMod = 1
    }
    if(stat == 14 || stat == 15){
        statMod = 2
    }
    if(stat == 16 || stat == 17){
        statMod = 3
    }
    if(stat == 18 || stat == 19){
        statMod = 4
    }
    if(stat == 20 || stat == 21){
        statMod = 5
    }
    if(stat == 22 || stat == 23){
        statMod = 6
    }
    if(stat == 24 || stat == 25){
        statMod = 7
    }
    if(stat == 26 || stat == 27){
        statMod = 8
    }
    if(stat == 28 || stat == 29){
        statMod = 9
    }
    if(stat == 30){
        statMod = 10
    }
    }

  return (
    <div>Statmods</div>
  )
}

export default Statmods