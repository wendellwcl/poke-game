import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [generationsList, setGenerationsList] = useState([]);
    const [speciesList, setSpeciesList] = useState();
    const [poke, setPoke] = useState();
    const [alreadyAnswered, setAlreadyAnswered] = useState(false);

    const startEvent = new Event('start');

    useEffect(() => {
        async function fetchGenerationsData() {
            const auxiliarArray = [];

            const generationsData = await fetch(
                'https://pokeapi.co/api/v2/generation/'
            )
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    setLoading(false);
                    setError(true);
                    throw new Error(
                        'Não foi possível carregar dados das Generations'
                    );
                })
                .then((res) => Array.from(res.results))
                .catch((e) => console.error(e));

            const urls = generationsData.map((generation) => generation.url);

            for (const [idx, url] of urls.entries()) {
                const newGenerationData = await fetch(url)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                        setLoading(false);
                        setError(true);
                        throw new Error(
                            'Não foi possível carregar dados das Generations'
                        );
                    })
                    .catch((e) => console.error(e));

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
            window.dispatchEvent(startEvent);
        }

        fetchGenerationsData();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DataContext.Provider
            value={{
                loading,
                setLoading,
                error,
                setError,
                generationsList,
                setGenerationsList,
                speciesList,
                setSpeciesList,
                poke,
                setPoke,
                alreadyAnswered,
                setAlreadyAnswered,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
