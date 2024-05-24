// src/Leaderboard.tsx
import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { LeaderboardEntry } from './models/interfaces';

interface LeaderboardProps {
    open: boolean;
    onClose: () => void;
    leaderboard: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ open, onClose, leaderboard }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom>
                    Leaderboard
                </Typography>
                <List>
                    {leaderboard.map((entry, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${entry.name}: ${entry.score}`} />
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" onClick={onClose}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default Leaderboard;
