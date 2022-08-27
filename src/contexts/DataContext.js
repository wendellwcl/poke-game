import { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const generationsData = useFetch('https://pokeapi.co/api/v2/generation/');

    const [generationsList, setGenerationsList] = useState([]);

    useEffect(() => {
        if (generationsData) {
            let auxiliarArray = [];

            generationsData.results.forEach((generation) => {
                fetch(generation.url)
                    .then((res) => res.json())
                    .then((data) => {
                        if (
                            !auxiliarArray.includes(
                                (item) => item.name === data.name
                            )
                        ) {
                            const newGeneration = {
                                name: data.name,
                                species: data.pokemon_species,
                            };

                            auxiliarArray.push(newGeneration);
                            setGenerationsList([...auxiliarArray]);
                        }
                    });
            });
        }
    }, [generationsData]);

    return (
        <DataContext.Provider value={{ generationsList }}>
            {children}
        </DataContext.Provider>
    );
};
