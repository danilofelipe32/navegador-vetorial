export interface Point {
    x: number;
    y: number;
}

export interface Vector extends Point {
    id: string;
    color: string;
    label?: string;
    rotation?: number;
}

export interface Obstacle extends Point {
    radius: number;
}

export interface TutorialStep {
    title: string;
    text: string;
    highlightIds?: string[];
}

export interface Level {
    name: string;
    start: Point;
    target: Point;
    obstacles: Obstacle[];
    availableVectors: Vector[];
    tutorial?: TutorialStep[];
}

export type GameState = 'planning' | 'animating_vectors' | 'moving' | 'success' | 'fail';