import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from '@/layout/Home';
import LandingPage from '@/pages/LandingPage';
import ReportLocation from '@/pages/ReportLocation';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'report-location',
        element: <ReportLocation />,
      },
    ],
  },
  {
    path: '/admin',
    element: <LandingPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
