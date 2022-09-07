import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

const PokeDisplay = () => {
    const { poke } = useContext(DataContext);

    return (
        <section id="poke-display">
            <img
                src={poke.sprites.other['official-artwork'].front_default}
                alt=""
                id="poke-img"
            />
        </section>
    );
};

export default PokeDisplay;
