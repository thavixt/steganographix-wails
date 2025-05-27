import Loader from "@/components/Loader";
import PageTitle from "@/components/PageTitle";
import { useWailsContext } from "@/context/WailsContext";
import { VIEW_TRANSITION_SUPPORTED } from "@/logic/viewTransition";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Loading() {
  const navigate = useNavigate();
  const { initialized } = useWailsContext();

  useEffect(() => {
    if (initialized) {
      navigate('/home', { viewTransition: VIEW_TRANSITION_SUPPORTED });
      return;
    }

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
      <div className="flex flex-col gap-8 items-center justify-center">
        <div>Loading application ...</div>
        <Loader />
      </div>
    </div>
  )
} 