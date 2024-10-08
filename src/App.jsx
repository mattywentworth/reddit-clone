import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//New stuff not in orginal build
import { Root } from './components/Root'
import { Feed } from './features/feed/Feed';
import { LeftPanel } from './components/left_panel/LeftPanel';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

//<Root index element={<LeftPanel />} />
//Not in original build
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index  element={<Feed />} />
  </Route>
));


function App() {
  
  return (
    <RouterProvider router={router} />
  );

  /*
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <p>scram</p>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
  */
}

export default App
