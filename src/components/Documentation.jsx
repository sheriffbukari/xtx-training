import { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

const programmingLanguages = [
  {
    name: 'Web Development Stack',
    description: 'The fundamental trio of web development: HTML for structure, CSS for styling, and JavaScript for interactivity.',
    benefits: [
      'Universal web platform support',
      'Immediate visual feedback during development',
      'Huge ecosystem of frameworks and tools',
      'Progressive enhancement capability',
      'Excellent browser developer tools'
    ],
    useCases: [
      'Modern web applications',
      'Progressive Web Apps (PWAs)',
      'Interactive user interfaces',
      'Responsive websites',
      'Single Page Applications (SPAs)'
    ],
    icon: '🌐',
    details: {
      html: {
        title: 'HTML',
        description: 'The backbone of web content, providing structure and semantics.',
        features: [
          'Semantic markup for better accessibility',
          'Built-in form validation',
          'Multimedia support',
          'SEO-friendly structure'
        ]
      },
      css: {
        title: 'CSS',
        description: 'Styling language that brings design and layout to life.',
        features: [
          'Flexbox and Grid layouts',
          'Animations and transitions',
          'Responsive design with media queries',
          'Custom properties (variables)'
        ]
      },
      javascript: {
        title: 'JavaScript',
        description: 'Programming language that adds interactivity and dynamic behavior.',
        features: [
          'DOM manipulation',
          'Event handling',
          'Asynchronous programming',
          'API integration'
        ]
      }
    }
  },
  {
    name: 'Python',
    description: 'Known for its simplicity and readability, perfect for beginners and professionals alike.',
    benefits: [
      'Easy to learn and read',
      'Extensive standard library',
      'Strong support for data science and AI',
      'Cross-platform compatibility',
      'Rich ecosystem of packages (pip)'
    ],
    useCases: [
      'Data analysis and visualization',
      'Machine learning and AI',
      'Web development with Django/Flask',
      'Automation and scripting',
      'Scientific computing'
    ],
    icon: '🐍'
  },
  {
    name: 'JavaScript',
    description: 'A versatile language for web development, both frontend and backend.',
    benefits: [
      'Runs in every browser',
      'Large ecosystem of libraries and frameworks',
      'Full-stack development with Node.js',
      'Active community and extensive resources',
      'Rich package ecosystem (npm)'
    ],
    useCases: [
      'Web applications',
      'Server-side development',
      'Mobile apps with React Native',
      'Desktop applications with Electron',
      'Real-time applications'
    ],
    icon: '🟨'
  },
  {
    name: 'Java',
    description: 'A robust, object-oriented language known for its "Write Once, Run Anywhere" capability.',
    benefits: [
      'Platform independence',
      'Strong type safety',
      'Excellent for enterprise applications',
      'Rich set of development tools',
      'High performance and scalability'
    ],
    useCases: [
      'Enterprise software',
      'Android app development',
      'Large-scale backend systems',
      'Cloud-based applications',
      'Embedded systems'
    ],
    icon: '☕'
  },
  {
    name: 'C++',
    description: 'A powerful systems programming language with high performance and low-level control.',
    benefits: [
      'High performance and efficiency',
      'Direct hardware access',
      'Rich standard library',
      'Object-oriented features',
      'Cross-platform development'
    ],
    useCases: [
      'Game development',
      'System software',
      'Real-time systems',
      'Embedded programming',
      'High-performance applications'
    ],
    icon: '⚡'
  },
  {
    name: 'Ruby',
    description: 'An elegant, dynamic language focused on simplicity and productivity.',
    benefits: [
      'Developer happiness focus',
      'Clean and readable syntax',
      'Rich ecosystem of gems',
      'Great for rapid prototyping',
      'Strong web development framework (Rails)'
    ],
    useCases: [
      'Web development with Rails',
      'Scripting and automation',
      'DevOps tools',
      'Prototyping',
      'Content management systems'
    ],
    icon: '💎'
  },
  {
    name: 'Swift',
    description: 'Apple\'s modern language for iOS, macOS, and beyond.',
    benefits: [
      'Safe and fast performance',
      'Modern syntax',
      'Strong Apple ecosystem integration',
      'Built-in memory safety',
      'Excellent developer tools'
    ],
    useCases: [
      'iOS app development',
      'macOS applications',
      'Server-side development',
      'System programming',
      'Cross-platform development'
    ],
    icon: '🍎'
  },
  {
    name: 'Rust',
    description: 'A systems language focusing on safety, concurrency, and performance.',
    benefits: [
      'Memory safety without garbage collection',
      'Zero-cost abstractions',
      'Excellent concurrency support',
      'Strong type system',
      'Growing ecosystem'
    ],
    useCases: [
      'Systems programming',
      'WebAssembly development',
      'Network services',
      'Command-line tools',
      'Embedded systems'
    ],
    icon: '🦀'
  },
  {
    name: 'Kotlin',
    description: 'A modern JVM language with enhanced safety and developer productivity.',
    benefits: [
      'Full Java interoperability',
      'Null safety features',
      'Concise syntax',
      'Multiplatform development',
      'First-class Android support'
    ],
    useCases: [
      'Android development',
      'Server-side applications',
      'Cross-platform mobile apps',
      'Web development',
      'Data science'
    ],
    icon: '🎯'
  },
  {
    name: 'PHP',
    description: 'A widely-used server-side scripting language for web development.',
    benefits: [
      'Easy to learn and use',
      'Vast hosting support',
      'Large community',
      'Rich framework ecosystem',
      'Extensive documentation'
    ],
    useCases: [
      'Web development',
      'Content management systems',
      'E-commerce platforms',
      'API development',
      'Server-side scripting'
    ],
    icon: '🐘'
  },
  {
    name: 'C#',
    description: 'Microsoft\'s powerful language for the .NET platform.',
    benefits: [
      'Robust type system',
      'Excellent IDE support',
      'Cross-platform with .NET Core',
      'Large standard library',
      'Strong enterprise support'
    ],
    useCases: [
      'Windows applications',
      'Game development with Unity',
      'Enterprise software',
      'Web applications with ASP.NET',
      'Cloud services on Azure'
    ],
    icon: '🎮'
  },
  {
    name: 'TypeScript',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript.',
    benefits: [
      'Static typing',
      'Enhanced IDE support',
      'Better code organization',
      'Easier maintenance of large codebases',
      'JavaScript compatibility'
    ],
    useCases: [
      'Large-scale JavaScript applications',
      'Enterprise web applications',
      'Complex frontend systems',
      'Node.js backend services',
      'Angular development'
    ],
    icon: '🔷'
  },
  {
    name: 'Go',
    description: 'A fast, statically typed language designed for modern infrastructure.',
    benefits: [
      'High performance',
      'Built-in concurrency support',
      'Simple and clean syntax',
      'Excellent for cloud services',
      'Fast compilation'
    ],
    useCases: [
      'Cloud and network services',
      'System programming',
      'Microservices',
      'DevOps tools',
      'Command-line applications'
    ],
    icon: '🔵'
  }
];

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLanguage, setExpandedLanguage] = useState(null);

  const filteredLanguages = programmingLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Programming Languages{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
              Documentation
            </span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Explore different programming languages, their benefits, and common use cases
            to help you choose the right tool for your next project.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
            <input
              type="text"
              placeholder="Search programming languages..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Language Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLanguages.map((lang) => (
            <div
              key={lang.name}
              className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:border-orange-500 transition-all"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedLanguage(expandedLanguage === lang.name ? null : lang.name)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.icon}</span>
                  <h3 className="text-xl font-semibold">{lang.name}</h3>
                </div>
                {expandedLanguage === lang.name ? (
                  <ChevronDown className="text-neutral-400" size={20} />
                ) : (
                  <ChevronRight className="text-neutral-400" size={20} />
                )}
              </div>

              <p className="mt-3 text-neutral-400">{lang.description}</p>

              {expandedLanguage === lang.name && (
                <div className="mt-4 space-y-4">
                  {lang.details ? (
                    // Special rendering for Web Development Stack
                    <>
                      {Object.entries(lang.details).map(([key, detail]) => (
                        <div key={key} className="bg-neutral-900 rounded-lg p-4">
                          <h4 className="text-lg font-medium mb-2 text-orange-500">{detail.title}</h4>
                          <p className="text-neutral-400 mb-3">{detail.description}</p>
                          <ul className="list-disc list-inside space-y-1 text-neutral-300">
                            {detail.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-orange-500">Benefits</h4>
                        <ul className="list-disc list-inside space-y-1 text-neutral-300">
                          {lang.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-orange-500">Common Use Cases</h4>
                        <ul className="list-disc list-inside space-y-1 text-neutral-300">
                          {lang.useCases.map((useCase, index) => (
                            <li key={index}>{useCase}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    // Regular rendering for other languages
                    <>
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-orange-500">Benefits</h4>
                        <ul className="list-disc list-inside space-y-1 text-neutral-300">
                          {lang.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-orange-500">Common Use Cases</h4>
                        <ul className="list-disc list-inside space-y-1 text-neutral-300">
                          {lang.useCases.map((useCase, index) => (
                            <li key={index}>{useCase}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentation; 