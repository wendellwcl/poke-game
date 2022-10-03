import { useContext } from 'react';

import { DataContext } from '../contexts/DataContext';

import { showModal } from '../utils/showModal';

const useStart = () => {
    const {
        setLoading,
        setError,
        setAlreadyAnswered,
        setSpeciesList,
        setPoke,
        generationsList,
    } = useContext(DataContext);

    async function start() {
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
    }

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

    return { start };
};

export default useStart;
