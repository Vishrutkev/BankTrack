
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App';
import SignUp from '../containers/SignUp';
import SignIn from '../containers/SignIn';
import AuthWrapper from '../state/AuthWrapper';
import { AuthProvider } from '../state/Auth/AuthProvider';


const router = createBrowserRouter([
    { path: '/signUp', element: <SignUp /> },
    { path: '/dashboard', element: <App /> },
    { path: '/signIn', element: <SignIn /> },
    { path: '/', element: <Navigate to="/signIn" /> }
]);

const AppRouter = () => (
    <RouterProvider router={router} />
);

export default AppRouter;



// import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
// import SignUp from '../containers/SignUp';
// import SignIn from '../containers/SignIn';
// import ProtectedRoute from './protectedRoutes';
// import { AuthProvider } from '../state/AuthContext';
// import App from '../App';

// const router = createBrowserRouter([
//     { path: '/signIn', element: <SignIn /> },
//     { path: '/signUp', element: <SignUp /> },
//     {
//         path: '/dashboard', element: <ProtectedRoute />
//     },
//     { path: '/', element: <Navigate to="/signIn" /> }
// ]);

// const AppRouter = () => {
//     return (
//         <AuthProvider>
//             <RouterProvider router={router} />
//         </AuthProvider>
//     );
// };

// export default AppRouter;