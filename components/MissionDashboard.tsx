import React, { useMemo } from 'react';
import type { Point } from '../types';

interface MissionDashboardProps {
    shipPosition: Point;
    targetPosition: Point;
}

const DataPoint: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className }) => (
    <div className="flex flex-col items-center justify-center bg-black/20 p-2 rounded-md min-w-[140px]">
        <span className="text-xs text-cyan-400/70 tracking-widest uppercase">{label}</span>
        <span className={`text-lg font-mono text-gray-200 ${className}`}>{value}</span>
    </div>
);

const MissionDashboard: React.FC<MissionDashboardProps> = ({ shipPosition, targetPosition }) => {

    const deltaP = useMemo(() => {
        return {
            x: targetPosition.x - Math.round(shipPosition.x),
            y: targetPosition.y - Math.round(shipPosition.y),
        };
    }, [shipPosition, targetPosition]);

    return (
        <div className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm p-3 rounded-lg shadow-lg flex-shrink-0">
            <div className="flex items-center justify-around gap-4">
                <DataPoint label="Posição Atual" value={`(${Math.round(shipPosition.x)}, ${Math.round(shipPosition.y)})`} />
                <DataPoint label="Posição Alvo" value={`(${targetPosition.x}, ${targetPosition.y})`} className="text-yellow-300" />
                <DataPoint label="ΔP Necessário" value={`(${deltaP.x}, ${deltaP.y})`} className="text-green-400" />
            </div>
        </div>
    );
};

export default MissionDashboard;
