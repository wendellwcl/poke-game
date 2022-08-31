import { useEffect, useRef } from 'react';
import { BsXLg } from 'react-icons/bs';

import './Modal.css';

const Modal = ({ id, children }) => {
    const modal = useRef();

    useEffect(() => {
        const el = modal.current;
        const closeElements = el.querySelectorAll('[data-dismiss="modal"]');
        closeElements.forEach((el) => {
            el.addEventListener('click', handleCloseModal);
        });
    });

    function handleCloseModal(e) {
        const el = e.target;
        let modal = el.parentNode;

        while (!modal.classList.contains('modal')) {
            modal = modal.parentNode;
        }

        modal.classList.remove('show');
    }

    return (
        <div
            className="modal"
            id={id}
            ref={modal}
            tabIndex="-1"
        >
            <div
                className="modal-fade"
                data-dismiss="modal"
            ></div>
            <div className="modal-body">
                <div className="modal-header teste teste2">
                    <button
                        type="button"
                        data-dismiss="modal"
                    >
                        <BsXLg />
                    </button>
                </div>
                <div className="modal-dialog">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
