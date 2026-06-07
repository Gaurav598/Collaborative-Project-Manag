import { Component } from "react";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

/**
 * ErrorBoundary — catches uncaught render errors in the React subtree
 * and displays a friendly fallback UI instead of a blank screen.
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        // In production you would send this to an error monitoring service
        // e.g. Sentry.captureException(error, { extra: info });
        console.error("[ErrorBoundary]", error, info);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
                    <div className="mb-6 p-4 rounded-full bg-red-100 dark:bg-red-500/10">
                        <AlertTriangleIcon className="size-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-400 mb-2 max-w-md">
                        An unexpected error occurred in this section. The rest of the app is still functional.
                    </p>
                    {this.state.error && (
                        <pre className="text-xs text-red-400 bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded p-3 mb-6 max-w-lg overflow-auto text-left">
                            {this.state.error.message}
                        </pre>
                    )}
                    <button
                        onClick={this.handleReset}
                        className="flex items-center gap-2 px-5 py-2 rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm hover:opacity-90 transition"
                    >
                        <RefreshCwIcon className="size-4" />
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
