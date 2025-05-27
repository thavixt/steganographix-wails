import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Button } from '@/components/ui/button.tsx';
import About from '@/pages/About'
import Image2Image from '@/pages/ImageFromImage'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/404';
import Loading from '@/pages/Loading';
import { VIEW_TRANSITION_SUPPORTED } from '@/logic/viewTransition.ts';
import './index.css'
import { EventsOn } from '../wailsjs/runtime/runtime';

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Loading />,
  },
  {
    path: "/home",
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
      router.navigate('/home', { viewTransition: VIEW_TRANSITION_SUPPORTED });
      break;
    case 'about':
      router.navigate('/about', { viewTransition: VIEW_TRANSITION_SUPPORTED });
      break;
    case 'image2image':
      router.navigate('/image2image', { viewTransition: VIEW_TRANSITION_SUPPORTED });
      break;
    default:
      console.warn(`Unknown route: ${path}`);
      router.navigate('/404', { viewTransition: VIEW_TRANSITION_SUPPORTED });
      break;
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function App() {
  return (
    <main className='relative m-auto max-w-[1200px]'>
      <Button
        className='fixed top-4 left-4'
        onClick={() => {
          router.navigate('/', { viewTransition: VIEW_TRANSITION_SUPPORTED });
        }}
      >
        Home
      </Button>
      <div className='h-100vh w-full overflow-y-auto'>
        <RouterProvider router={router} />
      </div>
    </main>
  )
}