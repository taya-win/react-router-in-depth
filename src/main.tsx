import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import HelpLayout from "./layouts/HelpLayout.tsx";
import Faq from "./pages/help/Faq.tsx";
import Contact from "./pages/help/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import CareersLayout from "./layouts/CareersLayout.tsx";
import Careers from "./pages/careers/Careers.tsx";
import CareerDetails from "./pages/careers/CareerDetails.tsx";
import CareersError from "./pages/careers/CareersError.tsx";

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
                        action: async ({request}) => {
                            const data = await request.formData();

                            const submission = {
                                email: data.get('email'),
                                message: data.get('message') as string,
                            }

                            console.log(submission)

                            // send your post request

                            if (submission.message && submission.message.length < 10) {
                                return {error: 'Message must be over 10 chars long.'}
                            }

                            // redirect the user
                            return redirect('/')
                        },
                    },
                ]
            },
            {
                path: 'careers',
                element: <CareersLayout />,
                errorElement: <CareersError />,
                HydrateFallback: () => <div>Loading...</div>,
                children: [
                    {
                        index: true,
                        element: <Careers />,
                        loader: async() => {
                            const res = await fetch('http://localhost:4000/careers')
                            if(!res.ok) throw Error('Could not fetch the careers.');
                            return res.json()
                        },

                    },
                    {
                        path: ':id',
                        element: <CareerDetails />,
                        loader: async ({params}) => {
                            const { id } = params;
                            const res = await fetch('http://localhost:4000/careers/' + id);
                            if(!res.ok) throw Error('Could not find that career.');
                            return res.json();
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
          v7_startTransition: true,
      }}  />
  </StrictMode>,
)
