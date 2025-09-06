import React, { useState, useCallback, useMemo, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import Sidebar from './components/Sidebar';
import InfoModal from './components/InfoModal';
import MissionDashboard from './components/MissionDashboard';
import TutorialModal from './components/TutorialModal';
import { ShipIcon } from './components/Icons';
import { LEVELS } from './constants';
import type { Point, Vector, Level, GameState, TutorialStep } from './types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, SHIP_SIZE } from './constants';

const App: React.FC = () => {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [level, setLevel] = useState<Level>(LEVELS[currentLevelIndex]);
    const [shipPosition, setShipPosition] = useState<Point>(level.start);
    const [shipAngle, setShipAngle] = useState<number>(90); // Default angle (pointing right)
    const [pathHistory, setPathHistory] = useState<Point[]>([level.start]);
    const [appliedVectors, setAppliedVectors] = useState<Vector[]>([]);
    const [gameState, setGameState] = useState<GameState>('planning'); // planning, animating_vectors, moving, success, fail
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(5); // 1=slow, 8=fast. Default 5 corresponds to old multiplier of 4.

    // Tutorial State
    const [tutorialSteps, setTutorialSteps] = useState<TutorialStep[]>([]);
    const [currentTutorialStepIndex, setCurrentTutorialStepIndex] = useState(0);
    const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);


    useEffect(() => {
        const newLevel = LEVELS[currentLevelIndex];
        setLevel(newLevel);
        setShipPosition(newLevel.start);
        setPathHistory([newLevel.start]);
        setAppliedVectors([]);
        setGameState('planning');
        setShipAngle(90); // Reset angle on level change
        
        // Handle tutorials
        const newTutorialSteps = newLevel.tutorial || [];
        setTutorialSteps(newTutorialSteps);
        setCurrentTutorialStepIndex(0);
        if (newTutorialSteps.length > 0) {
            setIsTutorialModalOpen(true);
        }

    }, [currentLevelIndex]);

    const handleDropVector = useCallback((vector: Vector) => {
        if (gameState !== 'planning') return;
        setAppliedVectors(prev => [...prev, { ...vector, id: `${vector.id}-${Date.now()}` }]);
    }, [gameState]);

    const handleResetTurn = useCallback(() => {
        setAppliedVectors([]);
    }, []);
    
    const handleUndo = useCallback(() => {
        setAppliedVectors(prev => prev.slice(0, -1));
    }, []);

    const resultantVector = useMemo(() => {
        return appliedVectors.reduce(
            (acc, vec) => ({ x: acc.x + vec.x, y: acc.y + vec.y }),
            { x: 0, y: 0 }
        );
    }, [appliedVectors]);

    const projectedPosition = useMemo(() => {
        return {
            x: shipPosition.x + resultantVector.x,
            y: shipPosition.y + resultantVector.y
        };
    }, [shipPosition, resultantVector]);
    
    const handleApplyMove = () => {
        if (appliedVectors.length === 0 || gameState !== 'planning') return;
        
        setGameState('animating_vectors');

        const vectorAnimationDuration = appliedVectors.length * 500 + 500;

        setTimeout(() => {
            setGameState('moving');

            const waypoints: Point[] = [shipPosition];
            let cumulativePosition = { ...shipPosition };
            for (const vec of appliedVectors) {
                cumulativePosition = { x: cumulativePosition.x + vec.x, y: cumulativePosition.y + vec.y };
                waypoints.push(cumulativePosition);
            }

            let segmentIndex = 0;
            let startOfSegmentAngle = shipAngle;

            const animateSegments = () => {
                if (segmentIndex >= appliedVectors.length) {
                    // All segments are done
                    const finalPosition = waypoints[waypoints.length - 1];
                    setShipPosition(finalPosition);
                    
                    const distToTarget = Math.hypot(finalPosition.x - level.target.x, finalPosition.y - level.target.y);
                    if (distToTarget < 10) {
                        setGameState('success');
                    } else {
                        setGameState('planning');
                        setAppliedVectors([]);
                    }
                    return;
                }
                
                const vectorForSegment = appliedVectors[segmentIndex];
                const startAngle = startOfSegmentAngle;
                const isRotationOnly = vectorForSegment.rotation !== undefined && vectorForSegment.x === 0 && vectorForSegment.y === 0;

                let targetAngle: number;
                let segmentDuration: number;
                let rotationDuration: number;

                if (isRotationOnly) {
                    // Handle pure rotation
                    const rotationAmount = vectorForSegment.rotation || 0;
                    let angleDiff = rotationAmount;
                    while (angleDiff < -180) angleDiff += 360;
                    while (angleDiff > 180) angleDiff -= 360;
                    targetAngle = startAngle + angleDiff;

                    segmentDuration = 500; // Fixed duration for rotation animation
                    rotationDuration = 500;

                } else {
                    // Handle movement
                    const targetAngleRaw = (Math.atan2(-vectorForSegment.y, vectorForSegment.x) * (180 / Math.PI)) + 90;
                    let angleDiff = targetAngleRaw - startAngle;
                    while (angleDiff < -180) angleDiff += 360;
                    while (angleDiff > 180) angleDiff -= 360;
                    targetAngle = startAngle + angleDiff;
                    
                    const magnitude = Math.hypot(vectorForSegment.x, vectorForSegment.y);
                    const durationMultiplier = 9 - animationSpeed;
                    segmentDuration = Math.max(50, magnitude * durationMultiplier);
                    rotationDuration = Math.min(segmentDuration, 400);
                }
                
                const start = waypoints[segmentIndex];
                const end = waypoints[segmentIndex + 1];

                let startTime: number | null = null;

                const animate = (currentTime: number) => {
                    if (startTime === null) startTime = currentTime;
                    const elapsedTime = currentTime - startTime;
                    
                    const progress = Math.min(elapsedTime / segmentDuration, 1);
                    
                    // Update position only if it's a movement vector
                    if (!isRotationOnly) {
                        const currentPos = {
                            x: start.x + (end.x - start.x) * progress,
                            y: start.y + (end.y - start.y) * progress,
                        };
                        setShipPosition(currentPos);
                        setPathHistory(prev => [...prev, currentPos]);

                        for (const obstacle of level.obstacles) {
                            const dist = Math.hypot(currentPos.x - obstacle.x, currentPos.y - obstacle.y);
                            if (dist < obstacle.radius + SHIP_SIZE / 2) {
                                setGameState('fail');
                                return;
                            }
                        }
                    }
                    
                    // Update rotation
                    const rotationProgress = Math.min(elapsedTime / rotationDuration, 1);
                    const currentAngle = startAngle + (targetAngle - startAngle) * rotationProgress;
                    setShipAngle(currentAngle);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        startOfSegmentAngle = targetAngle; // Set up angle for the next segment
                        segmentIndex++;
                        requestAnimationFrame(animateSegments);
                    }
                };
                requestAnimationFrame(animate);
            };

            requestAnimationFrame(animateSegments);

        }, vectorAnimationDuration);
    };

    const handleNextLevel = () => {
        if (currentLevelIndex < LEVELS.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
        } else {
            alert("Parabéns! Você completou todas as missões!");
            setCurrentLevelIndex(0); // Restart
        }
    };
    
    const handleRetryLevel = () => {
        const currentLevelData = LEVELS[currentLevelIndex];
        setLevel(currentLevelData);
        setShipPosition(currentLevelData.start);
        setPathHistory([currentLevelData.start]);
        setAppliedVectors([]);
        setGameState('planning');
        setShipAngle(90); // Reset angle
    };

    const handleDismissTutorial = () => {
        const nextStepIndex = currentTutorialStepIndex + 1;
        if (nextStepIndex < tutorialSteps.length) {
            setCurrentTutorialStepIndex(nextStepIndex);
        } else {
            setIsTutorialModalOpen(false);
        }
    };

    const currentTutorialStep = tutorialSteps[currentTutorialStepIndex];
    const highlightedVectorIds = isTutorialModalOpen ? currentTutorialStep?.highlightIds || [] : [];

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-900 font-sans p-4 gap-4 overflow-hidden">
            <div className="flex-grow flex flex-col gap-4">
                <MissionDashboard 
                    shipPosition={shipPosition} 
                    targetPosition={level.target} 
                />
                <div className="flex-grow flex items-center justify-center bg-black bg-opacity-30 rounded-lg shadow-2xl relative overflow-hidden">
                    <GameCanvas
                        shipPosition={shipPosition}
                        shipAngle={shipAngle}
                        pathHistory={pathHistory}
                        level={level}
                        appliedVectors={appliedVectors}
                        projectedPosition={projectedPosition}
                        onDropVector={handleDropVector}
                        gameState={gameState}
                    />
                </div>
            </div>
            <Sidebar
                level={level}
                appliedVectors={appliedVectors}
                resultantVector={resultantVector}
                gameState={gameState}
                onApplyMove={handleApplyMove}
                onResetTurn={handleResetTurn}
                onUndo={handleUndo}
                onNextLevel={handleNextLevel}
                onRetryLevel={handleRetryLevel}
                onOpenInfoModal={() => setIsInfoModalOpen(true)}
                animationSpeed={animationSpeed}
                onSetAnimationSpeed={setAnimationSpeed}
                highlightedVectorIds={highlightedVectorIds}
            />
             { (gameState === 'success' || gameState === 'fail') &&
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
                    <h2 className={`text-6xl font-bold mb-4 ${gameState === 'success' ? 'text-green-400' : 'text-red-500'}`}>
                        {gameState === 'success' ? 'MISSÃO CUMPRIDA!' : 'MISSÃO FALHOU!'}
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        {gameState === 'success' ? `Você alcançou o destino do nível ${currentLevelIndex + 1}.` : 'Sua nave colidiu com um obstáculo.'}
                    </p>
                    {gameState === 'success' ? (
                         <button onClick={handleNextLevel} className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg text-lg transition-transform transform hover:scale-105">
                           {currentLevelIndex < LEVELS.length - 1 ? 'Próxima Missão' : 'Jogar Novamente'}
                        </button>
                    ) : (
                         <button onClick={handleRetryLevel} className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg text-lg transition-transform transform hover:scale-105">
                            Tentar Novamente
                        </button>
                    )}
                </div>
            }
            <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
            {currentTutorialStep && (
                 <TutorialModal
                    isOpen={isTutorialModalOpen}
                    onDismiss={handleDismissTutorial}
                    step={currentTutorialStep}
                    isLastStep={currentTutorialStepIndex === tutorialSteps.length - 1}
                />
            )}
        </div>
    );
};

export default App;