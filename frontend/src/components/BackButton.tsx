import { useNavigate, useMatch } from "react-router-dom";
import { Button } from "./ui/button";
import { VIEW_TRANSITION_SUPPORTED } from "@/logic/viewTransition";

export function BackButton() {
  const navigate = useNavigate();
  const isLoading = useMatch('/');
  const isHome = useMatch('/home');

  if (isHome || isLoading) {
    return;
  }

  return (
    <div className='sticky top-2 flex justify-end z-50'>
      <Button
        onClick={() => {
          navigate('/', { viewTransition: VIEW_TRANSITION_SUPPORTED });
        }}
      >
        {'<'}
      </Button>
    </div>
  )
}