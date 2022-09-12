import { useContext, useRef, useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

import { DataContext } from '../../contexts/DataContext';

import CustomCheckbox from '../CustomCheckbox';
import Modal from '../Modal';

const GameInterface = () => {
    const {
        generationsList,
        speciesList,
        poke,
        alreadyAnswered,
        setAlreadyAnswered,
        handlePlay,
    } = useContext(DataContext);

    const [hintReveled, setHintReveled] = useState(false);

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

    function openGenerationsModal() {
        document.querySelector('#generations-modal').classList.add('show');
    }

    function handleGuess(e) {
        e.preventDefault();

        const inputEl = document.querySelector('#guess-input');
        const res = inputEl.value;

        if (res === poke.name) {
            revealAnswer();
            setAlreadyAnswered(true);
        } else {
            inputEl.value = '';
        }
    }

    function revealHint() {
        setHintReveled(true);

        let hint = Array.from(poke.name);
        hint = hint.fill('_', 2);
        hint = hint.join();
        hint = hint.replaceAll(',', ' ');

        const el = document.querySelector('#hint');
        el.textContent = hint;
    }

    function handleDrawAnotherPoke() {
        if (!alreadyAnswered) {
            document
                .querySelector('#draw-another-confirmation-modal')
                .classList.add('show');
            return;
        }

        handlePlay();
    }

    function handleRevealAnswer() {
        document
            .querySelector('#reveal-confirmation-modal')
            .classList.add('show');
    }

    function revealAnswer() {
        document.querySelector('#poke-img').classList.add('show');
        setAlreadyAnswered(true);
    }

    return (
        <section id="game-interface">
            <div id="guess-container">
                <form
                    id="form-container"
                    onSubmit={(e) => handleGuess(e)}
                >
                    <label htmlFor="guess-input">
                        <span>Digite qual é:</span>
                        <div>
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

            <div id="controls-btn-container">
                <button
                    type="button"
                    onClick={handleDrawAnotherPoke}
                >
                    Sortear outro
                </button>
                <button
                    type="button"
                    onClick={handleRevealAnswer}
                    disabled={alreadyAnswered}
                >
                    Revelar resposta
                </button>
                <button
                    type="button"
                    onClick={openGenerationsModal}
                >
                    Selecionar Gerações
                </button>
            </div>

            <Modal
                title="Tem certeza ?"
                id="draw-another-confirmation-modal"
            >
                <div>
                    <p>
                        Você ainda não adivinhou o desafio atual, quer mesmo
                        sortear outro? Você também pode revelar a resposta antes
                        de prosseguir.
                    </p>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="cancel-btn"
                        data-dismiss="modal"
                    >
                        Voltar
                    </button>
                    <button
                        type="button"
                        className="confirm-btn"
                        data-dismiss="modal"
                        onClick={revealAnswer}
                    >
                        Revelar resposta
                    </button>
                    <button
                        type="button"
                        className="confirm-btn"
                        data-dismiss="modal"
                        onClick={handlePlay}
                    >
                        Sortear outro
                    </button>
                </div>
            </Modal>

            <Modal
                title="Revelar resposta ?"
                id="reveal-confirmation-modal"
            >
                <div>
                    <p>Quer mesmo revelar a resposta ? ...</p>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="cancel-btn"
                        data-dismiss="modal"
                    >
                        Voltar
                    </button>
                    <button
                        type="button"
                        className="confirm-btn"
                        data-dismiss="modal"
                        onClick={revealAnswer}
                    >
                        Revelar
                    </button>
                </div>
            </Modal>

            <Modal
                title="Selecionar gerações"
                id="generations-modal"
            >
                <div
                    id="generations-container"
                    ref={generationsContainer}
                    onClick={removeErrorFeedback}
                >
                    <h6>Selecione quais gerações deseja incluir ao jogo:</h6>
                    <div id="generations-options">
                        {generationsList.map((generation, index) => (
                            <CustomCheckbox
                                key={index}
                                generation={generation}
                            />
                        ))}
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="confirm-btn"
                        data-dismiss="modal"
                        aria-label="save and close"
                    >
                        Ok
                    </button>
                </div>
            </Modal>

            <Modal
                title="Nenhuma Geração selecionada"
                id="no-generation-checked"
            >
                <div>
                    <p>
                        Nenhuma Geração está selecionada. Por favor, selecione
                        pelo menos uma ou mais Gerações para prosseguir com o
                        jogo.
                    </p>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="confirm-btn"
                        data-dismiss="modal"
                        onClick={openGenerationsModal}
                    >
                        Selecionar Gerações
                    </button>
                </div>
            </Modal>
        </section>
    );
};

export default GameInterface;
