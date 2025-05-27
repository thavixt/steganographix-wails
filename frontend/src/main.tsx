import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'

// routes / pages
import { WailsEventHandler } from '@/layout/LoadWailsEventHandler';
import About from '@/pages/About'
import Image2Image from '@/pages/ImageFromImage'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/404';
import Loading from '@/pages/Loading';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter >
        <Routes>
          <Route element={<WailsEventHandler />}>
            <Route index element={<Loading />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="image2image" element={<Image2Image />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
