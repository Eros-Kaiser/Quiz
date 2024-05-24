// src/utils/leaderboardUtils.ts
import { LeaderboardEntry } from '../models/interfaces';

export const loadLeaderboard = (): LeaderboardEntry[] => {
    const storedLeaderboard = localStorage.getItem('leaderboard');
    return storedLeaderboard ? JSON.parse(storedLeaderboard) : [];
};

export const saveLeaderboard = (leaderboard: LeaderboardEntry[]) => {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};
