import { createContext, useState, useEffect, useCallback } from 'react';

import { showModal } from '../components/Modal';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [generationsList, setGenerationsList] = useState([]);
    const [speciesList, setSpeciesList] = useState();
    const [poke, setPoke] = useState();
    const [alreadyAnswered, setAlreadyAnswered] = useState(false);

    const handlePlay = useCallback(async () => {
        const selectedGenerations = checkGenerations();

        if (selectedGenerations.length < 1) {
            showModal('#no-generation-checked');
            return;
        }

        setLoading(true);
        setAlreadyAnswered(false);

        const species = getSpecies(selectedGenerations);
        setSpeciesList(species);

        const randomPoke = drawPoke(species);

        const specieData = await fetch(randomPoke.url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                setLoading(false);
                setError(true);
                throw new Error('Não foi possível carregar dados do Poke');
            })
            .catch((e) => console.error(e));

        const pokeData = await fetch(specieData.varieties[0].pokemon.url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                setLoading(false);
                setError(true);
                throw new Error('Não foi possível carregar dados do Poke');
            })
            .catch((e) => console.error(e));

        setPoke(pokeData);

        setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
                document.querySelector('#guess-input').focus();
            }, 200);
        }, 500);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generationsList]);

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
        }

        fetchGenerationsData();
    }, []);

    useEffect(() => {
        if (generationsList.length > 0) {
            handlePlay();
        }
    }, [generationsList, handlePlay]);

    function checkGenerations() {
        const selectedGenerations = generationsList.filter(
            (generation) => generation.isChecked === true
        );

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

    return (
        <DataContext.Provider
            value={{
                loading,
                error,
                generationsList,
                speciesList,
                poke,
                alreadyAnswered,
                setAlreadyAnswered,
                handlePlay,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
