import React, { useState, useEffect, useRef } from 'react';
import VectorCard from './VectorCard';
import type { Vector, Level, Point, GameState } from '../types';
import { InfoIcon } from './Icons';

interface SidebarProps {
    level: Level;
    appliedVectors: Vector[];
    resultantVector: Point;
    gameState: GameState;
    onApplyMove: () => void;
    onResetTurn: () => void;
    onUndo: () => void;
    onNextLevel: () => void;
    onRetryLevel: () => void;
    onOpenInfoModal: () => void;
    animationSpeed: number;
    onSetAnimationSpeed: (speed: number) => void;
    highlightedVectorIds?: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
    level,
    appliedVectors,
    resultantVector,
    gameState,
    onApplyMove,
    onResetTurn,
    onUndo,
    onOpenInfoModal,
    animationSpeed,
    onSetAnimationSpeed,
    highlightedVectorIds = [],
}) => {
    const isPlanning = gameState === 'planning';
    const [isConfirmingReset, setIsConfirmingReset] = useState(false);
    const resetTimeoutRef = useRef<number | null>(null);
    
    // Auto-cancel reset confirmation after a delay
    useEffect(() => {
        if (isConfirmingReset) {
            resetTimeoutRef.current = window.setTimeout(() => {
                setIsConfirmingReset(false);
            }, 3000);
        }
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        };
    }, [isConfirmingReset]);
    
    // Reset confirmation state if vectors are cleared by other means
    useEffect(() => {
        if (appliedVectors.length === 0 && isConfirmingReset) {
            setIsConfirmingReset(false);
        }
    }, [appliedVectors, isConfirmingReset])

    const handleResetClick = () => {
        if (!isPlanning) return;

        if (isConfirmingReset) {
            onResetTurn();
            setIsConfirmingReset(false);
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        } else {
            setIsConfirmingReset(true);
        }
    };


    const levelNumberMatch = level.name.match(/\d+/);
    const levelNumber = levelNumberMatch ? levelNumberMatch[0] : null;
    const levelTitle = level.name.split(': ')[1];

    const getLevelDisplayName = () => {
        const isTutorial = level.name.toLowerCase().includes('tutorial');
        if (isTutorial) {
             return `${level.name}`;
        }
        if (levelNumber && levelTitle) {
            return `Nível ${levelNumber}: ${levelTitle}`;
        }
        return level.name; // Fallback for names without numbers, like training
    };

    return (
        <div className="w-full md:w-96 h-full flex flex-col bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg shadow-2xl text-gray-200 gap-4 overflow-y-auto">
            <div className="flex-shrink-0">
                 <div className="flex justify-between items-center border-b-2 border-cyan-500/30 pb-2">
                    <h1 className="text-2xl font-bold text-cyan-300">Navegador Vetorial</h1>
                    <button onClick={onOpenInfoModal} className="text-gray-400 hover:text-cyan-300 transition-colors" aria-label="Como Jogar">
                        <InfoIcon />
                    </button>
                </div>
                <h2 className="text-lg text-gray-400 mt-1">{getLevelDisplayName()}</h2>
            </div>

            <div className="flex-grow flex flex-col gap-4">
                {/* Available Vectors */}
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-300">Baía de Vetores</h3>
                    <div className="flex flex-col gap-2">
                        {level.availableVectors.map(vec => (
                            <VectorCard 
                                key={vec.id} 
                                vector={vec} 
                                isDraggable={isPlanning} 
                                isHighlighted={highlightedVectorIds.includes(vec.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Applied Vectors */}
                <div className="flex-1 min-h-0">
                    <h3 className="text-xl font-semibold mb-2 text-gray-300">Plano de Voo</h3>
                    <div className="bg-gray-900/50 p-3 rounded-lg h-full flex flex-col gap-2 overflow-y-auto">
                        {appliedVectors.length === 0 ? (
                            <p className="text-center text-gray-500 p-4">Arraste vetores aqui para planejar seu movimento.</p>
                        ) : (
                            appliedVectors.map((vec, i) => {
                                const isRotationOnly = vec.rotation !== undefined && vec.x === 0 && vec.y === 0;
                                return (
                                    <div key={vec.id} className="bg-gray-700/80 p-2 rounded text-sm font-mono flex justify-between items-center">
                                         <span>{i+1}. {isRotationOnly ? `Girar ${vec.rotation}°` : `(${vec.x}, ${vec.y})`}</span>
                                         <span style={{color: vec.color}}>■</span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                 {/* Resultant Vector */}
                <div className="bg-gray-900/50 p-3 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-300">Deslocamento Resultante</h3>
                     <p className="font-mono text-lg text-green-400">ΔP = ({resultantVector.x}, {resultantVector.y})</p>
                </div>

                 {/* Animation Speed Control */}
                <div className="bg-gray-900/50 p-3 rounded-lg">
                    <label htmlFor="speed-slider" className="text-md font-semibold text-gray-300 mb-2 block">Velocidade da Animação</label>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">Lenta</span>
                        <input
                            id="speed-slider"
                            type="range"
                            min="1"
                            max="8"
                            step="1"
                            value={animationSpeed}
                            onChange={(e) => onSetAnimationSpeed(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                            disabled={!isPlanning}
                            aria-label="Ajustar velocidade da animação"
                        />
                        <span className="text-xs text-gray-400">Rápida</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex-shrink-0 flex flex-col gap-2">
                 <div className="flex gap-2">
                    <button
                        onClick={onUndo}
                        disabled={!isPlanning || appliedVectors.length === 0}
                        className="w-1/2 px-4 py-2 bg-yellow-600 text-white font-bold rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-yellow-500 transition"
                    >
                        Desfazer
                    </button>
                    <button
                        onClick={handleResetClick}
                        disabled={!isPlanning || appliedVectors.length === 0}
                        className={`w-1/2 px-4 py-2 text-white font-bold rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 ${
                            isConfirmingReset
                            ? 'bg-red-500 hover:bg-red-400 scale-105'
                            : 'bg-red-600 hover:bg-red-500'
                        }`}
                    >
                        {isConfirmingReset ? 'Confirmar?' : 'Resetar'}
                    </button>
                </div>
                <button
                    onClick={onApplyMove}
                    disabled={!isPlanning || appliedVectors.length === 0}
                    className={`w-full px-4 py-3 bg-green-500 text-white font-bold rounded-md text-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-green-400 transition ${
                        isPlanning && appliedVectors.length > 0 ? 'animate-pulse-glow' : ''
                    }`}
                >
                    Lançar!
                </button>
            </div>
        </div>
    );
};

export default Sidebar;