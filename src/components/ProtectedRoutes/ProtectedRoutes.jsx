/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        return <Navigate to="/signin" replace />
    }
    return children;
}
