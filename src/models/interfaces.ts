// src/models/interfaces.ts

export interface ChoiceType {
    key: string;
    value: string;
}

export interface QuestionType {
    key: number;
    question: string;
    choices: ChoiceType[];
    answer: string;
}

export interface LeaderboardEntry {
    name: string;
    score: number;
}
