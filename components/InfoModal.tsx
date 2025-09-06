import React from 'react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-gray-800 text-gray-200 p-8 rounded-lg shadow-2xl max-w-2xl w-full m-4 border border-gray-700"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <h2 className="text-3xl font-bold text-cyan-300 mb-4">Como Jogar: Navegador Vetorial</h2>
                
                <div className="space-y-4 text-gray-300">
                    <div>
                        <h3 className="text-xl font-semibold text-green-400 mb-1">Objetivo</h3>
                        <p>Sua missão é guiar a nave espacial desde a posição inicial até o alvo circular em cada nível.</p>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold text-green-400 mb-1">Mecânica</h3>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li><span className="font-bold">Planeje seu Voo:</span> Arraste as "Cartas de Vetor" da <strong>Baía de Vetores</strong> e solte-as no mapa espacial.</li>
                            <li><span className="font-bold">Soma de Vetores:</span> Cada vetor adicionado é somado ao anterior, criando um "Plano de Voo". A linha tracejada mostra o deslocamento final que sua nave irá percorrer.</li>
                            <li><span className="font-bold">Evite Obstáculos:</span> Cuidado com os asteroides vermelhos! Colidir com eles resultará em falha na missão.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-green-400 mb-1">Controles</h3>
                         <ul className="list-disc list-inside space-y-1 pl-2">
                            <li><strong>Lançar!:</strong> Inicia o movimento da nave de acordo com o seu plano de voo.</li>
                            <li><strong>Desfazer:</strong> Remove o último vetor adicionado ao plano.</li>
                            <li><strong>Resetar:</strong> Limpa todos os vetores do plano atual para recomeçar.</li>
                        </ul>
                    </div>
                    
                     <p className="pt-2 text-cyan-400">
                        Boa sorte, comandante!
                    </p>
                </div>
                
                <div className="mt-6 text-right">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-transform transform hover:scale-105"
                        aria-label="Fechar modal de informações"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;