import { LucideAlertOctagon } from "lucide-react";
import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      "Error caught by application error boundary:",
      error,
      errorInfo
    );
    // You can log the error to a logging service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen text-center border bg-red-50">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 px-2 text-left bg-gray-100 border">
              <div><LucideAlertOctagon className="w-full h-full" /></div>
              <div>
              <h1 className="m-0">Something went wrong.</h1>
              <h4 className="">Please try refreshing the page.</h4>
              </div>
            </div>
            <div className="p-4 bg-red-100 border border-red-500">
              {this.state.error && (
                <p>
                  Error details: {this.state.error.message}{" "}
                  {/* Displaying the error message */}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
