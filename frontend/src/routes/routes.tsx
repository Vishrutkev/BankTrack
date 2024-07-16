
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App';
import SignUp from '../containers/SignUp';

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/signUp', element: <SignUp /> }
]);

const AppRouter = () => (
    <RouterProvider router={router} />
);

export default AppRouter;