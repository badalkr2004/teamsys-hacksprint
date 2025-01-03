import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from '@/layout/Home';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    // children:[
    //   {
    //     path:"index",
    //     element:<LandingPage/>
    //   }
    // ]
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
