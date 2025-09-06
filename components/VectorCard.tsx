
import React from 'react';
import type { Vector } from '../types';
import { RotateCcw, RotateCw } from './Icons';

interface VectorCardProps {
    vector: Vector;
    isDraggable: boolean;
    isHighlighted?: boolean;
}

const VectorCard: React.FC<VectorCardProps> = ({ vector, isDraggable, isHighlighted = false }) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isDraggable) return;
        e.dataTransfer.setData("application/vector", JSON.stringify(vector));
    };

    const sign = (num: number) => num >= 0 ? '+' : '-';
    const abs = (num: number) => Math.abs(num);

    const isRotation = vector.rotation !== undefined && vector.x === 0 && vector.y === 0;

    const highlightClass = isHighlighted ? 'animate-pulse-glow' : '';

    return (
        <div
            draggable={isDraggable}
            onDragStart={handleDragStart}
            className={`p-3 rounded-lg border-2 flex items-center justify-between transition-all ${isDraggable ? 'cursor-grab hover:bg-gray-600 hover:shadow-lg hover:border-cyan-400' : 'cursor-not-allowed bg-gray-700 opacity-50'} border-gray-600 bg-gray-700/50 ${highlightClass}`}
            style={{ borderColor: vector.color }}
        >
            <div className="font-mono text-lg text-white">
                 {isRotation ? (
                    <span>{vector.label || `Girar ${vector.rotation}°`}</span>
                 ) : (
                    <span>{vector.label || 'v'} = ({sign(vector.x)}{abs(vector.x)}, {sign(vector.y)}{abs(vector.y)})</span>
                 )}
            </div>
            <div className="flex items-center">
                {isRotation ? (
                    vector.rotation && vector.rotation > 0 ? <RotateCw color={vector.color} /> : <RotateCcw color={vector.color} />
                ) : (
                    <svg width="40" height="40" viewBox="-20 -20 40 40">
                        <line x1="0" y1="0" x2={vector.x/5} y2={-vector.y/5} stroke={vector.color} strokeWidth="2" markerEnd="url(#arrowhead-card)" />
                        <defs>
                            <marker id="arrowhead-card" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto" fill={vector.color}>
                                <polygon points="0 0, 5 1.75, 0 3.5" />
                            </marker>
                        </defs>
                    </svg>
                )}
            </div>
        </div>
    );
};

export default VectorCard;