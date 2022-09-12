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
                <button
                    type="button"
                    className="btn-close"
                    data-dismiss="modal"
                    aria-label="close"
                >
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 540 360"
                        className="bg-btn-close"
                    >
                        <path
                            d="M195.81,288.76c8.63,16.49,25.7,26.82,44.3,26.82c86.26,0,172.53,0,258.79,0C540,315.59,540,360,540,360
	c0-105.2,0-254.8,0-360H0c0,0,43.74,0,68,44.43C110.61,125.87,153.21,207.32,195.81,288.76z"
                        />
                    </svg>
                    <BsXLg className="close-icon" />
                </button>
                <div className="modal-header">{title && <h3>{title}</h3>}</div>
                <div className="modal-dialog">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
