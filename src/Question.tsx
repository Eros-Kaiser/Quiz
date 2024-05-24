// src/Question.tsx
import React from 'react';
import { Paper, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { QuestionType } from './models/interfaces';

interface QuestionProps {
    question: QuestionType;
    answer: string | undefined;
    handleAnswerChange: (questionKey: number, choiceKey: string) => void;
    isQuizSubmitted: boolean;
}

const Question: React.FC<QuestionProps> = ({ question, answer, handleAnswerChange, isQuizSubmitted }) => {
    const getLabelStyle = (choiceKey: string) => {
        if (!isQuizSubmitted) return {};
        if (choiceKey === question.answer) {
            return { color: 'green' };
        }
        if (answer === choiceKey && answer !== question.answer) {
            return { color: 'red' };
        }
        return {};
    };

    return (
        <Paper style={{ padding: 16, margin: '16px 0' }}>
            <Typography variant="h6" component="h3">
                {question.question}
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    value={answer || ''}
                    onChange={(e) => handleAnswerChange(question.key, e.target.value)}
                >
                    {question.choices.map((choice) => (
                        <FormControlLabel
                            key={choice.key}
                            value={choice.key}
                            control={<Radio />}
                            label={choice.value}
                            style={getLabelStyle(choice.key)}
                            disabled={isQuizSubmitted}
                            sx={{ pointerEvents: isQuizSubmitted ? 'none' : 'auto' }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Paper>
    );
};

export default Question;
