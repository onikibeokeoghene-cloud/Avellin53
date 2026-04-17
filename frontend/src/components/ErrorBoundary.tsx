import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-light p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="inline-flex p-4 bg-red-50 rounded-full text-red-600">
              <AlertTriangle className="h-12 w-12" />
            </div>
            <h1 className="text-3xl font-heading text-primary">Something went wrong</h1>
            <p className="text-text-light">
              We encountered an unexpected error. Our team has been notified.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
