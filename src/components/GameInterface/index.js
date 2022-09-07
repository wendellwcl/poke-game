import { useContext, useRef, useEffect } from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';

import { DataContext } from '../../contexts/DataContext';

import CustomCheckbox from '../CustomCheckbox';
import Modal from '../Modal';

const GameInterface = () => {
    const { generationsList, speciesList, poke, handlePlay } =
        useContext(DataContext);

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
        const res = document.querySelector('#guess-input').value;

        if (res === poke.name) {
            document.querySelector('#poke-img').classList.add('show');
        } else {
            const el = document.querySelector('#guess-input');
            el.value = '';
        }
    }

    return (
        <section id="game-interface">
            <form
                className="form-container"
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
                            <BsArrowRightCircleFill />
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

            <div className="btn-container">
                <button
                    type="button"
                    onClick={handlePlay}
                >
                    Sortear outro
                </button>
                <button type="button">Revelar resposta</button>
                <button
                    type="button"
                    onClick={openGenerationsModal}
                >
                    Selecionar Gerações
                </button>
            </div>

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
        </section>
    );
};

export default GameInterface;
