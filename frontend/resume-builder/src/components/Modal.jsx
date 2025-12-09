import React from 'react';

const Modal = ({ children,
    isOpen,
    onClose,
    title,
    hideHeader,
    showActionBtn,
    actionBtnIcon = null,
    actionBtnText,
    onActionClick,
    maxWidth = 'max-w-xl',
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
            <div className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-full ${maxWidth} mx-auto max-h-[95vh]`}>
                {!hideHeader && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>

                        {showActionBtn && (
                            <button
                                className="btn-small-light mr-12"
                                onClick={() => onActionClick()}
                            >
                                {actionBtnIcon}
                                {actionBtnText}
                            </button>
                        )}
                    </div>
                )}

                <button
                    type="button"
                    className="bg-transparent text-black hover:bg-gray-200 hover:text-primary w-12 h-12 flex items-center justify-center rounded-full shadow-lg absolute top-3 right-3 transition-all duration-200 z-10 text-xl font-bold border-none"
                    onClick={onClose}
                >
                    <svg
                        className="w-8 h-8"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <line x1="6" y1="6" x2="18" y2="18" stroke="black" strokeWidth="2" strokeLinecap="round" />
                        <line x1="18" y1="6" x2="6" y2="18" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className='flex-1 overflow-y-auto custom-scrollbar'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;