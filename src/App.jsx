import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Documentation from "./components/Documentation";
import Learn from "./components/Learn";
import UserProfile from "./components/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Quiz from "./components/Quiz";
import CodePlayground from "./components/CodePlayground";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider, useToast } from "./contexts/ToastContext";
import { UserDataProvider, useUserData } from "./contexts/UserDataContext";
import { useState } from "react";

// Sample quiz questions for the Quiz component
const sampleQuizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { id: "a", text: "Hyper Text Markup Language" },
      { id: "b", text: "High Tech Modern Language" },
      { id: "c", text: "Hyper Transfer Markup Language" },
      { id: "d", text: "Home Tool Markup Language" }
    ],
    correctAnswer: "a"
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    answers: [
      { id: "a", text: "font-color" },
      { id: "b", text: "text-color" },
      { id: "c", text: "color" },
      { id: "d", text: "text-style" }
    ],
    correctAnswer: "c"
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: [
      { id: "a", text: "String" },
      { id: "b", text: "Boolean" },
      { id: "c", text: "Float" },
      { id: "d", text: "Object" }
    ],
    correctAnswer: "c"
  }
];

// Sample initial code for the CodePlayground
const sampleCode = `// Welcome to the Code Playground!
// Try writing some JavaScript code below:

function greet(name) {
  return "Hello, " + name + "!";
}

// Test your function
console.log(greet("World"));
`;

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

// Wrapper components for Quiz and CodePlayground with Navbar
const QuizPage = () => {
  const { recordQuizCompletion } = useUserData();
  const toast = useToast();

  const handleQuizComplete = (results) => {
    console.log("Quiz completed with results:", results);
    // Record the quiz completion in user data
    recordQuizCompletion(results);
    toast.success(`Quiz completed with score: ${results.percentage}%`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto pt-24 px-6 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Web Development Quiz</h1>
        <Quiz questions={sampleQuizQuestions} onComplete={handleQuizComplete} />
      </div>
    </>
  );
};

const CodePlaygroundPage = () => {
  const { recordCodePlaygroundUsage } = useUserData();
  const [code, setCode] = useState(sampleCode);

  // Record code playground usage when code changes
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    recordCodePlaygroundUsage(newCode);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto pt-24 px-6 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Interactive Code Playground</h1>
        <p className="text-neutral-400 mb-8 text-center">
          Write, edit, and run JavaScript code directly in your browser.
        </p>
        <CodePlayground 
          initialCode={code} 
          language="javascript" 
          onCodeChange={handleCodeChange}
        />
      </div>
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <UserDataProvider>
            <Router>
              <Routes>
                {/* Redirect root to login page */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/docs" element={<Documentation />} />
                <Route 
                  path="/learn" 
                  element={
                    <ProtectedRoute>
                      <Learn />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/quiz" 
                  element={
                    <ProtectedRoute>
                      <QuizPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/playground" 
                  element={
                    <ProtectedRoute>
                      <CodePlaygroundPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Router>
          </UserDataProvider>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
