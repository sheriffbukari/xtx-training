import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { useUserData } from "../contexts/UserDataContext";
import Navbar from "./Navbar";
import { User, BookOpen, Award, Clock, LogOut, RefreshCw, Code, CheckSquare, Trophy } from "lucide-react";

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const { userData, resetUserData } = useUserData();
  const toast = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      toast.success("Successfully logged out");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  const handleResetData = async () => {
    try {
      setLoading(true);
      const success = await resetUserData();
      if (success) {
        toast.success("User data has been reset successfully");
      } else {
        toast.error("Failed to reset user data");
      }
    } catch (error) {
      toast.error("An error occurred while resetting data");
    } finally {
      setLoading(false);
      setShowResetConfirm(false);
    }
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'User': return <User className="h-6 w-6 text-white" />;
      case 'Award': return <Award className="h-6 w-6 text-white" />;
      case 'Code': return <Code className="h-6 w-6 text-white" />;
      case 'CheckSquare': return <CheckSquare className="h-6 w-6 text-white" />;
      case 'Trophy': return <Trophy className="h-6 w-6 text-white" />;
      default: return <Award className="h-6 w-6 text-white" />;
    }
  };

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-orange-600 flex items-center justify-center text-white text-3xl mb-4">
                  {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : <User size={36} />}
                </div>
                <h2 className="text-xl font-bold">{currentUser.displayName || "User"}</h2>
                <p className="text-neutral-400 text-sm">{currentUser.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "profile" ? "bg-orange-600 text-white" : "hover:bg-neutral-700"
                  }`}
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "courses" ? "bg-orange-600 text-white" : "hover:bg-neutral-700"
                  }`}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  My Courses
                </button>
                <button
                  onClick={() => setActiveTab("achievements")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "achievements" ? "bg-orange-600 text-white" : "hover:bg-neutral-700"
                  }`}
                >
                  <Award className="mr-2 h-5 w-5" />
                  Achievements
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "activity" ? "bg-orange-600 text-white" : "hover:bg-neutral-700"
                  }`}
                >
                  <Clock className="mr-2 h-5 w-5" />
                  Activity
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full text-left px-4 py-2 rounded-md flex items-center text-red-500 hover:bg-red-900 hover:bg-opacity-20 mt-6"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>

          {/* Reset Confirmation Dialog */}
          {showResetConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-neutral-800 rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Reset User Data</h3>
                <p className="mb-6">
                  Are you sure you want to reset all your data? This will clear your quiz completions, 
                  code playground history, and learning progress. This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetData}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      "Reset Data"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Profile</h2>
                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="flex items-center text-sm px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Reset Data
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-700 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-neutral-400 text-sm">Display Name</p>
                          <p>{currentUser.displayName || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-neutral-400 text-sm">Email</p>
                          <p>{currentUser.email}</p>
                        </div>
                        <div>
                          <p className="text-neutral-400 text-sm">Account Created</p>
                          <p>{currentUser.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : "Unknown"}</p>
                        </div>
                        <div>
                          <p className="text-neutral-400 text-sm">Last Active</p>
                          <p>{new Date(userData.lastActive).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-neutral-700 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Learning Progress</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-neutral-400 text-sm">Completed Learning Paths</p>
                          <p className="text-2xl font-bold text-orange-500">
                            {userData.learningProgress ? 
                              Object.values(userData.learningProgress).filter(progress => progress.completedAt).length : 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-neutral-400 text-sm">In Progress</p>
                          <p className="text-2xl font-bold text-blue-500">
                            {userData.learningProgress ? 
                              Object.values(userData.learningProgress).filter(progress => !progress.completedAt).length : 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-neutral-400 text-sm">Topics Completed</p>
                          <div className="w-full bg-neutral-600 rounded-full h-2.5">
                            <div
                              className="bg-orange-600 h-2.5 rounded-full"
                              style={{ 
                                width: `${userData.learningProgress ? 
                                  Math.min(100, Object.values(userData.learningProgress)
                                    .reduce((total, progress) => total + (progress.completedTopics?.length || 0), 0)) : 0}%` 
                              }}
                            ></div>
                          </div>
                          <p className="text-sm mt-1">
                            {userData.learningProgress ? 
                              Object.values(userData.learningProgress)
                                .reduce((total, progress) => total + (progress.completedTopics?.length || 0), 0) : 0} topics
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Courses Tab */}
              {activeTab === "courses" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Learning Progress</h2>
                  
                  {userData.learningProgress && Object.keys(userData.learningProgress).length > 0 ? (
                    <div className="space-y-4">
                      {/* In Progress Courses */}
                      {Object.entries(userData.learningProgress)
                        .filter(([_, progress]) => !progress.completedAt)
                        .length > 0 && (
                        <div className="bg-neutral-700 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
                          <div className="space-y-2">
                            {Object.entries(userData.learningProgress)
                              .filter(([_, progress]) => !progress.completedAt)
                              .map(([pathTitle, progress]) => (
                                <div key={pathTitle} className="p-3 bg-neutral-800 rounded-md">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-medium">{pathTitle}</h4>
                                    <span className="text-sm bg-blue-900 text-blue-300 px-2 py-1 rounded">
                                      {progress.progressPercentage}% Complete
                                    </span>
                                  </div>
                                  <div className="w-full bg-neutral-600 rounded-full h-2 mt-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ width: `${progress.progressPercentage}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-neutral-500 mt-2">
                                    Started: {new Date(progress.startedAt).toLocaleDateString()}
                                    {progress.lastUpdated && ` • Last activity: ${new Date(progress.lastUpdated).toLocaleDateString()}`}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Completed Courses */}
                      {Object.entries(userData.learningProgress)
                        .filter(([_, progress]) => progress.completedAt)
                        .length > 0 && (
                        <div className="bg-neutral-700 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold mb-2">Completed</h3>
                          <div className="space-y-2">
                            {Object.entries(userData.learningProgress)
                              .filter(([_, progress]) => progress.completedAt)
                              .map(([pathTitle, progress]) => (
                                <div key={pathTitle} className="p-3 bg-neutral-800 rounded-md">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-medium">{pathTitle}</h4>
                                    <span className="text-sm bg-green-900 text-green-300 px-2 py-1 rounded">Completed</span>
                                  </div>
                                  <p className="text-xs text-neutral-500 mt-2">
                                    Completed on: {new Date(progress.completedAt).toLocaleDateString()}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-neutral-400">You haven't started any learning paths yet.</p>
                      <button
                        onClick={() => navigate('/learn')}
                        className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md transition-colors"
                      >
                        Browse Learning Paths
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === "achievements" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Achievements</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Learning Path Achievements */}
                    <div 
                      className={`bg-neutral-700 p-4 rounded-lg flex items-center ${
                        userData.learningProgress && 
                        Object.values(userData.learningProgress).some(progress => progress.completedAt)
                          ? 'opacity-100'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="p-3 bg-blue-900 rounded-full mr-4">
                        <Award className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Path Completer</h3>
                        <p className="text-sm text-neutral-400">Complete a learning path</p>
                      </div>
                    </div>
                    
                    {/* Quiz Achievements */}
                    <div 
                      className={`bg-neutral-700 p-4 rounded-lg flex items-center ${
                        userData.quizCompletions && userData.quizCompletions.length > 0
                          ? 'opacity-100'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="p-3 bg-green-900 rounded-full mr-4">
                        <CheckSquare className="h-6 w-6 text-green-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Quiz Master</h3>
                        <p className="text-sm text-neutral-400">Complete a quiz</p>
                      </div>
                    </div>
                    
                    {/* Perfect Score Achievement */}
                    <div 
                      className={`bg-neutral-700 p-4 rounded-lg flex items-center ${
                        userData.quizCompletions && 
                        userData.quizCompletions.some(quiz => quiz.percentage === 100)
                          ? 'opacity-100'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="p-3 bg-yellow-900 rounded-full mr-4">
                        <Trophy className="h-6 w-6 text-yellow-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Perfect Score</h3>
                        <p className="text-sm text-neutral-400">Get 100% on a quiz</p>
                      </div>
                    </div>
                    
                    {/* Code Playground Achievement */}
                    <div 
                      className={`bg-neutral-700 p-4 rounded-lg flex items-center ${
                        userData.codePlaygroundUsage && userData.codePlaygroundUsage.length > 0
                          ? 'opacity-100'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="p-3 bg-purple-900 rounded-full mr-4">
                        <Code className="h-6 w-6 text-purple-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Code Explorer</h3>
                        <p className="text-sm text-neutral-400">Use the code playground</p>
                      </div>
                    </div>
                    
                    {/* Topic Completion Achievement */}
                    <div 
                      className={`bg-neutral-700 p-4 rounded-lg flex items-center ${
                        userData.learningProgress && 
                        Object.values(userData.learningProgress)
                          .reduce((total, progress) => total + (progress.completedTopics?.length || 0), 0) >= 10
                          ? 'opacity-100'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="p-3 bg-orange-900 rounded-full mr-4">
                        <BookOpen className="h-6 w-6 text-orange-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Topic Expert</h3>
                        <p className="text-sm text-neutral-400">Complete 10 topics</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === "activity" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                  
                  {/* Quiz Completions */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckSquare className="mr-2 h-5 w-5 text-orange-500" />
                      Quiz Completions
                    </h3>
                    
                    {userData.quizCompletions && userData.quizCompletions.length > 0 ? (
                      <div className="space-y-4">
                        {userData.quizCompletions.slice().reverse().map((quiz, index) => (
                          <div key={index} className="bg-neutral-700 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Quiz Result</h4>
                              <span 
                                className={`text-sm px-2 py-1 rounded ${
                                  quiz.percentage >= 80 
                                    ? 'bg-green-900 text-green-300' 
                                    : quiz.percentage >= 60 
                                      ? 'bg-yellow-900 text-yellow-300' 
                                      : 'bg-red-900 text-red-300'
                                }`}
                              >
                                {quiz.percentage}% Score
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between text-sm text-neutral-400">
                                <span>Correct: {quiz.score}/{quiz.totalQuestions}</span>
                                <span>{new Date(quiz.timestamp.toDate()).toLocaleString()}</span>
                              </div>
                              <div className="w-full bg-neutral-600 rounded-full h-2 mt-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    quiz.percentage >= 80 
                                      ? 'bg-green-600' 
                                      : quiz.percentage >= 60 
                                        ? 'bg-yellow-600' 
                                        : 'bg-red-600'
                                  }`} 
                                  style={{ width: `${quiz.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-neutral-700 p-6 rounded-lg text-center">
                        <p className="text-neutral-400">You haven't completed any quizzes yet.</p>
                        <button
                          onClick={() => navigate('/quiz')}
                          className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md transition-colors"
                        >
                          Take a Quiz
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Code Playground Usage */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Code className="mr-2 h-5 w-5 text-orange-500" />
                      Code Playground Activity
                    </h3>
                    
                    {userData.codePlaygroundUsage && userData.codePlaygroundUsage.length > 0 ? (
                      <div className="space-y-4">
                        {userData.codePlaygroundUsage.slice().reverse().slice(0, 5).map((usage, index) => (
                          <div key={index} className="bg-neutral-700 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">{usage.language.charAt(0).toUpperCase() + usage.language.slice(1)} Code</h4>
                              <span className="text-sm text-neutral-400">
                                {new Date(usage.timestamp.toDate()).toLocaleString()}
                              </span>
                            </div>
                            <div className="bg-neutral-800 p-3 rounded font-mono text-sm overflow-x-auto">
                              <pre className="whitespace-pre-wrap">{usage.code}</pre>
                            </div>
                            <div className="mt-2 flex justify-end">
                              <button
                                onClick={() => navigate('/playground')}
                                className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                              >
                                Continue Coding
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {userData.codePlaygroundUsage.length > 5 && (
                          <div className="text-center mt-2">
                            <p className="text-neutral-400 text-sm">
                              Showing 5 of {userData.codePlaygroundUsage.length} code sessions
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-neutral-700 p-6 rounded-lg text-center">
                        <p className="text-neutral-400">You haven't used the code playground yet.</p>
                        <button
                          onClick={() => navigate('/playground')}
                          className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md transition-colors"
                        >
                          Try Code Playground
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile; 