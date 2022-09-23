import { useContext } from 'react';

import { DataContext } from '../../../contexts/DataContext';

import Modal from '../../../components/UI/Modal';
import CustomCheckbox from '../../../components/CustomCheckbox';

const ModalGenerations = () => {
    const { generationsList } = useContext(DataContext);

    return (
        <Modal
            title="Selecionar gerações"
            id="generations-modal"
        >
            <div id="generations-container">
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
                    className="btn-confirm"
                    data-dismiss="modal"
                    aria-label="save and close"
                >
                    Ok
                </button>
            </div>
        </Modal>
    );
};

export default ModalGenerations;
