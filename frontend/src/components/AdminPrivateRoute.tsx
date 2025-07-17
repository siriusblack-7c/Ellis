import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const AdminPrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default AdminPrivateRoute; 