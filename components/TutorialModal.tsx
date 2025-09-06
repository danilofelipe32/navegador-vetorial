import React from 'react';
import { TutorialStep } from '../types';

interface TutorialModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    step: TutorialStep;
    isLastStep: boolean;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onDismiss, step, isLastStep }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-gray-800 text-gray-200 p-8 rounded-lg shadow-2xl max-w-lg w-full m-4 border border-cyan-500/50 animate-pulse-glow">
                <h2 className="text-3xl font-bold text-cyan-300 mb-4">{step.title}</h2>
                
                <p className="text-gray-300 mb-6">{step.text}</p>
                
                <div className="text-right">
                    <button 
                        onClick={onDismiss} 
                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-transform transform hover:scale-105"
                        aria-label={isLastStep ? 'Entendido' : 'Próximo'}
                    >
                        {isLastStep ? 'Entendido!' : 'Próximo'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;