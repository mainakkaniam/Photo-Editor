import { useState } from 'react'
import Home from './pages/Home'
import BasicTabs from './components/BasicTabs'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from './components/Test';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicTabs/>,
  },
  {
    path: "/test",
    element: <Test/>,
  }
]);

function App() {
 
  return (
    <>
<RouterProvider router={router} />
    </>
  )
}

export default App
