import PageTitle from "@/components/PageTitle";
import { VIEW_TRANSITION_SUPPORTED } from "@/logic/viewTransition";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <header className='pb-4 flex flex-col gap-2'>
        <PageTitle>Oops! That was a wrong turn.</PageTitle>
      </header>
      <p>The page or feature you're looking for does not exist - yet!</p>
      <Link to="/" viewTransition={VIEW_TRANSITION_SUPPORTED}>Go back home</Link>
    </div>
  );
}