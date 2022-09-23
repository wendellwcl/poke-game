import { useContext } from 'react';

import { DataContext } from '../../../contexts/DataContext';

import Modal from '../../../components/UI/Modal';

const ModalReveal = () => {
    const { setAlreadyAnswered } = useContext(DataContext);

    return (
        <Modal
            title="Revelar resposta ?"
            id="reveal-confirmation-modal"
        >
            <div>
                <p>Quer mesmo revelar a resposta ?</p>
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn-back"
                    data-dismiss="modal"
                >
                    Voltar
                </button>
                <button
                    type="button"
                    className="btn-confirm"
                    data-dismiss="modal"
                    onClick={() => setAlreadyAnswered(true)}
                >
                    Revelar
                </button>
            </div>
        </Modal>
    );
};

export default ModalReveal;
