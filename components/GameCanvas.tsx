import React, { useState, useEffect } from 'react';
import type { Point, Vector, Level, GameState } from '../types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE } from '../constants';
import { ShipIcon, TargetIcon } from './Icons';

interface GameCanvasProps {
    shipPosition: Point;
    shipAngle: number;
    pathHistory: Point[];
    level: Level;
    appliedVectors: Vector[];
    projectedPosition: Point;
    onDropVector: (vector: Vector) => void;
    gameState: GameState;
}

// Helper to convert game coordinates (origin at center) to SVG coordinates (origin at top-left)
const toSvgCoords = (p: Point): Point => {
    return {
        x: p.x + CANVAS_WIDTH / 2,
        y: -p.y + CANVAS_HEIGHT / 2,
    };
};

const Grid: React.FC = React.memo(() => {
    const lines = [];
    const labels = [];
    const originSvg = toSvgCoords({ x: 0, y: 0 });

    // Vertical lines and X-axis labels
    for (let i = -CANVAS_WIDTH / 2; i <= CANVAS_WIDTH / 2; i += GRID_SIZE) {
        const p1 = toSvgCoords({ x: i, y: -CANVAS_HEIGHT / 2 });
        const p2 = toSvgCoords({ x: i, y: CANVAS_HEIGHT / 2 });
        lines.push(<line key={`v-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(255, 255, 255, 0.05)" />);

        if (i !== 0) {
            labels.push(
                <text
                    key={`label-x-${i}`}
                    x={p1.x}
                    y={originSvg.y + 15}
                    fill="rgba(255, 255, 255, 0.4)"
                    fontSize="12"
                    fontFamily="monospace"
                    textAnchor="middle"
                    style={{ pointerEvents: 'none' }}
                >
                    {i}
                </text>
            );
        }
    }

    // Horizontal lines and Y-axis labels
    for (let i = -CANVAS_HEIGHT / 2; i <= CANVAS_HEIGHT / 2; i += GRID_SIZE) {
        const p1 = toSvgCoords({ x: -CANVAS_WIDTH / 2, y: i });
        const p2 = toSvgCoords({ x: CANVAS_WIDTH / 2, y: i });
        lines.push(<line key={`h-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(255, 255, 255, 0.05)" />);

        if (i !== 0) {
            labels.push(
                <text
                    key={`label-y-${i}`}
                    x={originSvg.x - 10}
                    y={p1.y}
                    fill="rgba(255, 255, 255, 0.4)"
                    fontSize="12"
                    fontFamily="monospace"
                    textAnchor="end"
                    dominantBaseline="middle"
                    style={{ pointerEvents: 'none' }}
                >
                    {i}
                </text>
            );
        }
    }

    // Axis lines
    lines.push(<line key="axis-x" x1={0} y1={originSvg.y} x2={CANVAS_WIDTH} y2={originSvg.y} stroke="rgba(255, 255, 255, 0.1)" />);
    lines.push(<line key="axis-y" x1={originSvg.x} y1={0} x2={originSvg.x} y2={CANVAS_HEIGHT} stroke="rgba(255, 255, 255, 0.1)" />);

    return <g>{lines}{labels}</g>;
});

const Stars: React.FC = React.memo(() => {
    const stars = Array.from({ length: 100 }).map((_, i) => (
        <circle
            key={i}
            cx={Math.random() * CANVAS_WIDTH}
            cy={Math.random() * CANVAS_HEIGHT}
            r={Math.random() * 1.5}
            fill="white"
            opacity={Math.random()}
        />
    ));
    return <g>{stars}</g>;
});

const GameCanvas: React.FC<GameCanvasProps> = ({
    shipPosition,
    shipAngle,
    pathHistory,
    level,
    appliedVectors,
    projectedPosition,
    onDropVector,
    gameState
}) => {
    const [visibleVectors, setVisibleVectors] = useState(0);

    useEffect(() => {
        if (gameState === 'animating_vectors') {
            setVisibleVectors(0); // Reset animation
            const timers: number[] = [];
            
            appliedVectors.forEach((_, index) => {
                const timer = window.setTimeout(() => {
                    setVisibleVectors(prev => prev + 1);
                }, index * 500); // Animate one vector every 500ms
                timers.push(timer);
            });

            return () => {
                timers.forEach(clearTimeout);
            };
        } else if (gameState === 'planning') {
            // Instantly show all vectors when planning
            setVisibleVectors(appliedVectors.length);
        }
    }, [gameState, appliedVectors]);

    const handleDragOver = (e: React.DragEvent<SVGSVGElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<SVGSVGElement>) => {
        e.preventDefault();
        const vectorJson = e.dataTransfer.getData("application/vector");
        if (vectorJson) {
            const vector = JSON.parse(vectorJson);
            onDropVector(vector);
        }
    };

    const svgShipPos = toSvgCoords(shipPosition);
    const svgTargetPos = toSvgCoords(level.target);
    const svgStartPos = toSvgCoords(level.start);

    // Path for ship history
    const pathData = "M " + pathHistory.map(p => {
        const svgP = toSvgCoords(p);
        return `${svgP.x} ${svgP.y}`;
    }).join(" L ");

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="bg-gray-900"
        >
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" />
                </marker>
                <style>
                    {`
                        @keyframes dash-flow {
                            from { stroke-dashoffset: 20; }
                            to { stroke-dashoffset: 0; }
                        }
                    `}
                </style>
            </defs>

            <Stars />
            <Grid />
            
            {/* Path history */}
            <path d={pathData} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.5" />

            {/* Obstacles */}
            {level.obstacles.map((obs, i) => {
                const svgObsPos = toSvgCoords(obs);
                return (
                     <g key={i}>
                        <circle cx={svgObsPos.x} cy={svgObsPos.y} r={obs.radius} fill="url(#obstacleGradient)" />
                        <defs>
                            <radialGradient id="obstacleGradient">
                                <stop offset="0%" stopColor="#f87171" />
                                <stop offset="100%" stopColor="#b91c1c" />
                            </radialGradient>
                        </defs>
                    </g>
                );
            })}

            {/* Target */}
            <g transform={`translate(${svgTargetPos.x}, ${svgTargetPos.y}) scale(1.5)`}>
                 <TargetIcon />
            </g>

            {/* Start Position Coordinates */}
            {gameState === 'planning' && (
                <text
                    x={svgStartPos.x}
                    y={svgStartPos.y - 20}
                    fill="rgba(255, 255, 255, 0.5)"
                    fontSize="14"
                    fontFamily="monospace"
                    textAnchor="middle"
                    style={{ pointerEvents: 'none' }}
                >
                    ({level.start.x}, {level.start.y})
                </text>
            )}

            {/* Applied Vectors Visualization */}
            {(gameState === 'planning' || gameState === 'animating_vectors') && appliedVectors.length > 0 && (
                <g>
                    {(() => {
                        let currentPos = { ...shipPosition };
                        return appliedVectors.slice(0, visibleVectors).map((vec) => {
                            const isRotationOnly = vec.rotation !== undefined && vec.x === 0 && vec.y === 0;
                            const svgStartPos = toSvgCoords(currentPos);
                            
                            let renderedElement;

                            if (isRotationOnly) {
                                const rotationAmount = vec.rotation || 0;
                                const cwPath = "M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10";
                                const ccwPath = "M1 4v6h6 M3.51 15a9 9 0 1 0 2.13-9.36L1 10";
                                renderedElement = (
                                    <g key={vec.id} transform={`translate(${svgStartPos.x-12}, ${svgStartPos.y-12})`}>
                                        <path
                                            d={rotationAmount > 0 ? cwPath : ccwPath}
                                            stroke={vec.color}
                                            fill="none"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <animate attributeName="opacity" from="0" to="0.8" dur="0.3s" fill="freeze" />
                                        </path>
                                    </g>
                                );
                                // Do not update currentPos for rotation
                            } else {
                                const nextPos = { x: currentPos.x + vec.x, y: currentPos.y + vec.y };
                                const svgEndPos = toSvgCoords(nextPos);
                                renderedElement = (
                                    <line 
                                        key={vec.id} 
                                        x1={svgStartPos.x} 
                                        y1={svgStartPos.y} 
                                        x2={svgEndPos.x} 
                                        y2={svgEndPos.y} 
                                        stroke={vec.color} 
                                        strokeWidth="3" 
                                        markerEnd="url(#arrowhead)"
                                    >
                                        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" />
                                    </line>
                                );
                                currentPos = nextPos;
                            }
                            return renderedElement;
                        });
                    })()}
                </g>
            )}
            
            {/* Projected Path (Resultant Vector) */}
            {gameState === 'planning' && appliedVectors.length > 0 && (() => {
                const svgProjectedPos = toSvgCoords(projectedPosition);
                return (
                    <line
                        x1={svgShipPos.x}
                        y1={svgShipPos.y}
                        x2={svgProjectedPos.x}
                        y2={svgProjectedPos.y}
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        opacity="0.7"
                        markerEnd="url(#arrowhead)"
                        style={{ animation: 'dash-flow 1s linear infinite' }}
                    />
                );
            })()}

            {/* Ship */}
             <g transform={`translate(${svgShipPos.x}, ${svgShipPos.y}) rotate(${shipAngle})`}>
                <ShipIcon />
            </g>

        </svg>
    );
};

export default GameCanvas;