import { useContext, useRef, useEffect } from 'react';
import { DataContext } from '../../contexts/DataContext';

import CustomCheckbox from '../CustomCheckbox';

const GameInterface = () => {
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
        <section id="game-interface">
            <div id="game-options-container">
                <div className="btn-container">
                    <button
                        type="button"
                        onClick={handlePlay}
                    >
                        Sortear outro
                    </button>
                    <button type="button">Revelar resposta</button>
                </div>

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
            </div>
        </section>
    );
};

export default GameInterface;
