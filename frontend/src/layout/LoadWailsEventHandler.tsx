import { VIEW_TRANSITION_SUPPORTED } from "@/logic/viewTransition";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { EventsOn } from '../../wailsjs/runtime/runtime';
import { BackButton } from "../components/BackButton";
import { useWailsContext, WailsContext } from "@/context/WailsContext";

export function WailsEventHandler() {
  const navigate = useNavigate();
  const {setInitialized} = useWailsContext();

  useEffect(() => {
    (async function LoadWailsEventHandler() {
      // @TODO could probably be done better?
      // wait a bit for the wails runtime to load ...
      // await sleep(250);
      EventsOn('route', (path: string) => {
        console.log(`Route event received: ${path}`);
        switch (path) {
          case 'home':
            navigate('/home', { viewTransition: VIEW_TRANSITION_SUPPORTED });
            break;
          case 'about':
            navigate('/about', { viewTransition: VIEW_TRANSITION_SUPPORTED });
            break;
          case 'image2image':
            navigate('/image2image', { viewTransition: VIEW_TRANSITION_SUPPORTED });
            break;
          default:
            console.warn(`Unknown route: ${path}`);
            navigate('/404', { viewTransition: VIEW_TRANSITION_SUPPORTED });
            break;
        }
        setInitialized(true);
      })();
    });
  }, [])

  return (
    <WailsContext.Provider value={{initialized: false}}>
      <main className='w-full max-w-[1200px] min-h-100vh'>
        <BackButton />
        <Outlet />
      </main>
    </WailsContext.Provider>
  );
}