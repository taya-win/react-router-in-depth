import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import HelpLayout from "./layouts/HelpLayout.tsx";
import Faq from "./pages/help/Faq.tsx";
import Contact from "./pages/help/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import CareersLayout from "./layouts/CareersLayout.tsx";
import Careers from "./pages/careers/Careers.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'help',
                element: <HelpLayout />,
                children: [
                    {
                        path: 'faq',
                        element: <Faq />,
                    },
                    {
                        path: 'contact',
                        element: <Contact />,
                    },
                ]
            },
            {
                path: 'careers',
                element: <CareersLayout />,
                children: [
                    {
                        index: true,
                        element: <Careers />,
                        loader: async() => {
                            const res = await fetch('http://localhost:4000/careers')
                            return res.json()
                        },
                    }
                ]
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    }
], {
    future: {
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
        v7_partialHydration: true,
        v7_normalizeFormMethod: true,
        v7_fetcherPersist: true,

    },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} future={{
          v7_startTransition: true
      }} />
  </StrictMode>,
)
