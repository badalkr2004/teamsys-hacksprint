import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from '@/layout/Home';
import LandingPage from '@/pages/LandingPage';
import ReportLocation from '@/pages/ReportLocation';
import ListBins from '@/pages/ListBins';

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
      {
        path: 'list-bins',
        element: <ListBins />,
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
