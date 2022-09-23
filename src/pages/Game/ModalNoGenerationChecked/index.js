import Modal from '../../../components/UI/Modal';

import { showModal } from '../../../utils/ShowModal';

const ModalNoGenerationChecked = () => {
    return (
        <Modal
            title="Nenhuma Geração selecionada"
            id="no-generation-checked"
        >
            <div>
                <p>
                    Nenhuma Geração está selecionada. Por favor, selecione pelo
                    menos uma ou mais Gerações para prosseguir com o jogo.
                </p>
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn-confirm"
                    data-dismiss="modal"
                    onClick={() => showModal('#generations-modal')}
                >
                    Selecionar Gerações
                </button>
            </div>
        </Modal>
    );
};

export default ModalNoGenerationChecked;
