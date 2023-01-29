import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AuthLayout } from './pages/layouts/AuthLogin';
import { AuthProvider } from './context/AuthContext';
import { RootLayout } from './pages/layouts/RootLogin';
import { Home } from './pages/Home';
import { NewChannel } from './pages/channel/new';

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: '/channel',
            children: [{ path: 'new', element: <NewChannel /> }],
          },
        ],
      },
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
