import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerId,
    });
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) {
      toast.error('Please select an answer before proceeding');
      return;
    }

    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < totalQuestions) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    setIsSubmitting(true);
    
    // Calculate score
    const score = questions.reduce((total, question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctAnswer;
      return isCorrect ? total + 1 : total;
    }, 0);

    // Simulate API call
    setTimeout(() => {
      setShowResults(true);
      setIsSubmitting(false);
      
      if (onComplete) {
        onComplete({
          score,
          totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100),
          answers: selectedAnswers,
        });
      }
    }, 1000);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    return questions.reduce((total, question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctAnswer;
      return isCorrect ? total + 1 : total;
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
        
        <div className="flex flex-col items-center mb-8">
          <div className={`text-5xl font-bold mb-2 ${percentage >= 70 ? 'text-green-500' : 'text-red-500'}`}>
            {percentage}%
          </div>
          <p className="text-neutral-400">
            You scored {score} out of {totalQuestions} questions correctly
          </p>
        </div>
        
        <div className="space-y-6 mb-8">
          {questions.map((question, index) => {
            const selectedAnswer = selectedAnswers[index];
            const isCorrect = selectedAnswer === question.correctAnswer;
            
            return (
              <div key={index} className="bg-neutral-700 rounded-lg p-4">
                <div className="flex items-start mb-3">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <h3 className="font-medium">{question.question}</h3>
                </div>
                
                <div className="ml-7 space-y-2">
                  {question.answers.map((answer) => (
                    <div 
                      key={answer.id} 
                      className={`p-2 rounded-md ${
                        answer.id === question.correctAnswer
                          ? 'bg-green-900/30 border border-green-700'
                          : answer.id === selectedAnswer
                            ? 'bg-red-900/30 border border-red-700'
                            : 'bg-neutral-800'
                      }`}
                    >
                      {answer.text}
                    </div>
                  ))}
                  
                  {!isCorrect && (
                    <p className="text-sm text-green-500 mt-2">
                      Correct answer: {question.answers.find(a => a.id === question.correctAnswer)?.text}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleRetry}
            className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
        <div className="text-sm text-neutral-400">
          {Object.keys(selectedAnswers).length} of {totalQuestions} answered
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(answer.id)}
              className={`w-full text-left p-3 rounded-md transition-colors ${
                selectedAnswers[currentQuestionIndex] === answer.id
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-neutral-700 hover:bg-neutral-600'
              }`}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-md ${
            currentQuestionIndex === 0
              ? 'bg-neutral-700 cursor-not-allowed opacity-50'
              : 'bg-neutral-700 hover:bg-neutral-600'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={isSubmitting}
          className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : isLastQuestion ? (
            'Submit Quiz'
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Quiz; 