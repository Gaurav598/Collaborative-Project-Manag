import { useNavigate } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-white px-6">
            {/* Decorative number */}
            <div className="relative select-none mb-8">
                <span className="text-[10rem] font-black leading-none text-gray-100 dark:text-zinc-800">
                    404
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-500">Page Not Found</span>
                </div>
            </div>

            <p className="text-gray-500 dark:text-zinc-400 text-center max-w-md mb-10">
                The page you are looking for doesn't exist or has been moved.
                Head back home to continue managing your projects.
            </p>

            <div className="flex gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded border border-gray-300 dark:border-zinc-700 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                >
                    <ArrowLeftIcon className="size-4" />
                    Go Back
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm hover:opacity-90 transition"
                >
                    <HomeIcon className="size-4" />
                    Dashboard
                </button>
            </div>
        </div>
    );
};

export default NotFound;
