import { useEffect } from 'react';
import { useContext, useRef } from 'react';
import { DataContext } from '../../contexts/DataContext';

import CustomCheckbox from '../CustomCheckbox';

import './GameOptions.css';

const GameOptions = () => {
    const { generationsList, handlePlay } = useContext(DataContext);

    const generationsContainer = useRef();

    useEffect(() => {
        window.addEventListener('noGererationChecked', () => {
            const elTarget = generationsContainer.current;
            elTarget.classList.add('error-feedback');
        });
    }, []);

    function removeErrorFeedback() {
        const elTarget = generationsContainer.current;
        elTarget.classList.remove('error-feedback');
    }

    return (
        <section id="game-options-container">
            <button
                type="button"
                onClick={handlePlay}
            >
                Sortear outro
            </button>
            <button type="button">Revelar resposta</button>

            <div
                id="generations-container"
                ref={generationsContainer}
                onClick={removeErrorFeedback}
            >
                <h6>Selecione quais gerações incluir ao jogo:</h6>
                <div id="generations-options">
                    {generationsList.map((generation, index) => (
                        <CustomCheckbox
                            key={index}
                            generation={generation}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GameOptions;
