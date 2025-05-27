import PageTitle from "@/components/PageTitle";
import { VIEW_TRANSITION_SUPPORTED } from "@/logic/viewTransition";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/home', { viewTransition: VIEW_TRANSITION_SUPPORTED })
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <header className='pb-4 flex flex-col gap-2'>
        <PageTitle>Steganographix by @thavixt</PageTitle>
      </header>
      <div>
        Loading application ...
      </div>
    </div>
  )
} 