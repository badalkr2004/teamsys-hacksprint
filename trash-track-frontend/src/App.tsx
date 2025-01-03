import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from '@/layout/Home';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
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
