import { useState, useEffect } from 'react';
import { Play, Copy, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const CodePlayground = ({ initialCode = '// Write your JavaScript code here\nconsole.log(\'Hello, world!\');', language = 'javascript', readOnly = false, onCodeChange }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    try {
      // For JavaScript, we can use a sandboxed eval approach
      if (language === 'javascript') {
        // Create a safe environment for evaluation
        const originalConsoleLog = console.log;
        let logs = [];

        // Override console.log to capture output
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        try {
          // Use Function constructor to avoid direct eval
          const result = new Function(code)();
          
          if (result !== undefined) {
            logs.push(`Return value: ${result}`);
          }
          
          setOutput(logs.join('\n'));
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        } finally {
          // Restore original console.log
          console.log = originalConsoleLog;
        }
      } else {
        // For other languages, we would need a backend service
        setOutput(`Running ${language} code is not supported in this demo.\nServer-side execution would be required.`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  const downloadCode = () => {
    const fileExtension = language === 'javascript' ? 'js' : language;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded');
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    toast.info('Code reset to initial state');
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <div className="font-medium">{language.charAt(0).toUpperCase() + language.slice(1)} Editor</div>
        <div className="flex space-x-2">
          <button
            onClick={runCode}
            disabled={isRunning || readOnly}
            className="px-3 py-1 bg-blue-600 text-white rounded flex items-center space-x-1 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={16} />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </button>
          <button
            onClick={copyCode}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded flex items-center space-x-1 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <Copy size={16} />
            <span>Copy</span>
          </button>
          <button
            onClick={downloadCode}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded flex items-center space-x-1 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
          <button
            onClick={resetCode}
            disabled={readOnly}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded flex items-center space-x-1 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
        <div className="p-4">
          <textarea
            value={code}
            onChange={handleCodeChange}
            readOnly={readOnly}
            className="w-full h-64 p-3 font-mono text-sm border rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck="false"
          ></textarea>
        </div>
        <div className="p-4">
          <div className="font-medium mb-2">Console Output</div>
          <div className="w-full h-64 p-3 font-mono text-sm border rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 overflow-auto">
            {error ? (
              <div className="text-red-500 flex items-start">
                <AlertTriangle size={16} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-bold">Error:</div>
                  <div>{error.message}</div>
                </div>
              </div>
            ) : output ? (
              <pre>{output}</pre>
            ) : (
              <div className="text-gray-400 dark:text-gray-500">Run your code to see output here</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground; 