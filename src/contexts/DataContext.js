import { createContext, useState, useEffect } from 'react';
import { fetchJSON } from '../helper/ReusableFunctions';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [generationsList, setGenerationsList] = useState([]);
    const [poke, setPoke] = useState();

    useEffect(() => {
        async function fetchGenerationsData() {
            const auxiliarArray = [];

            const generationsData = await fetchJSON(
                'https://pokeapi.co/api/v2/generation/'
            );

            const urls = generationsData.results.map(
                (generation) => generation.url
            );

            for (const [idx, url] of urls.entries()) {
                const newGenerationData = await fetchJSON(url);

                if (
                    !auxiliarArray.includes(
                        (item) => item.name === newGenerationData.name
                    )
                ) {
                    const newGeneration = {
                        name: newGenerationData.name,
                        species: newGenerationData.pokemon_species,
                        isChecked: idx === 0 ? true : false,
                    };

                    auxiliarArray.push(newGeneration);
                }
            }

            setGenerationsList(auxiliarArray);
        }

        fetchGenerationsData();
    }, []);

    function checkSelectedGenerations() {
        const generations = Array.from(
            document.querySelector('#generations-options').childNodes
        );

        const selectedGenerations = [];

        generations.forEach((generationCheckbox) => {
            const el = generationCheckbox.querySelector('.custom-checkbox');

            if (el.checked) {
                const generationName = el.name;
                const generationData = generationsList.find(
                    (generation) => generation.name === generationName
                );
                selectedGenerations.push(generationData);
            }
        });

        return selectedGenerations;
    }

    function getSpecies(generations) {
        let species = [];

        generations.forEach((generation) => {
            species = [...species, ...generation.species];
        });

        return species;
    }

    function drawPoke(species) {
        const randomNumber = Math.floor(Math.random() * species.length);

        return species[randomNumber];
    }

    async function handlePlay() {
        const selectedGenerations = checkSelectedGenerations();

        if (selectedGenerations.length < 1) {
            const event = new Event('noGererationChecked');
            window.dispatchEvent(event);
            return;
        }

        const species = getSpecies(selectedGenerations);
        const poke = drawPoke(species);
        const pokeData = await fetchJSON(
            `https://pokeapi.co/api/v2/pokemon/${poke.name}`
        );
        setPoke(pokeData);
    }

    return (
        <DataContext.Provider value={{ generationsList, poke, handlePlay }}>
            {children}
        </DataContext.Provider>
    );
};
