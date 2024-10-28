import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token, user, isAuthenticated } = useAuth();

    if (!isAuthenticated && !user && token === null) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
