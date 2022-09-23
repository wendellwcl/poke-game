import { useState, useContext } from 'react';

import { DataContext } from '../../../contexts/DataContext';

import { showModal } from '../../../utils/ShowModal';

const useGameCommands = () => {
    const { handlePlay, alreadyAnswered, setAlreadyAnswered, poke } =
        useContext(DataContext);

    const [showHint, setShowHint] = useState(false);

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

    function drawAnother() {
        if (!alreadyAnswered) {
            showModal('#draw-another-confirmation-modal');
            return;
        }

        handlePlay();
    }

    function revealHint() {
        setShowHint(true);

        let hint = Array.from(poke.name);
        hint = hint.fill('_', 2);
        hint = hint.join(' ');

        const el = document.querySelector('#hint');
        el.textContent = hint;

        document.querySelector('#guess-input').focus();
    }

    return { handleGuess, drawAnother, revealHint, showHint };
};

export default useGameCommands;
