import { useState, useEffect } from 'react';
import { BookOpen, Code, PlayCircle, Star, ChevronRight, Search, ExternalLink, PenTool, Terminal, CheckCircle, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useUserData } from '../contexts/UserDataContext';
import { useToast } from '../contexts/ToastContext';

const learningPaths = [
  {
    title: "Web Development Stack",
    description: "Master HTML, CSS, and JavaScript - the fundamental trio of web development",
    duration: "10 weeks",
    level: "Beginner",
    icon: <Code className="text-orange-500" size={24} />,
    topics: ["HTML5", "CSS3", "JavaScript", "DOM", "API Integration", "Responsive Design"],
    resources: [
      { name: "W3Schools HTML", url: "https://www.w3schools.com/html/" },
      { name: "W3Schools CSS", url: "https://www.w3schools.com/css/" },
      { name: "W3Schools JavaScript", url: "https://www.w3schools.com/js/" },
      { name: "Web Dev Simplified", url: "https://www.youtube.com/@WebDevSimplified" }
    ]
  },
  {
    title: "Python Development",
    description: "Learn Python programming for data science, AI, and web development",
    duration: "8 weeks",
    level: "Beginner",
    icon: <Code className="text-orange-500" size={24} />,
    topics: ["Python Basics", "Data Analysis", "Machine Learning", "Django/Flask", "Scientific Computing"],
    resources: [
      { name: "W3Schools Python", url: "https://www.w3schools.com/python/" },
      { name: "freeCodeCamp Python", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
      { name: "Tech With Tim", url: "https://www.youtube.com/@TechWithTim" }
    ]
  },
  {
    title: "JavaScript & TypeScript",
    description: "Master modern JavaScript and TypeScript for web development",
    duration: "12 weeks",
    level: "Intermediate",
    icon: <BookOpen className="text-orange-500" size={24} />,
    topics: ["ES6+", "TypeScript", "React", "Node.js", "State Management"],
    resources: [
      { name: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/" },
      { name: "Traversy TypeScript", url: "https://www.youtube.com/watch?v=BCg4U1FzODs" },
      { name: "Fireship", url: "https://www.youtube.com/@Fireship" }
    ]
  },
  {
    title: "Java Development",
    description: "Learn Java programming for enterprise and Android development",
    duration: "12 weeks",
    level: "Intermediate",
    icon: <Code className="text-orange-500" size={24} />,
    topics: ["Core Java", "Spring Boot", "Android Dev", "Enterprise Apps", "Cloud Services"],
    resources: [
      { name: "W3Schools Java", url: "https://www.w3schools.com/java/" },
      { name: "Java Brains", url: "https://www.youtube.com/@Java.Brains" },
      { name: "Spring Boot Tutorial", url: "https://www.youtube.com/watch?v=9SGDpanrc8U" }
    ]
  },
  {
    title: "C++ Programming",
    description: "Master C++ for systems programming and game development",
    duration: "10 weeks",
    level: "Advanced",
    icon: <Code className="text-orange-500" size={24} />,
    topics: ["C++ Basics", "Memory Management", "Game Dev", "Systems Programming", "Performance"],
    resources: [
      { name: "W3Schools C++", url: "https://www.w3schools.com/cpp/" },
      { name: "The Cherno", url: "https://www.youtube.com/@TheCherno" },
      { name: "C++ Tutorial", url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y" }
    ]
  },
  {
    title: "Ruby Development",
    description: "Learn Ruby and Ruby on Rails for web development",
    duration: "8 weeks",
    level: "Intermediate",
    icon: <BookOpen className="text-orange-500" size={24} />,
    topics: ["Ruby Basics", "Rails", "Testing", "API Development", "Deployment"],
    resources: [
      { name: "Ruby Documentation", url: "https://www.ruby-lang.org/en/documentation/" },
      { name: "GoRails", url: "https://www.youtube.com/@GorailsTV" },
      { name: "Ruby on Rails Tutorial", url: "https://www.youtube.com/watch?v=fmyvWz5TUWg" }
    ]
  },
  {
    title: "Swift Development",
    description: "Build iOS and macOS applications with Swift",
    duration: "10 weeks",
    level: "Intermediate",
    icon: <Code className="text-orange-500" size={24} />,
    topics: ["Swift Basics", "iOS Dev", "UIKit", "SwiftUI", "App Store"],
    resources: [
      { name: "Swift.org", url: "https://www.swift.org/documentation/" },
      { name: "Paul Hudson", url: "https://www.youtube.com/@twostraws" },
      { name: "CodeWithChris", url: "https://www.youtube.com/@CodeWithChris" }
    ]
  },
  {
    title: "Rust Programming",
    description: "Learn Rust for systems programming and web assembly",
    duration: "12 weeks",
    level: "Advanced",
    icon: <Code className="text-orange-500" size={24} />,
    topics: ["Rust Basics", "Memory Safety", "Concurrency", "WebAssembly", "Systems"],
    resources: [
      { name: "Rust Book", url: "https://doc.rust-lang.org/book/" },
      { name: "Let's Get Rusty", url: "https://www.youtube.com/@LetsGetRusty" },
      { name: "Rust Crash Course", url: "https://www.youtube.com/watch?v=zF34dRivLOw" }
    ]
  },
  {
    title: "Kotlin Development",
    description: "Master Kotlin for Android and cross-platform development",
    duration: "8 weeks",
    level: "Intermediate",
    icon: <BookOpen className="text-orange-500" size={24} />,
    topics: ["Kotlin Basics", "Android", "Multiplatform", "Coroutines", "Testing"],
    resources: [
      { name: "Kotlin Docs", url: "https://kotlinlang.org/docs/home.html" },
      { name: "Philipp Lackner", url: "https://www.youtube.com/@PhilippLackner" },
      { name: "Android Developers", url: "https://www.youtube.com/@AndroidDevelopers" }
    ]
  },
  {
    title: "PHP Development",
    description: "Learn PHP for web development and CMS creation",
    duration: "8 weeks",
    level: "Beginner",
    icon: <Code className="text-orange-500" size={24} />,
    topics: ["PHP Basics", "Laravel", "WordPress", "APIs", "Security"],
    resources: [
      { name: "W3Schools PHP", url: "https://www.w3schools.com/php/" },
      { name: "Traversy PHP", url: "https://www.youtube.com/watch?v=BUCiSSyIGGU" },
      { name: "Laravel Daily", url: "https://www.youtube.com/@LaravelDaily" }
    ]
  },
  {
    title: "C# and .NET",
    description: "Master C# for Windows apps and game development",
    duration: "12 weeks",
    level: "Intermediate",
    icon: <Code className="text-orange-500" size={24} />,
    topics: ["C# Basics", ".NET Core", "Unity", "ASP.NET", "Azure"],
    resources: [
      { name: "W3Schools C#", url: "https://www.w3schools.com/cs/" },
      { name: "IAmTimCorey", url: "https://www.youtube.com/@IAmTimCorey" },
      { name: "Unity Tutorial", url: "https://www.youtube.com/watch?v=gB1F9G0JXOo" }
    ]
  },
  {
    title: "Go Programming",
    description: "Learn Go for cloud services and system tools",
    duration: "8 weeks",
    level: "Intermediate",
    icon: <Code className="text-orange-500" size={24} />,
    topics: ["Go Basics", "Concurrency", "Microservices", "Cloud Native", "DevOps"],
    resources: [
      { name: "Go by Example", url: "https://gobyexample.com/" },
      { name: "TechWorld with Nana", url: "https://www.youtube.com/@TechWorldwithNana" },
      { name: "Go Tutorial", url: "https://www.youtube.com/watch?v=YS4e4q9oBaU" }
    ]
  }
];

// Updated tutorials array with more comprehensive content
const tutorials = [
  {
    language: "Web Development",
    videos: [
      {
        title: "Complete HTML & CSS Course",
        duration: "120 min",
        level: "Beginner",
        views: "250.5k",
        instructor: "Traversy Media",
        url: "https://www.youtube.com/watch?v=mU6anWqZJcc"
      },
      {
        title: "JavaScript Crash Course",
        duration: "90 min",
        level: "Beginner",
        views: "180.3k",
        instructor: "Web Dev Simplified",
        url: "https://www.youtube.com/watch?v=W6NZfCO5SIk"
      }
    ]
  },
  {
    language: "Python",
    videos: [
      {
        title: "Python for Beginners",
        duration: "240 min",
        level: "Beginner",
        views: "500.2k",
        instructor: "freeCodeCamp",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw"
      },
      {
        title: "Python Data Science Tutorial",
        duration: "180 min",
        level: "Intermediate",
        views: "150.8k",
        instructor: "Tech With Tim",
        url: "https://www.youtube.com/watch?v=WGJJIrtnfpk"
      }
    ]
  },
  {
    language: "JavaScript & TypeScript",
    videos: [
      {
        title: "TypeScript Full Course",
        duration: "150 min",
        level: "Intermediate",
        views: "200.4k",
        instructor: "Academind",
        url: "https://www.youtube.com/watch?v=BwuLxPH8IDs"
      },
      {
        title: "Modern JavaScript Tutorial",
        duration: "180 min",
        level: "Beginner",
        views: "320.1k",
        instructor: "Net Ninja",
        url: "https://www.youtube.com/watch?v=iWOYAxlnaww"
      }
    ]
  },
  {
    language: "Java",
    videos: [
      {
        title: "Java Programming Tutorial",
        duration: "210 min",
        level: "Beginner",
        views: "280.7k",
        instructor: "Java Brains",
        url: "https://www.youtube.com/watch?v=eIrMbAQSU34"
      },
      {
        title: "Spring Boot Complete Course",
        duration: "240 min",
        level: "Intermediate",
        views: "190.5k",
        instructor: "Amigoscode",
        url: "https://www.youtube.com/watch?v=9SGDpanrc8U"
      }
    ]
  }
];

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPath, setExpandedPath] = useState(null);
  const [showResources, setShowResources] = useState({});
  const [activeTab, setActiveTab] = useState('paths'); // New state for tab management
  const { userData, updateLearningProgress } = useUserData();
  const toast = useToast();

  // Filter learning paths based on search term
  const filteredPaths = learningPaths.filter(path => {
    const searchLower = searchTerm.toLowerCase();
    return (
      path.title.toLowerCase().includes(searchLower) ||
      path.description.toLowerCase().includes(searchLower) ||
      path.topics.some(topic => topic.toLowerCase().includes(searchLower))
    );
  });

  // Handle marking a topic as completed
  const handleTopicCompletion = async (pathTitle, topicIndex, completed) => {
    try {
      // Get current progress for this path
      const currentProgress = userData.learningProgress?.[pathTitle] || {
        startedAt: new Date().toISOString(),
        completedTopics: []
      };
      
      // Update completed topics
      let completedTopics = [...currentProgress.completedTopics];
      
      if (completed) {
        // Add topic if not already in the array
        if (!completedTopics.includes(topicIndex)) {
          completedTopics.push(topicIndex);
        }
      } else {
        // Remove topic if it's in the array
        completedTopics = completedTopics.filter(t => t !== topicIndex);
      }
      
      // Calculate progress percentage
      const path = learningPaths.find(p => p.title === pathTitle);
      const totalTopics = path.topics.length;
      const progressPercentage = Math.round((completedTopics.length / totalTopics) * 100);
      
      // Update progress object
      const updatedProgress = {
        ...currentProgress,
        completedTopics,
        lastUpdated: new Date().toISOString(),
        progressPercentage
      };
      
      // If all topics are completed, mark the path as completed
      if (completedTopics.length === totalTopics) {
        updatedProgress.completedAt = new Date().toISOString();
        toast.success(`Congratulations! You've completed the ${pathTitle} learning path!`);
      } else if (completedTopics.length === 1 && currentProgress.completedTopics.length === 0) {
        toast.success(`You've started the ${pathTitle} learning path!`);
      }
      
      // Update in context/database
      await updateLearningProgress(pathTitle, updatedProgress);
      
      // Show toast for topic completion
      if (completed) {
        toast.success(`Topic "${path.topics[topicIndex]}" marked as completed!`);
      }
    } catch (error) {
      console.error('Error updating learning progress:', error);
      toast.error('Failed to update progress');
    }
  };

  // Check if a topic is completed
  const isTopicCompleted = (pathTitle, topicIndex) => {
    const pathProgress = userData.learningProgress?.[pathTitle];
    return pathProgress?.completedTopics?.includes(topicIndex) || false;
  };

  // Get progress percentage for a path
  const getPathProgress = (pathTitle) => {
    const pathProgress = userData.learningProgress?.[pathTitle];
    return pathProgress?.progressPercentage || 0;
  };

  // Handle external link click
  const handleExternalLinkClick = (resourceName, pathTitle) => {
    // Track resource usage
    console.log(`Resource clicked: ${resourceName} for ${pathTitle}`);
  };

  // Toggle resources visibility
  const toggleResources = (index) => {
    setShowResources(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Center</h1>
            <p className="text-neutral-400">Choose your preferred learning method</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link 
              to="/quiz" 
              className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md transition-colors"
            >
              <PenTool className="h-4 w-4 mr-2" />
              Take a Quiz
            </Link>
            <Link 
              to="/playground" 
              className="flex items-center px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
            >
              <Terminal className="h-4 w-4 mr-2" />
              Code Playground
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 border-b border-neutral-700">
          <button
            onClick={() => setActiveTab('paths')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === 'paths' 
                ? 'text-orange-500' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Learning Paths
            </div>
            {activeTab === 'paths' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === 'videos' 
                ? 'text-orange-500' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Video Tutorials
            </div>
            {activeTab === 'videos' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-md bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder={activeTab === 'paths' ? "Search learning paths..." : "Search video tutorials..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Interactive Learning Tools Section */}
        <div className="mb-12 p-6 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-lg border border-neutral-700">
          <h2 className="text-xl font-bold mb-4">Interactive Learning Tools</h2>
          <p className="text-neutral-400 mb-6">
            Enhance your learning experience with our interactive tools designed to help you practice and test your skills.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 hover:border-orange-500 transition-colors">
              <div className="flex items-start">
                <div className="bg-orange-600/20 p-3 rounded-lg mr-4">
                  <PenTool className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Interactive Quizzes</h3>
                  <p className="text-neutral-400 mb-4">
                    Test your knowledge with our interactive quizzes covering various programming topics.
                  </p>
                  <Link 
                    to="/quiz" 
                    className="text-orange-500 hover:text-orange-400 flex items-center"
                  >
                    Take a quiz <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 hover:border-orange-500 transition-colors">
              <div className="flex items-start">
                <div className="bg-orange-600/20 p-3 rounded-lg mr-4">
                  <Terminal className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Code Playground</h3>
                  <p className="text-neutral-400 mb-4">
                    Practice your coding skills in our interactive JavaScript playground with real-time execution.
                  </p>
                  <Link 
                    to="/playground" 
                    className="text-orange-500 hover:text-orange-400 flex items-center"
                  >
                    Open playground <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'paths' ? (
          <div className="space-y-6">
            {filteredPaths.length > 0 ? (
              filteredPaths.map((path, index) => (
                <div 
                  key={index}
                  className={`bg-neutral-800 rounded-lg p-6 border ${expandedPath === index ? 'border-orange-500' : 'border-neutral-700'} transition-all`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-neutral-700 rounded-lg">
                        {path.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-1">{path.title}</h2>
                        <p className="text-neutral-400 mb-2">{path.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-700">
                            {path.duration}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-700">
                            {path.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-right mb-2">
                        <span className="text-sm font-medium text-orange-500">{getPathProgress(path.title)}% Complete</span>
                      </div>
                      <div className="w-32 bg-neutral-700 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${getPathProgress(path.title)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => toggleResources(index)}
                      className="text-sm font-medium text-orange-500 hover:text-orange-400 mr-4"
                    >
                      {showResources[index] ? 'Hide Resources' : 'View Resources'}
                    </button>
                    <button
                      onClick={() => setExpandedPath(expandedPath === index ? null : index)}
                      className="text-sm font-medium text-orange-500 hover:text-orange-400 flex items-center"
                    >
                      {expandedPath === index ? 'Collapse' : 'Expand'} Topics
                      <ChevronRight
                        className={`ml-1 h-4 w-4 transition-transform ${
                          expandedPath === index ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Resources section */}
                  {showResources[index] && (
                    <div className="mt-4 p-4 bg-neutral-700 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Learning Resources</h3>
                      <ul className="space-y-2">
                        {path.resources.map((resource, resIndex) => (
                          <li key={resIndex}>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
                              onClick={() => handleExternalLinkClick(resource.name, path.title)}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              {resource.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Expanded topics */}
                  {expandedPath === index && (
                    <div className="mt-4 space-y-2">
                      <h3 className="text-sm font-medium mb-2">Topics</h3>
                      {path.topics.map((topic, topicIndex) => (
                        <div 
                          key={topicIndex} 
                          className={`p-3 rounded-lg flex items-center justify-between ${
                            isTopicCompleted(path.title, topicIndex) 
                              ? 'bg-green-900 bg-opacity-20 border border-green-800' 
                              : 'bg-neutral-700'
                          }`}
                        >
                          <span>{topic}</span>
                          <button
                            onClick={() => handleTopicCompletion(
                              path.title, 
                              topicIndex, 
                              !isTopicCompleted(path.title, topicIndex)
                            )}
                            className={`p-1 rounded-full ${
                              isTopicCompleted(path.title, topicIndex)
                                ? 'text-green-500 hover:text-green-400'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                            title={isTopicCompleted(path.title, topicIndex) ? "Mark as incomplete" : "Mark as completed"}
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-400">No learning paths found matching your search.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {tutorials
              .filter(category => 
                category.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.videos.some(video => 
                  video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  video.instructor.toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
              .map((category, index) => (
                <div key={index} className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <PlayCircle className="h-6 w-6 text-orange-500 mr-2" />
                    {category.language}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.videos.map((video, videoIndex) => (
                      <a
                        key={videoIndex}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-2">{video.title}</h3>
                            <p className="text-sm text-neutral-400 mb-2">
                              By {video.instructor}
                            </p>
                            <div className="flex space-x-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-600">
                                {video.duration}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-600">
                                {video.level}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-600">
                                {video.views} views
                              </span>
                            </div>
                          </div>
                          <ExternalLink className="h-5 w-5 text-neutral-400" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Learn; 