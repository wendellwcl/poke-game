import { useEffect, useRef } from 'react';
import { BsXLg } from 'react-icons/bs';

import './Modal.css';

const Modal = ({ id, children }) => {
    const modal = useRef();

    useEffect(() => {
        const el = modal.current;
        const dismissTriggers = el.querySelectorAll('[data-dismiss]');
        dismissTriggers.forEach((el) => {
            const dismissTarget = el.getAttribute('data-dismiss');
            el.addEventListener('click', (e) =>
                handleCloseModal(e.target, dismissTarget)
            );
        });
    });

    function handleCloseModal(el, target) {
        let targetEl = el.parentNode;

        while (!targetEl.classList.contains(target)) {
            targetEl = targetEl.parentNode;
        }

        targetEl.classList.remove('show');
    }

    return (
        <div
            className="modal show"
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
