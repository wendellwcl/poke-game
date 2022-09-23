import { useContext, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

import { DataContext } from '../../../contexts/DataContext';

import { showModal } from '../../../utils/ShowModal';

const GameInterface = () => {
    const {
        speciesList,
        poke,
        alreadyAnswered,
        setAlreadyAnswered,
        handlePlay,
    } = useContext(DataContext);

    const [hintReveled, setHintReveled] = useState(false);

    function handleGuess(e) {
        e.preventDefault();

        const inputEl = document.querySelector('#guess-input');
        const res = inputEl.value;

        if (res === poke.name) {
            setAlreadyAnswered(true);
        } else {
            inputEl.value = '';
        }
    }

    function revealHint() {
        setHintReveled(true);

        let hint = Array.from(poke.name);
        hint = hint.fill('_', 2);
        hint = hint.join(' ');

        const el = document.querySelector('#hint');
        el.textContent = hint;

        document.querySelector('#guess-input').focus();
    }

    function drawAnotherPoke() {
        if (!alreadyAnswered) {
            showModal('#draw-another-confirmation-modal');
            return;
        }

        handlePlay();
    }

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
                        {hintReveled ? 'Dica:' : 'Revelar Dica'}
                    </button>
                    <span id="hint"></span>
                </div>
            </div>

            <div id="controls-container">
                <button
                    type="button"
                    onClick={drawAnotherPoke}
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
