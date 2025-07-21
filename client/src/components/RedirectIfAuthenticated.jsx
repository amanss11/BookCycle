import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RedirectIfAuthenticated = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user === undefined) {
        // Optionally show a spinner if user is loading
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RedirectIfAuthenticated;
