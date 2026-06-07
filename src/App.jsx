import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "8px",
                        fontSize: "14px",
                    },
                }}
            />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <ErrorBoundary>
                                <Dashboard />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="team"
                        element={
                            <ErrorBoundary>
                                <Team />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="projects"
                        element={
                            <ErrorBoundary>
                                <Projects />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="projectsDetail"
                        element={
                            <ErrorBoundary>
                                <ProjectDetails />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="taskDetails"
                        element={
                            <ErrorBoundary>
                                <TaskDetails />
                            </ErrorBoundary>
                        }
                    />
                </Route>
                {/* Catch-all 404 route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
