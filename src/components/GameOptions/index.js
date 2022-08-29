import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

import CustomCheckbox from '../CustomCheckbox';

import './GameOptions.css';

const GameOptions = () => {
    const { generationsList } = useContext(DataContext);

    return (
        <section id="game-options-container">
            <button type="button">Sortear outro</button>
            <button type="button">Revelar resposta</button>

            <div id="generations-container">
                <h6>Selecione quais gerações incluir ao jogo:</h6>
                <div id="generations-options">
                    {generationsList.map((generation, index) => (
                        <CustomCheckbox
                            key={index}
                            name={generation.name}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GameOptions;
