import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

const PokeDisplay = () => {
    const { poke } = useContext(DataContext);

    return (
        <section>
            <img
                src={poke.sprites.other['official-artwork'].front_default}
                alt=""
            />
        </section>
    );
};

export default PokeDisplay;
