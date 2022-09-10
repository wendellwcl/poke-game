import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

const PokeDisplay = () => {
    const { poke, alreadyAnswered } = useContext(DataContext);

    return (
        <section id="poke-display">
            <img
                src={poke.sprites.other['official-artwork'].front_default}
                alt=""
                id="poke-img"
            />
            <h6
                id="poke-name"
                className={alreadyAnswered && 'show'}
            >
                {poke.name}
            </h6>
        </section>
    );
};

export default PokeDisplay;
