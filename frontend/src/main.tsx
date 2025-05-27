import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import About from './pages/About'
import Image2Image from './pages/ImageFromImage'
import Home from './pages/Home.tsx'
import NotFound from './pages/404';

import PageTitle from '@/components/PageTitle';
import { Toaster } from "@/components/ui/toaster.tsx"

import { EventsOn } from '../wailsjs/runtime/runtime';

import './index.css'

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/image2image",
    element: <Image2Image />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

EventsOn('route', (path: string) => {
  console.log(`Route event received: ${path}`);
  switch (path) {
    case 'home':
      router.navigate('/');
      break;
    case 'about':
      router.navigate('/about');
      break;
    case 'image2image':
      router.navigate('/image2image');
      break;
    default:
      console.warn(`Unknown route: ${path}`);
      router.navigate('/404');
      break;
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <header className='pb-4 flex flex-col gap-2'>
      <PageTitle>Steganographix by @thavixt</PageTitle>
    </header>
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  </StrictMode>,
)
