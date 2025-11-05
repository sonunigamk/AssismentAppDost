import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;