import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AuthLayout } from './pages/layouts/AuthLogin';
import { AuthProvider } from './context/AuthContext';

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'signup', element: <Signup /> },
        ],
      },
    ],
  },
]);

function ContextWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
