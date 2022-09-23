import Display from './Display';
import GameInterface from './GameInterface';
import ModalDrawAnother from './ModalDrawAnother';
import ModalReveal from './ModalReveal';
import ModalGenerations from './ModalGenerations';
import ModalNoGenerationChecked from './ModalNoGenerationChecked';

const Game = () => {
    return (
        <section id="game">
            <Display />
            <GameInterface />
            <ModalDrawAnother />
            <ModalReveal />
            <ModalGenerations />
            <ModalNoGenerationChecked />
        </section>
    );
};

export default Game;
