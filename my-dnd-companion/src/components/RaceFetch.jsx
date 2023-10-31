import { useEffect, useContext } from 'react'
import { RaceContext, RaceDataContext } from './CharacterCreator';


const RaceFetch = () => {

    const selectedRace = useContext(RaceContext);
    const { raceData, setRaceData } = useContext(RaceDataContext); 

    const handleFetch = async () => {
        try {
            const response = await fetch(
                `https://www.dndd5eapi.co/api/races/${selectedRace}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                
                setRaceData({
                    name: data.name,
                    speed: data.speed,
                    abilityBonuses: data.ability_bonuses,
                    proficiencies: data.starting_proficiencies,
                    size: data.size,
                    languages: data.languages,
                    traits: data.traits,
                });
            } else {
                console.error('Failed to fetch race data');
            }
        } catch (error) {
            console.error('Error while fetching race data:', error);
        }
    };

    useEffect(() => {
        if (selectedRace) {
            handleFetch();
        }
    }, [selectedRace]);

    return null; 
};

export default RaceFetch;