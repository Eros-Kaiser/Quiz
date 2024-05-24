// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import questionsData from './questions.json';
import Question from './Question';
import Leaderboard from './Leaderboard';
import { QuestionType, LeaderboardEntry } from './models/interfaces';
import { saveLeaderboard, loadLeaderboard } from './utils/leaderboardUtils';
import { shuffleArray } from './utils/shuffleUtils';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(false);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const storedLeaderboard = loadLeaderboard();
    setLeaderboard(storedLeaderboard);
  }, []);

  const startQuiz = () => {
    const shuffledQuestions = shuffleArray(questionsData).slice(0, 20);
    const shuffledQuestionsWithShuffledChoices = shuffledQuestions.map((q) => ({
      ...q,
      choices: shuffleArray(q.choices),
    }));
    setQuestions(shuffledQuestionsWithShuffledChoices);
    setScore(null);
    setAnswers({});
    setIsQuizSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsNameModalOpen(true);
  };

  const handleConfirmName = () => {
    const finalName = name.trim() === '' ? 'Anonymous' : name;
    let newScore = 0;
    questions.forEach((question) => {
      if (answers[question.key] === question.answer) {
        newScore++;
      }
    });
    setScore(newScore);

    const newEntry = { name: finalName, score: newScore };
    const updatedLeaderboard = [...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
    setLeaderboard(updatedLeaderboard);
    saveLeaderboard(updatedLeaderboard);
    setIsNameModalOpen(false);
    setIsQuizSubmitted(true);
  };

  const handleAnswerChange = (questionKey: number, choiceKey: string) => {
    setAnswers({ ...answers, [questionKey]: choiceKey });
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Random Quiz
      </Typography>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={startQuiz}>
          Start Quiz
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setIsLeaderboardOpen(true)}>
          Show Leaderboard
        </Button>
      </div>
      {questions.length > 0 && (
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <Question
              key={question.key}
              question={question}
              answer={answers[question.key]}
              handleAnswerChange={handleAnswerChange}
              isQuizSubmitted={isQuizSubmitted}
            />
          ))}
          {!isQuizSubmitted && (
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          )}
        </form>
      )}
      {score !== null && (
        <Typography variant="h5" component="p">
          Your score: {score}
        </Typography>
      )}
      {isQuizSubmitted && (
        <Button variant="contained" color="primary" onClick={startQuiz}>
          Try Again
        </Button>
      )}
      <Leaderboard open={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} leaderboard={leaderboard} />

      <Dialog open={isNameModalOpen} onClose={() => setIsNameModalOpen(false)}>
        <DialogTitle>Enter Your Name</DialogTitle>
        <DialogContent>
          <TextField
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmName} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
