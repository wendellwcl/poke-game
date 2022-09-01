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

            for (const url of urls) {
                const newGenerationData = await fetchJSON(url);

                if (
                    !auxiliarArray.includes(
                        (item) => item.name === newGenerationData.name
                    )
                ) {
                    const newGeneration = {
                        name: newGenerationData.name,
                        species: newGenerationData.pokemon_species,
                        isChecked: false,
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
                const name = el.name;
                const obj = generationsList.find(
                    (generation) => generation.name === name
                );
                selectedGenerations.push(obj);
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

    function rafflePoke(species) {
        const randomNumber = Math.floor(Math.random() * species.length);

        return species[randomNumber];
    }

    function fetchPoke(url) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setPoke(data));
    }

    function handlePlay() {
        const selectedGenerations = checkSelectedGenerations();
        const species = getSpecies(selectedGenerations);
        const poke = rafflePoke(species);
        fetchPoke(poke.url);
    }

    return (
        <DataContext.Provider value={{ generationsList, poke, handlePlay }}>
            {children}
        </DataContext.Provider>
    );
};
