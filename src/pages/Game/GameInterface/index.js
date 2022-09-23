import { useContext, useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

import { DataContext } from '../../../contexts/DataContext';

import useGameCommands from './useGameCommands';

import { showModal } from '../../../utils/ShowModal';

const GameInterface = () => {
    const { speciesList, alreadyAnswered } = useContext(DataContext);

    const { handleGuess, drawAnother, revealHint, showHint } =
        useGameCommands();

    const [hintIsReveled, setHintIsReveled] = useState();

    useEffect(() => {
        setHintIsReveled(showHint);
    }, [showHint]);

    return (
        <section id="game-interface">
            <div id="guess-container">
                <form onSubmit={(e) => handleGuess(e)}>
                    <label htmlFor="guess-input">
                        <span>Digite qual é:</span>
                        <div className="input-container">
                            <input
                                type="text"
                                id="guess-input"
                                list="datalist-species"
                                aria-label="Digite qual é"
                                autoComplete="off"
                            />
                            <button type="submit">
                                <BsArrowRight />
                            </button>
                        </div>
                    </label>
                    <datalist id="datalist-species">
                        {speciesList.map((specie, index) => (
                            <option
                                key={index}
                                value={specie.name}
                            />
                        ))}
                    </datalist>
                </form>

                <div id="hint-container">
                    <button
                        type="button"
                        id="hint-btn"
                        onClick={revealHint}
                    >
                        {hintIsReveled ? 'Dica:' : 'Revelar Dica'}
                    </button>
                    <span id="hint"></span>
                </div>
            </div>

            <div id="controls-container">
                <button
                    type="button"
                    onClick={drawAnother}
                >
                    Sortear outro
                </button>
                <button
                    type="button"
                    onClick={() => showModal('#reveal-confirmation-modal')}
                    disabled={alreadyAnswered}
                >
                    Revelar resposta
                </button>
                <button
                    type="button"
                    onClick={() => showModal('#generations-modal')}
                >
                    Selecionar Gerações
                </button>
            </div>
        </section>
    );
};

export default GameInterface;
