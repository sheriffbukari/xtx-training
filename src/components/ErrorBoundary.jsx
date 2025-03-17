import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-900">
          <div className="max-w-md w-full p-8 bg-neutral-800 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="h-16 w-16 text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-neutral-400 mb-6">
              We're sorry, but an error occurred while rendering this page.
            </p>
            <div className="bg-neutral-900 p-4 rounded-md text-left mb-6 overflow-auto max-h-60">
              <p className="text-red-500 font-mono text-sm">
                {this.state.error && this.state.error.toString()}
              </p>
              {this.state.errorInfo && (
                <details className="mt-2">
                  <summary className="text-orange-500 cursor-pointer">View stack trace</summary>
                  <pre className="mt-2 text-neutral-400 text-xs overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="py-2 px-4 bg-orange-600 hover:bg-orange-700 rounded-md transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="py-2 px-4 border border-neutral-600 hover:bg-neutral-700 rounded-md transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 