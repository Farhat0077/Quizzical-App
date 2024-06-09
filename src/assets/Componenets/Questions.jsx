import React, { useState, useEffect } from 'react';
import he from 'he';
import Confetti from 'react-confetti';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(null));

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple');
      if (!response.ok) {
        console.error('Failed to fetch questions');
        return;
      }
      const data = await response.json();
      const formattedQuestions = data.results.map(question => {
        const shuffledAnswers = shuffleArray([...question.incorrect_answers, question.correct_answer]);
        return { ...question, answers: shuffledAnswers };
      });
      setQuestions(formattedQuestions);
      setIsLoaded(true);
    };

    fetchQuestions();
  }, [playAgain]);

  const handleAnswerClick = (questionIndex, selectedAnswer) => {
    if (!showResult) {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[questionIndex] = selectedAnswer; 
      setSelectedAnswers(newSelectedAnswers);
      
    }
  };
  const handleCheckAnswersClick = () => {
    setShowResult(true);
    let newScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        newScore++;
      }
    });
    setScore(newScore);
  };
  

  const buttonText = () => {
    setShowBtn(!showBtn);
  };

  const reset = () => {
    setShowResult(false);
    setScore(0);
    setSelectedAnswers(Array(5).fill(null));
    setPlayAgain(true);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div>
      {(!showBtn && score === 5) && <Confetti className="confetti" />}

      {questions.map((question, index) => (
        <div key={index}>
          <p className='questions'>{he.decode(question.question)}</p>
          <div>
            <ul className='answers'>
              {question.answers.map((answer, idx) => (
                <label key={idx} className="answer">
                  <div
                    onClick={() => handleAnswerClick(index, answer)}
                    className={`
                      ${!showResult ? 'custom-button' : 'custom-btn'}
                      ${showResult && answer === question.correct_answer ? 'correct-answer' : ''}
                      ${!showResult && selectedAnswers[index] === answer ? 'selected' : ''}
                      ${showResult && selectedAnswers[index] !== question.correct_answer && selectedAnswers[index] === answer ? 'incorrect-answer' : ''}
                    `}
                    disabled={showResult}
                  >
                    {he.decode(answer)}
                  </div>
                </label>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {isLoaded ? (
        <div>
          {showBtn ? (
            <button className='check-btn' onClick={() => { handleCheckAnswersClick(); buttonText(); }}>Show answers</button>
          ) : (
            <button className='reset-btn' onClick={() => { reset(); buttonText(); }}>Play again</button>
          )}
        </div>
      ) : (
              <p>Loading...</p>
      )}

      {showResult && (
        <h2>  You scored {score}/{questions.length} correct answers - ({(score / questions.length) * 100}%)</h2>
      )}
    </div>
  );
};
