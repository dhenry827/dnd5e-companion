import { useEffect, useContext } from 'react'
import { ClassContext, ClassDataContext } from './CharacterCreator';


const ClassFetch = () => {

    const selectedClass = useContext(ClassContext);
    const { classData, setClassData } = useContext(ClassDataContext);
    
    
    const handleFetch = async () => {
        try {
            const response = await fetch(
                `https://www.dnd5eapi.co/api/classes/${selectedClass}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );
            
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                
                const updatedData = {
                    name: data.name,
                    hitDie: data.hit_die,
                    proficiencies: data.proficiencies,
                    proficiencyOptions: data.proficiency_choices[0].choose,
                    proficiencyChoices: data.proficiency_choices[0].from.options,
                    startingEquipment: data.starting_equipment,
                    startEquipChoices: data.starting_equipment_options,
                };
            
                if (data.spellcasting){
                    updatedData.spellCastingAbility = data.spellcasting.spellcasting_ability.name;
                    updatedData.spellCastingAbilityDesc = data.spellcasting.info[2].desc[1];
                } else {
                    updatedData.spellCastingAbility = "None";
                }
                
                setClassData(updatedData)

            } else {
                console.error('Failed to fetch class data');
            }
        } catch (error) {
            console.error('Error while fetching class data:', error);
        }
    }



    useEffect(() => {
        if (selectedClass) {
            handleFetch();
        }
    }, [selectedClass])

    return null
}

export default ClassFetch