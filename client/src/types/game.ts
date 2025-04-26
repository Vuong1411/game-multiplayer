export interface Player {
    id: string;
    name: string;
    score: number;
}

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
    timeLimit: number;
    points: number;
}

export interface Game {
    id: string;
    pin: string;
    host: string;
    players: Player[];
    currentQuestion: number;
    questions: Question[];
    status: 'waiting' | 'active' | 'finished';
}