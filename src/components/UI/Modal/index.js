import { useEffect, useRef } from 'react';
import { BsXLg } from 'react-icons/bs';

const Modal = ({ id, title, children }) => {
    const modal = useRef();

    useEffect(() => {
        if (!title) {
            console.warn(
                'Development warning: The modal component expects to receive a title prop'
            );
        }
    });

    //Add click listener on elements that should close the modal
    //Elements that have the [data-dismiss='modal'] attribute will receive the function closeModal, included props.children elements
    useEffect(() => {
        const el = modal.current;
        const dismissTriggers = el.querySelectorAll('[data-dismiss]');
        dismissTriggers.forEach((el) => {
            el.addEventListener('click', (e) => closeModal(e.target));
        });
    });

    function closeModal(el) {
        let targetEl = el.parentNode;

        while (!targetEl.classList.contains('modal')) {
            targetEl = targetEl.parentNode;
        }

        targetEl.classList.remove('show');
    }

    return (
        //for a modal to be displayed on screen it must receive the class='show'
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 80 64"
                    className="modal-corner"
                >
                    <path d="M80,64H23.81a10,10,0,0,1-9.7-7.57L0,0H80Z" />
                </svg>
                <button
                    type="button"
                    className="btn-close-modal"
                    data-dismiss="modal"
                    aria-label="close"
                >
                    <BsXLg className="close-icon" />
                </button>
                <div className="modal-header">{title && <h3>{title}</h3>}</div>
                <div className="modal-dialog">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
