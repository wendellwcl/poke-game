import { useEffect, useRef } from 'react';
import { BsXLg } from 'react-icons/bs';

const Modal = ({ id, title, children }) => {
    const modal = useRef();

    useEffect(() => {
        const el = modal.current;
        const dismissTriggers = el.querySelectorAll('[data-dismiss]');
        dismissTriggers.forEach((el) => {
            el.addEventListener('click', (e) => handleCloseModal(e.target));
        });
    });

    function handleCloseModal(el) {
        let targetEl = el.parentNode;

        while (!targetEl.classList.contains('modal')) {
            targetEl = targetEl.parentNode;
        }

        targetEl.classList.remove('show');
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
                <div className="modal-header">
                    {title && <h3>{title}</h3>}
                    <button
                        type="button"
                        data-dismiss="modal"
                        aria-label="close"
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
