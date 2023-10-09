import React, { useState, useEffect } from 'react'

const spellFetch = () => {

    const handleFetch = async () => {

        const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spells}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const data = await response.json()

        // console.log(data)
        setSpell(data.name)
        setSpellAbility(data.ability_bonuses)
        setClassAbilityBonus(data)
        setRaceTraits(data.traits)
    }


    useEffect(() => {
        raceFetch()
    }, [])


    return null
}

export default spellFetch