import { useEffect, useContext } from 'react'
import { RaceContext, RaceDataContext } from './CharacterCreator';


const RaceFetch = () => {

    const { selectedRace, selectedSubrace, setSelectedSubrace } = useContext(RaceContext);
    const { raceData, setRaceData } = useContext(RaceDataContext);


    const handleFetchRace = async () => {
        console.log(selectedRace)

        // setRaceData({//sets raceData to a blank slate before fetching new data
        //     name: '',
        //     subrace: [],
        //     size: '',
        //     speed: 0,
        //     abilityBonuses: [],
        //     proficiencies: [],
        //     languages: [],
        //     traits: []
        // })
        
        try {
            const response = await fetch(
                `httpS://www.dnd5eapi.co/api/races/${selectedRace}`,
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
            
                if (data.starting_proficiencies.length === 0 && data.traits.length === 0) { //if statemment checks if starting_proficiencies and traits are empty arrays
                    setRaceData({
                        name: data.name,
                        subrace: data.subraces,
                        subrace_name: '',
                        size: data.size,
                        speed: data.speed,
                        abilityBonuses: data.ability_bonuses,
                        languages: data.languages,
                        traits: [{ name: "None" }]
                    });
                } else if (data.starting_proficiencies.length === 0) {
                    setRaceData({
                        name: data.name,
                        subrace: data.subraces,
                        subrace_name: '',
                        size: data.size,
                        speed: data.speed,
                        abilityBonuses: data.ability_bonuses,
                        languages: data.languages,
                        traits: data.traits
                    });
                } else if (data.traits.length === 0) {
                    setRaceData({
                        name: data.name,
                        subrace: data.subraces,
                        subrace_name: '',
                        size: data.size,
                        speed: data.speed,
                        abilityBonuses: data.ability_bonuses,
                        proficiencies: data.starting_proficiencies,
                        languages: data.languages,
                        traits: [{ name: "None" }]
                    });
                } else {
                    setRaceData({
                        name: data.name,
                        subrace: data.subraces,
                        subrace_name: '',
                        size: data.size,
                        speed: data.speed,
                        abilityBonuses: data.ability_bonuses,
                        proficiencies: data.starting_proficiencies,
                        languages: data.languages,
                        traits: data.traits
                    });
                }

            } else {
                console.error('Failed to fetch race data');
            }
        } catch (error) {
            console.error('Error while fetching race data:', error);
        }
    };

    const handleFetchSubrace = async () => {
        console.log(selectedSubrace)
        if(selectedSubrace){
            try {
                const response = await fetch(
                    `httpS://www.dnd5eapi.co/api/subraces/${selectedSubrace}`,
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
    
                    if(raceData.proficiencies){
                        setRaceData({//updates fields in raceData with subrace information
                        ...raceData,
                        subrace_name: data.name,
                        abilityBonuses: [...raceData.abilityBonuses, ...data.ability_bonuses],
                        proficiencies: [...raceData.proficiencies, ...data.starting_proficiencies],
                        traits: [...raceData.traits, ...data.racial_traits],
                        languages: [...raceData.languages, ...data.languages],
                    });
                } else {
                    setRaceData({//updates fields in raceData with subrace information
                        ...raceData,
                        subrace_name: data.name,
                        abilityBonuses: [...raceData.abilityBonuses, ...data.ability_bonuses],
                        proficiencies: [...data.starting_proficiencies],
                        traits: [...raceData.traits, ...data.racial_traits],
                        languages: [...raceData.languages, ...data.languages],
                    });
                }
    
                } else {
                    console.error('Failed to fetch subrace data');
                }
            } catch (error) {
                console.error('Error while fetching subrace data:', error);
            }            
        }
    };

    // Ensures that race information is replaced when a new race is selected
    useEffect(() => {
        if (selectedRace) {
            handleFetchRace();
            setSelectedSubrace('')
        }
    }, [selectedRace]);

    // Ensures that subrace information is only fetched when a subrace is selected
    useEffect(() => {
        if (selectedSubrace) {
            handleFetchSubrace();
        }
    }, [selectedSubrace]);
    
    return null;
};

export default RaceFetch;