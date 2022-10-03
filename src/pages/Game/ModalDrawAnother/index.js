import { useContext } from 'react';

import { DataContext } from '../../../contexts/DataContext';

import Modal from '../../../components/UI/Modal';

import useStart from '../../../hooks/useStart';

const ModalDrawAnother = () => {
    const { setAlreadyAnswered } = useContext(DataContext);

    const { start } = useStart();

    return (
        <Modal
            title="Sortear outro ?"
            id="draw-another-confirmation-modal"
        >
            <div>
                <p>
                    Você ainda não adivinhou o atual, quer mesmo sortear outro?
                    Você também pode revelar a resposta antes de prosseguir.
                </p>
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
                    Revelar resposta
                </button>
                <button
                    type="button"
                    className="btn-confirm"
                    data-dismiss="modal"
                    onClick={start}
                >
                    Sortear outro
                </button>
            </div>
        </Modal>
    );
};

export default ModalDrawAnother;
