import { useContext } from 'react';
import { DataContext } from '../../../contexts/DataContext';

import Ball from '../../../assets/svg/ball.svg';

const Display = () => {
    const { poke, alreadyAnswered } = useContext(DataContext);

    return (
        <section id="poke-display">
            <img
                src={Ball}
                id="display-bg"
                alt=""
            />
            <div id="display-animation">
                <img
                    src={Ball}
                    id="ball-img"
                    alt=""
                />
                <img
                    src={poke.sprites.other['official-artwork'].front_default}
                    id="poke-img"
                    className={alreadyAnswered ? 'show' : undefined}
                    alt=""
                />
            </div>
            <h6
                id="poke-name"
                className={alreadyAnswered ? 'show' : undefined}
            >
                {poke.name}
            </h6>
        </section>
    );
};

export default Display;
